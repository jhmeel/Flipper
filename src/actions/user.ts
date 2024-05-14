/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../utils/axiosInstance";
import { errorParser } from "../utils/formatter";
import {
  ACTIVATE_PACKAGE_FAIL,
  ACTIVATE_PACKAGE_REQUEST,
  ACTIVATE_PACKAGE_SUCCESS,
  CLEAR_ERRORS,
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
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  LOG_OUT_USER_REQUEST,
  LOG_OUT_USER_FAIL,
  GET_WALLET_FAIL,
  GET_WALLET_REQUEST,
  GET_WALLET_SUCCESS,
  UPDATE_BANK_INFO_REQUEST,
  WITHDRAW_FUNDS_FAIL,
  WITHDRAW_FUNDS_SUCCESS,
  WITHDRAW_FUNDS_REQUEST,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAIL,
  RESEND_OTP_FAIL,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_REQUEST,
  GET_TX_HISTORY_SUCCESS,
  GET_TX_HISTORY_REQUEST,
  GET_TX_HISTORY_FAIL,
  UPDATE_BANK_INFO_SUCCESS,
  UPDATE_BANK_INFO_FAIL,
} from "../constants";
import { ACTION } from "../types";

// Login User
export const loginUser =
  (email: string, password: string) =>
  async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: LOGIN_USER_REQUEST });
      const { data } = await axiosInstance().post("/api/v1/auth/login", {
        email,
        password,
      });
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: errorParser(error),
      });
    }
  };

// Register User
export const registerUser =
  (userData: FormData | Record<string, any>) =>
  async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      const { data } = await axiosInstance().post(
        "/api/v1/auth/signup",
        userData
      );
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: errorParser(error),
      });
    }
  };

export const loadProfile =
  (token: string) => async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: LOAD_PROFILE_REQUEST });
      const { data } = await axiosInstance(token).get("/api/v1/user/profile");
      dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_PROFILE_FAIL,
        payload: errorParser(error),
      });
    }
  };

// Update User Password
export const updatePassword =
  (token?: string, passwords?: { oldPassword: string; newPassword: string }) =>
  async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });

      const { data } = await axiosInstance(token).put(
        "/api/v1/password/update",
        passwords
      );

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: errorParser(error),
      });
    }
  };

// Forgot Password
export const forgotPassword =
  (email: string) => async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
      const { data } = await axiosInstance().post(
        "/api/v1/password/forgotten",
        { email }
      );
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: errorParser(error),
      });
    }
  };

// Reset Password
export const resetPassword =
  (email?: string, newPassword?: string) =>
  async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      const { data } = await axiosInstance().put(
        `/api/v1/password/reset/${email}`,
        {
          newPassword,
        }
      );
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: errorParser(error),
      });
    }
  };

// Update User Profile
export const updateProfile =
  (token?: string, avatar?: string | ArrayBuffer) =>
  async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });

      const { data } = await axiosInstance(token).put(
        "/api/v1/user/profile/update",
        { avatar }
      );

      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: errorParser(error),
      });
    }
  };

//activatePackage
export const activatePackage =
  (token?: string, pId?: string) =>
  async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: ACTIVATE_PACKAGE_REQUEST });

      const { data } = await axiosInstance(token).post(
        "/api/v1/package/activate",
        { pId }
      );

      dispatch({
        type: ACTIVATE_PACKAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACTIVATE_PACKAGE_FAIL,
        payload: errorParser(error),
      });
    }
  };

//Update Bank Info
export const updateBankInfo =
  (
    token?: string,
    bankInfo?: {
      accountNumber?: string;
      accountName?: string;
      bankName?: string;
    }
  ) =>
  async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: UPDATE_BANK_INFO_REQUEST });

      const { data } = await axiosInstance(token).post(
        "/api/v1/user/bank-info-update",
        bankInfo
      );

      dispatch({
        type: UPDATE_BANK_INFO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BANK_INFO_FAIL,
        payload: errorParser(error),
      });
    }
  };

// logout user
export const logoutUser =
  (username?: string) => async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: LOG_OUT_USER_REQUEST, payload: { username } });
    } catch (error) {
      dispatch({
        type: LOG_OUT_USER_FAIL,
        payload: errorParser(error),
      });
    }
  };

//get wallet
export const getWallet =
  (token?: string) => async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: GET_WALLET_REQUEST });

      const { data } = await axiosInstance(token).get("/api/v1/user/wallet");
      dispatch({
        type: GET_WALLET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_WALLET_FAIL,
        payload: errorParser(error),
      });
    }
  };

//withdraw
export const onWithdrawFunds =
  (token?: string, amount?: number) =>
  async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: WITHDRAW_FUNDS_REQUEST });

      const { data } = await axiosInstance(token).post(
        "/api/v1/user/withdraw",
        { amount }
      );

      dispatch({
        type: WITHDRAW_FUNDS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: WITHDRAW_FUNDS_FAIL,
        payload: errorParser(error),
      });
    }
  };

// verify OTP
export const verifyOTP =
  (otp?: string) => async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: OTP_VERIFY_REQUEST });

      const { data } = await axiosInstance().post("/api/v1/user/verify-otp", {
        otp,
      });

      dispatch({
        type: OTP_VERIFY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: OTP_VERIFY_FAIL,
        payload: errorParser(error),
      });
    }
  };

export const getTxHistory =
  (token: string) => async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: GET_TX_HISTORY_REQUEST });

      const { data } = await axiosInstance(token).get(
        "/api/v1/user/tx-history"
      );

      dispatch({
        type: GET_TX_HISTORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_TX_HISTORY_FAIL,
        payload: errorParser(error),
      });
    }
  };

// resend OTP
export const resendOTP =
  (token: string) => async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: RESEND_OTP_REQUEST });

      const { data } = await axiosInstance(token).get("/api/v1/user/get-otp");

      dispatch({
        type: RESEND_OTP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESEND_OTP_FAIL,
        payload: errorParser(error),
      });
    }
  };
// Clear All Errors
export const clearErrors = () => (dispatch: (action: ACTION) => void) => {
  dispatch({ type: CLEAR_ERRORS });
};
