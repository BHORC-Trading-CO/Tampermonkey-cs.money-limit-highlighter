import { ISkin, ISkinExtends, ProxyObject } from "@src/models/ISkin";
import { config } from "@src/ts/Config";
import { EnumSelectors } from "@src/ts/EnumSelectors";
import { EnumURL } from "@src/ts/EnumURL";

class LimitHighlighter {
  static limited_skins: string[] = [];

  constructor() {
    this.init();
  }
  recursiveUnProxy<T>(obj: ProxyObject): T {
    if (typeof obj !== "object" || obj === null) return obj;
    const unProxiedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        unProxiedObj[key] = this.recursiveUnProxy(obj[key]);
      }
    }
    return unProxiedObj;
  }
  async init() {
    await this.get_limit_skins();
    this.get_skins_info(EnumSelectors.INVENTORIES_USER, EnumSelectors.INVENTORY_ITEMS_USER);
    this.get_skins_info(EnumSelectors.INVENTORIES_BOT, EnumSelectors.INVENTORY_ITEMS_BOT);
    this.get_skins_info(EnumSelectors.INVENTORIES_USER_OFFER, EnumSelectors.INVENTORY_ITEMS_USER_OFFER);
    this.get_skins_info(EnumSelectors.INVENTORIES_BOT_OFFER, EnumSelectors.INVENTORY_ITEMS_BOT_OFFER);
    this.set_observer(EnumSelectors.INVENTORIES_USER, EnumSelectors.INVENTORY_ITEMS_USER);
    this.set_observer(EnumSelectors.INVENTORIES_BOT, EnumSelectors.INVENTORY_ITEMS_BOT);
    this.set_observer(EnumSelectors.INVENTORIES_USER_OFFER, EnumSelectors.INVENTORY_ITEMS_USER_OFFER);
    this.set_observer(EnumSelectors.INVENTORIES_BOT_OFFER, EnumSelectors.INVENTORY_ITEMS_BOT_OFFER);
  }
  set_observer(inventory: string, inventory_items: string) {
    const inventory_elem = document.querySelector(inventory);
    if (!inventory_elem) return;
    const observer = new MutationObserver(() => this.get_skins_info(inventory, inventory_items));
    observer.observe(inventory_elem, { childList: true, subtree: true });
  }
  get_items(inventory: string, inventory_items: string) {
    const inventory_elem = document.querySelector(inventory);
    if (!inventory_elem) return;
    const items = inventory_elem.querySelectorAll<HTMLElement>(inventory_items);
    return items;
  }
  get_skins_info(inventory: string, inventory_items: string) {
    const items = this.get_items(inventory, inventory_items);
    if (!items) return;
    return Array.from(items).map((element: HTMLElement) => {
      const elementProps: string[] = Object.keys(element);
      const reactPropsKey = elementProps.find((key: string) => key.startsWith("__reactProps"));
      if (!reactPropsKey) return;
      const bot_skin_proxy_info: ProxyObject | undefined = element?.[reactPropsKey]?.children?.[0]?.props?.children?.props?.children?.props?.children?.props?.skin?.skin;
      const user_skin_proxy_info: ProxyObject | undefined = element?.[reactPropsKey]?.children[0]?.props?.children?.props?.children?.props?.children?.props?.children?.props?.skin?.skin;
      const skin_proxy_info = bot_skin_proxy_info || user_skin_proxy_info;
      if (!skin_proxy_info) return;
      const skin_info: ISkin = this.recursiveUnProxy<ISkin>(skin_proxy_info);
      const skin: ISkinExtends = { ...skin_info, element };
      if (LimitHighlighter.limited_skins.includes(skin.fullName)) this.highlight_skin(skin);
      return skin;
    });
  }
  highlight_skin(skin: ISkinExtends) {
    const action_card = skin.element.querySelector<HTMLElement>(EnumSelectors.ACTION_CARD);
    if (!action_card) return;
    if (!skin.overpay || Object.keys(skin.overpay).length === 0) {
      action_card.style.backgroundColor = config.colors.limitedUnSellable;
    } else {
      const overpays: number[] = Object.values(skin.overpay);
      const full_overpay = overpays.reduce((acc: number, cur: number) => acc + cur, 0);
      if (100 - ((skin.price - full_overpay) / skin.price) * 100 < config.minPercent) {
        action_card.style.backgroundColor = config.colors.limitedUnSellable;
      } else {
        action_card.style.backgroundColor = config.colors.limitedSellable;
      }
    }
  }
  async get_limit_skins(): Promise<string[]> {
    LimitHighlighter.limited_skins = await fetch(EnumURL.LIMITED_SKINS)
      .then((res) => res.json() as Promise<string[]>)
      .catch(() => [] as string[]);
    return LimitHighlighter.limited_skins;
  }
}
new LimitHighlighter();
