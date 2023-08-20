export enum EnumSelectors {
  // TRADE - Trade mode
  TRADE_TRADE_MODE_USER_INVENTORY = "#userInventory[class*='list_wrapper']",
  TRADE_TRADE_MODE_USER_INVENTORY_ITEMS = `div > div:not([class])`,
  TRADE_TRADE_MODE_USER_INVENTORY_OFFER = `[class^='user-listing_cart']`,
  TRADE_TRADE_MODE_USER_INVENTORY_OFFER_ITEMS = `[class*='list_wrapper'] > div > div:not([class])`,
  TRADE_TRADE_MODE_BOT_INVENTORY = "#botInventory[class*='list_wrapper']",
  TRADE_TRADE_MODE_BOT_INVENTORY_ITEMS = `div > div:not([class])`,
  TRADE_TRADE_MODE_BOT_INVENTORY_OFFER = `[class^='bot-listing_cart']`,
  TRADE_TRADE_MODE_BOT_INVENTORY_OFFER_ITEMS = `[class*='list_wrapper'] > div > div:not([class])`,
  // TRADE - Sell mode
  TRADE_SELL_MODE_USER_INVENTORY = `[class*='styles_left_side']`,
  TRADE_SELL_MODE_USER_INVENTORY_ITEMS = `[class*='styles_sell_page'] > [class*='styles_item']`,
  TRADE_SELL_MODE_USER_INVENTORY_SELL_LIST = `[class*='styles_right_side']`,
  TRADE_SELL_MODE_USER_INVENTORY_SELL_LIST_ITEMS = `[class*='styles_wrapper'] > div > div:not([class])`,
  // Other
  HIGHLIGHT_SKIN = `[class^='actioncard_card'], [class^='styles_item']`,
}
