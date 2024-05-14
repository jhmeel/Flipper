/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CLEAR_ERRORS,
  FORGOT_PASSWORD_RESET,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOAD_PROFILE_FAIL,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_BANK_INFO_REQUEST,
  UPDATE_BANK_INFO_SUCCESS,
  UPDATE_BANK_INFO_FAIL,
  UPDATE_BANK_INFO_RESET,
  LOG_OUT_USER_REQUEST,
  ACTIVATE_PACKAGE_REQUEST,
  ACTIVATE_PACKAGE_SUCCESS,
  ACTIVATE_PACKAGE_FAIL,
  ACTIVATE_PACKAGE_RESET,
  GET_WALLET_REQUEST,
  GET_WALLET_SUCCESS,
  GET_WALLET_FAIL,
  WITHDRAW_FUNDS_REQUEST,
  WITHDRAW_FUNDS_SUCCESS,
  WITHDRAW_FUNDS_FAIL,
  WITHDRAW_FUNDS_RESET,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAIL,
  OTP_VERIFY_RESET,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAIL,
  RESEND_OTP_RESET,
  GET_TX_HISTORY_REQUEST,
  GET_TX_HISTORY_SUCCESS,
  GET_TX_HISTORY_RESET,
  GET_TX_HISTORY_FAIL,
} from "../constants";
import { USER } from "../types";
import LocalForageProvider from "../utils/localforage";
import { ROOT_STATE } from "../types";

const initialState: USER = {
  username: undefined,
  email: undefined,
  phone: undefined,
  role: undefined,
  avatar: undefined,
  bankinfo: {
    accountNumber: undefined,
    accountName: undefined,
    bankName: undefined,
  },
  referredBy: undefined,
  referrals: undefined,
  referralCode: undefined,
  activity_logs: undefined,
  createdAt: undefined,
};

export const userReducer = (
  state: ROOT_STATE["user"] = {
    user: initialState,
    loading: false,
    isAuthenticated: false,
    token: undefined,
    wallet: undefined,
    txHistory: undefined,
    weeklyCumulation: undefined,
    error: null,
  },
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_PROFILE_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      LocalForageProvider.setAuthToken(payload?.accessToken);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload.user,
        token: payload.accessToken,
      };
    case LOAD_PROFILE_SUCCESS:
      
      return {
        ...state,
        loading: false,
        user: payload.user,
        wallet: payload.wallet,
        weeklyCumulation: payload.weeklyCumulation,
        txHistory: payload.txHistory,
      };
    case LOG_OUT_USER_REQUEST:
      LocalForageProvider.removeAuthToken();
      return {
        loading: false,
        user: undefined,
        token: undefined,
        isAuthenticated: false,
        logoutSuccess: true,
      };
    case LOGIN_USER_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: undefined,
        token: undefined,
        error: payload,
      };
    case LOAD_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        user: undefined,
        wallet: undefined,
        txHistory: undefined,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const passwordReducer = (
  state: ROOT_STATE["password"] = {},
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case OTP_VERIFY_REQUEST:
    case RESEND_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case RESET_PASSWORD_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        message: payload?.message,
      };

    case OTP_VERIFY_SUCCESS:
      return {
        ...state,
        email: payload?.email,
        loading: false,
        success: payload?.success,
        message: payload?.message,
      };

    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        otp: payload?.otp,
        expiresAt: payload?.expiresAt,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        message: payload?.message,
        otp: payload?.otp,
        expiresAt: payload?.expiresAt,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case OTP_VERIFY_FAIL:
    case RESEND_OTP_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FORGOT_PASSWORD_RESET:
    case UPDATE_PASSWORD_RESET:
    case RESET_PASSWORD_RESET:
    case OTP_VERIFY_RESET:
    case RESEND_OTP_RESET:
      return {
        ...state,
        //exclude expiresAt so that it can be access from otp verification page
        loading: false,
        message: undefined,
        otp: undefined,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return { ...state, loading: false };
  }
};

export const profileReducer = (
  state: ROOT_STATE["profile"] = {},
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_BANK_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_BANK_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload.success,
      };
    case UPDATE_PROFILE_FAIL:
    case UPDATE_BANK_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_PROFILE_RESET:
    case UPDATE_BANK_INFO_RESET:
      return {
        ...state,
        loadding: false,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const packageReducer = (
  state: ROOT_STATE["package"] = {},
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case ACTIVATE_PACKAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTIVATE_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        isActivated: payload.success,
        wallet: payload.wallet,
      };
    case ACTIVATE_PACKAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ACTIVATE_PACKAGE_RESET:
      return {
        ...state,
        isActivated:null
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const walletReducer = (
  state: ROOT_STATE["wallet"] = {},
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case GET_WALLET_REQUEST:
    case WITHDRAW_FUNDS_REQUEST:
    case GET_TX_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        wallet: payload.wallet,
      };
    case GET_TX_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        tillLastweekCumulation: payload.tillLastweekCumulation,
      };
    case WITHDRAW_FUNDS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload.message,
      };
    case GET_WALLET_FAIL:
    case WITHDRAW_FUNDS_FAIL:
    case GET_TX_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case WITHDRAW_FUNDS_RESET:
    case GET_TX_HISTORY_RESET:
      return {
        ...state,
        message: undefined,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
