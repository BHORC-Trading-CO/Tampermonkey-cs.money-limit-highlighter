export enum EnumSelectors {
  INVENTORIES_USER = "#userInventory[class*='list_wrapper']",
  INVENTORIES_BOT = "#botInventory[class*='list_wrapper']",
  INVENTORIES_USER_OFFER = `[class^='user-listing_cart']`,
  INVENTORIES_BOT_OFFER = `[class^='bot-listing_cart']`,
  INVENTORY_ITEMS_USER = `div > div:not([class])`,
  INVENTORY_ITEMS_BOT = `div > div:not([class])`,
  INVENTORY_ITEMS_USER_OFFER = `[class*='list_wrapper'] > div > div:not([class])`,
  INVENTORY_ITEMS_BOT_OFFER = `[class*='list_wrapper'] > div > div:not([class])`,
  ACTION_CARD = `[class^='actioncard_card']`,
}
