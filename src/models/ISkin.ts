export interface ProxyObject {
  [key: string]: ProxyObject | any;
}

export interface ISkin {
  appId: number;
  assetId: number;
  float: string;
  hasHighDemand: boolean;
  hasTradeLock: boolean;
  id: number;
  img: string;
  nameId: number;
  price: number;
  quality: Quality | null;
  rarity: Rarity;
  steamId: string;
  steamImg: string;
  tradeLock?: number;
  type: number;
  "3d"?: string;
  preview?: string;
  screenshot?: string;
  priceWithBonus: number;
  userId: null;
  pattern: number;
  rank: null | string;
  collection: null | string;
  overpay: Overpay | null;
  stickers: Array<Sticker | null> | null;
  inspect: string;
  fullName: string;
  shortName: string;
  fullSlug: string;
  wiki: string;
  overprice?: number;
  isStatTrak?: boolean;
  ingameScreenshot?: string;
  fade?: number;
  hasConcreteSkinPage?: boolean;
  name?: string;
  stackId?: string;
  stackSize?: number;
  marbleFade?: string;
  stackItems?: StackItem[];
}
export interface ISkinExtends extends ISkin {
  element: HTMLElement;
}
export interface Overpay {
  stickers?: number;
  float?: number;
  pattern?: number;
}
export enum Quality {
  Bs = "bs",
  Fn = "fn",
  Ft = "ft",
  Mw = "mw",
  Ww = "ww",
}
export enum Rarity {
  Covert = "Covert",
  Extraordinary = "Extraordinary",
}
export interface StackItem {
  float: string;
  id: number;
  img: string;
  pattern: number;
  stackId: string;
  steamId: string;
  tradeLock: null;
  hasScreenshot: boolean;
  screenshotStatus: string;
  toDelete: boolean;
}
export interface Sticker {
  overprice: number | null;
  name: string;
  position: number;
  price: number;
  wear: number;
  img: string;
  wikiLink: string;
}

export interface ISkinSell {
  className: string;
  id: number;
  assetId: number;
  nameId: number;
  appId: number;
  price: number;
  float?: string;
  type: number;
  quality?: Quality;
  rarity: Rarity;
  hasHighDemand: boolean;
  img: string;
  steamImg: string;
  stickers?: string[];
  overprice?: number;
  defaultPrice: number;
  hasTradeLock: boolean;
  steamId: string;
  botPrice: number;
  overstockDiff: number;
  lowestPrice: number | null;
  isUnsellable: boolean;
  collection: null | string;
  inventoryType: string;
  customError: null;
  isSellError: boolean;
  pattern?: Pattern;
  isVirtual?: boolean;
  isMarket?: boolean;
  isStatTrak?: boolean;
  userOverprice?: number;
  listingTime?: number;
  virtual?: boolean;
  name?: string;
  isSouvenir?: boolean;
}
export interface ISkinSellExtends extends ISkinSell {
  element: HTMLElement;
}
export interface Pattern {
  fade?: number;
  blue?: number;
  backSide?: number;
  playSide?: number;
}
