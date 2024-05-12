import Config from "../config/Config";
import LocalForageProvider from "./localforage";

export const FormattedCount = (count: number | undefined): string | number => {
  if (!count) return 0;

  let formattedCount: string | number;

  if (count >= 1000000) {
    formattedCount = (count / 1000000).toFixed(1) + "m";
  } else if (count >= 1000) {
    formattedCount = (count / 1000).toFixed(1) + "k";
  } else {
    formattedCount = count.toString();
  }

  return formattedCount;
};

export function removeHtmlAndHashTags(caption: string): string {
  // Replace #/ with an empty string
  caption = caption.replace(/#\/+/g, "");

  // Replace HTML elements with an empty string
  caption = caption.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, "");

  // Replace ## with an empty string
  caption = caption.replace(/##/g, "");

  return caption;
}

export const padBalance = (balance?: number): string => {
  if (!balance) {
    return "0.00";
  }
  balance = Number(balance);
  if (balance < 10 || (balance > 10 && balance < 1000)) {
    return balance.toFixed(2);
  } else {
    return balance.toLocaleString(undefined, { minimumFractionDigits: 2 });
  }
};

export function padZero(value: number) {
  return value < 10 ? `0${value}` : `${value}`;
}

export const errorParser = (error: any): string => {
  const errMsg =
    error?.response?.data?.message ||
    error?.response?.statusText ||
    error?.message;
  if (
    errMsg?.includes("timeout") ||
    errMsg?.includes("Network Error") ||
    errMsg?.includes("timed out")
  ) {
    return "Request timeout. Please Check your network status and try again.";
  } else if (errMsg?.includes("jwt")) {
    LocalForageProvider.removeAuthToken();
    return "Your session has expired, relogin into your account";
  } else if (errMsg?.includes("429")) {
    return "We are currently experiencing high traffic and won't be able to process your request, please checkback-in in the next 5 minutes";
  } else {
    return errMsg || "An error occurred.";
  }
};

export const getColonTimeFromDate = (date: Date | null): string | undefined => {
  return date?.toTimeString().slice(0, 8);
};

/**
 *
 * @param pId package id to compute
 * @returns return on completion {ROC} in naira, iniatially expressed in percentage
 */
export const getROC = (pId: "XAU" | "XAG" | "XPT"): number => {
  if (!pId) {
    return 0;
  }
  const ROC = Config.PACKAGES.find((p) => p.id === pId)?.ROC;
  const PP = Config.PACKAGES.find((p) => p.id === pId)?.price;
  const rocInNaira = (ROC / 100) * PP;
  return rocInNaira;
};

/**
 *
 * @param pId package id to compute
 * @param amount amount to compute
 * @returns percentage of amount to life time return on investment {LROI}
 */

export const getPercentage = (
  pId: "XAU" | "XAG" | "XPT",
  amount: number
): number => {
  if (!pId || !amount) {
    return 0;
  }
  // get LROI, initially expressed in naira
  const LROI = Config.PACKAGES.find((p) => p.id === pId)?.LROI;
  const percent = (100 / LROI) * amount;
  return Math.round(percent);
};

/**
 * certainly need to review this
 * @param pId
 * @param type
 * @param amount
 * @returns number
 */

export const getCumulativePercentage = (
  pId: "XAU" | "XAG" | "XPT",
  type: string,
  amount: number
): number => {
  if (!type || !amount || !pId) {
    return 0;
  }
  const possibleTypes = ["Task Completion", "Referral Bonus", "Ads"];
  if (!possibleTypes.includes(type)) {
    return 0;
  }
  let LROI = Config.PACKAGES.find((p) => p.id === pId)?.LROI;
  do {
    LROI *= 3;
  } while (LROI <= amount);

  const percent = (100 / LROI) * amount;
  return Math.round(percent);
};

/**
 * Replaces all but the last n of characters with the specified mask character.
 * @param cc string to mask
 * @param n last n of characters to be left unmask
 * @param m  mask symbol
 * @returns
 */
export const Mask = (
  cc: string,
  n: number,
  m: string | number | boolean
): string => {
  const maskedPart = String(m).repeat(cc.length - n);
  const visiblePart = cc.slice(cc.length - n);
  return maskedPart + visiblePart;
};
