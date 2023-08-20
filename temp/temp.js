function recursiveUnProxy(obj) {
  if (typeof obj !== "object" || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map((item) => recursiveUnProxy(item));
  const unProxiedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      unProxiedObj[key] = recursiveUnProxy(obj[key]);
    }
  }
  return unProxiedObj;
}
let items_elements = document.querySelectorAll(`#userInventory > div > div:not([class])`);
let items = Array.from(items_elements).map((item) => {
  let reactPropsKey = Object.keys(item).find((key) => key.startsWith("__reactProps"));
  let skin_proxy_info = item?.[reactPropsKey]?.children[0]?.props?.children?.props?.children?.props?.children?.props?.children?.props?.skin?.skin;
  return { ...recursiveUnProxy(skin_proxy_info), item };
});
