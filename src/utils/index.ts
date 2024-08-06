export const hideAddress = (address: string) => {
  if (address == null) {
    return "";
  }
  if (String(address).length <= 20) {
    return address;
  }
  const start = address.slice(0, 5);
  const end = address.slice(-5);
  return `${start}****${end}`;
};
/** 根据key，value添加localStoreage */
export const setStorage = (key: string, value: any) => {
  return window?.localStorage?.setItem(key, value);
};
/** 根据key获取localStoreage */
export const getStorage = (key: string) => {
  return window?.localStorage?.getItem(key);
};
/** 根据key移除localStoreage */
export const removeStorage = (key: string) => {
  return window?.localStorage?.removeItem(key);
};

/** 从1971年到当前的天数 */
export const diffCurrentDays = () => {
  // 获取当前日期和时间
  const now: any = new Date();
  // 获取1970年1月1日的日期和时间
  const start: any = new Date(1970, 0, 1);
  // 计算当前日期和1970年1月1日之间的时间差，以毫秒为单位
  const diffInMilliseconds = now - start;
  // 将时间差从毫秒转换为天数
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  return diffInDays;
};
export const isMobile = () => {
  if (typeof window !== "undefined") {
    const userAgent = window && window?.navigator?.userAgent;
    if (
      /android/i.test(userAgent) ||
      /iPhone|iPad|iPod/.test(userAgent) ||
      /webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    ) {
      return true;
    }
  }
  return false;
};
