import { ChormeExtModule } from '../types';

// 传递信息至content
export const sendMessageToContent = (type: string, data?: unknown, callback?: () => void) => {
  window.chrome.tabs.query({ active: !0, currentWindow: !0 }, function (tabs) {
    tabs[0].id != undefined &&
      window.chrome.tabs.sendMessage(
        tabs[0].id,
        {
          type,
          to: ChormeExtModule.CONTENT,
          data,
        },
        callback,
      );
  });
};

export const sendMessageToPopup = (type: string, data?: unknown, callback?: () => void) => {
  window.chrome.tabs.query({ active: !0, currentWindow: !0 }, function (tabs) {
    tabs[0].id != undefined &&
      window.chrome.tabs.sendMessage(
        tabs[0].id,
        {
          type,
          to: ChormeExtModule.POPUP,
          data,
        },
        callback,
      );
  });
};

// 传递信息至background
export const sendMessageToBg = (type: string, data: unknown, callback?: () => void) => {
  window.chrome.runtime.sendMessage(
    {
      to: ChormeExtModule.BACKGROUND,
      type,
      data,
    },
    callback,
  );
};

// get chrome缓存
export const getValueFromStorage = <T = { [key: string]: any }>(keys: string[], callback?: (value: T) => void) => {
  window.chrome.storage?.local.get(keys, function (result) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    callback && callback(result);
  });
};

// set chrome缓存
export const setValueFromStorage = (
  value: Record<string, string | number>,
  callback?: (value: Record<string, string | number>) => void,
) => {
  window.chrome.storage?.local.set(value, function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    callback && callback(value);
  });
};

// 获取url参数
export const getURLParamsQuery = <T extends string | string[]>(url: string, keys: T): T => {
  const urlQuery: Record<string, string> = {};
  const queryStr = url.split('?')[1];
  if (!queryStr) return '' as T;

  queryStr.split('&').forEach((value) => {
    const [key, val] = value.split('=');
    urlQuery[key] = val;
  });

  if (typeof keys === 'string') {
    return (urlQuery[keys] || '') as T;
  } else {
    return keys.map((key) => urlQuery[key] || '') as T;
  }
};
