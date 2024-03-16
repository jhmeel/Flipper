import {
  CLEAR_ERRORS,
  GET_ACTIVE_TASK_PROGRESS_FAIL,
  GET_ACTIVE_TASK_PROGRESS_REQUEST,
  GET_ACTIVE_TASK_PROGRESS_RESET,
  GET_ACTIVE_TASK_PROGRESS_SUCCESS,
  GET_DAILY_TASK_FAIL,
  GET_DAILY_TASK_REQUEST,
  GET_DAILY_TASK_RESET,
  GET_DAILY_TASK_SUCCESS,
  VERIFY_TASK_EXEC_FAIL,
  VERIFY_TASK_EXEC_REQUEST,
  VERIFY_TASK_EXEC_RESET,
  VERIFY_TASK_EXEC_SUCCESS,
} from "../constants";
import { ROOT_STATE } from "../types";

export const taskReducer = (
  state: ROOT_STATE["task"] = {},
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case GET_DAILY_TASK_REQUEST:
    case GET_ACTIVE_TASK_PROGRESS_REQUEST:
    case VERIFY_TASK_EXEC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ACTIVE_TASK_PROGRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        progress: payload.progress,
      };
    case GET_DAILY_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: payload.tasks,
      };
    case VERIFY_TASK_EXEC_SUCCESS:
      return {
        ...state,
        loading: false,
        isVerified: payload.success,
      };
    case VERIFY_TASK_EXEC_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case VERIFY_TASK_EXEC_RESET:
      return {
        ...state,
        loading: false,
        isVerified: false,
      };
    case GET_ACTIVE_TASK_PROGRESS_FAIL:
    case GET_DAILY_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case GET_ACTIVE_TASK_PROGRESS_RESET:
    case GET_DAILY_TASK_RESET:
      return {
        ...state,
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
