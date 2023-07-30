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
