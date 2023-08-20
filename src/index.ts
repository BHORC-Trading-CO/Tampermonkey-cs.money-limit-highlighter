import { ISkin, ISkinExtends, ISkinSell, ISkinSellExtends, ProxyObject } from "@src/models/ISkin";
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
    // Trade mode
    this.get_skins_info(EnumSelectors.TRADE_TRADE_MODE_USER_INVENTORY, EnumSelectors.TRADE_TRADE_MODE_USER_INVENTORY_ITEMS);
    this.get_skins_info(EnumSelectors.TRADE_TRADE_MODE_BOT_INVENTORY, EnumSelectors.TRADE_TRADE_MODE_BOT_INVENTORY_ITEMS);
    this.get_skins_info(EnumSelectors.TRADE_TRADE_MODE_USER_INVENTORY_OFFER, EnumSelectors.TRADE_TRADE_MODE_USER_INVENTORY_OFFER_ITEMS);
    this.get_skins_info(EnumSelectors.TRADE_TRADE_MODE_BOT_INVENTORY_OFFER, EnumSelectors.TRADE_TRADE_MODE_BOT_INVENTORY_OFFER_ITEMS);
    this.set_observer(EnumSelectors.TRADE_TRADE_MODE_USER_INVENTORY, EnumSelectors.TRADE_TRADE_MODE_USER_INVENTORY_ITEMS);
    this.set_observer(EnumSelectors.TRADE_TRADE_MODE_BOT_INVENTORY, EnumSelectors.TRADE_TRADE_MODE_BOT_INVENTORY_ITEMS);
    this.set_observer(EnumSelectors.TRADE_TRADE_MODE_USER_INVENTORY_OFFER, EnumSelectors.TRADE_TRADE_MODE_USER_INVENTORY_OFFER_ITEMS);
    this.set_observer(EnumSelectors.TRADE_TRADE_MODE_BOT_INVENTORY_OFFER, EnumSelectors.TRADE_TRADE_MODE_BOT_INVENTORY_OFFER_ITEMS);
    // Sell mode
    this.get_skins_info(EnumSelectors.TRADE_SELL_MODE_USER_INVENTORY, EnumSelectors.TRADE_SELL_MODE_USER_INVENTORY_ITEMS);
    this.get_skins_info(EnumSelectors.TRADE_SELL_MODE_USER_INVENTORY_SELL_LIST, EnumSelectors.TRADE_SELL_MODE_USER_INVENTORY_SELL_LIST_ITEMS);
    this.set_observer(EnumSelectors.TRADE_SELL_MODE_USER_INVENTORY, EnumSelectors.TRADE_SELL_MODE_USER_INVENTORY_ITEMS);
    this.set_observer(EnumSelectors.TRADE_SELL_MODE_USER_INVENTORY_SELL_LIST, EnumSelectors.TRADE_SELL_MODE_USER_INVENTORY_SELL_LIST_ITEMS);
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
      const trade_trade_mode_user_skin_proxy_info: ProxyObject | undefined =
        element?.[reactPropsKey]?.children[0]?.props?.children?.props?.children?.props?.children?.props?.children?.props?.skin?.skin;
      const trade_trade_mode_bot_skin_proxy_info: ProxyObject | undefined = element?.[reactPropsKey]?.children?.[0]?.props?.children?.props?.children?.props?.children?.props?.skin?.skin;
      const trade_sell_mode_user_skin_proxy_info: ProxyObject | undefined = element?.[reactPropsKey]?.children[2]?.props?.children?.props?.children[4]?.props;
      const trade_sell_mode_user_sell_list_skin_proxy_info: ProxyObject | undefined = element?.[reactPropsKey]?.children?.props?.item;
      const skin_proxy_info = trade_trade_mode_bot_skin_proxy_info || trade_trade_mode_user_skin_proxy_info || trade_sell_mode_user_skin_proxy_info || trade_sell_mode_user_sell_list_skin_proxy_info;
      console.log("🚀 ~ file: index.ts:64 ~ LimitHighlighter ~ returnArray.from ~ skin_proxy_info:", skin_proxy_info);
      if (!skin_proxy_info) return;
      const skin_info: ISkin | ISkinSell = this.recursiveUnProxy<ISkin | ISkinSell>(skin_proxy_info);
      const skin: ISkinExtends | ISkinSellExtends = { ...skin_info, element };
      if (LimitHighlighter.limited_skins.includes((skin as ISkinExtends).fullName)) {
        this.highlight_skin(skin);
      }
      // TODO: fix Sell mode
      // if (!(skin as ISkinSellExtends).fullName) {
      // }
      return skin;
    });
  }
  highlight_skin(skin: ISkinExtends | ISkinSellExtends) {
    const action_card = skin.element.querySelector<HTMLElement>(EnumSelectors.HIGHLIGHT_SKIN);
    if (!action_card) return;
    const overpay = (skin as ISkinExtends).overpay;
    // (skin as ISkinSellExtends).price - (skin as ISkinSellExtends).defaultPrice;
    if (!overpay || Object.keys(overpay).length === 0) {
      action_card.style.backgroundColor = config.colors.limitedUnSellable;
    } else {
      const overpays: number[] = Object.values(overpay);
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
