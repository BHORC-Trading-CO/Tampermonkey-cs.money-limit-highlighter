declare module "*.txt";
declare module "*.html";
declare module "*.vue";
declare module "*.svg" {
  const content: string;
  export default content;
}
declare module "*.raw.css";
declare module "*.svg?raw";

declare global {}
