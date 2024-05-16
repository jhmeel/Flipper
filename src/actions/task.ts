import {
  CLEAR_ERRORS,
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  GET_ACTIVE_TASK_PROGRESS_FAIL,
  GET_ACTIVE_TASK_PROGRESS_REQUEST,
  GET_ACTIVE_TASK_PROGRESS_SUCCESS,
  GET_DAILY_TASK_FAIL,
  GET_DAILY_TASK_REQUEST,
  GET_DAILY_TASK_SUCCESS,
  VERIFY_TASK_EXEC_FAIL,
  VERIFY_TASK_EXEC_REQUEST,
  VERIFY_TASK_EXEC_SUCCESS,
} from "../constants";
import { ACTION, Task } from "../types";
import axiosInstance from "../utils/axiosInstance";
import { errorParser } from "../utils/formatter";

//create tasks
export const createTask =
  (token?: string, tasks?: Array<Task>) =>
  async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: CREATE_TASK_REQUEST });

      const { data } = await axiosInstance(token).post(
        "/api/v1/task/new",
        tasks
      );

      dispatch({
        type: CREATE_TASK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_TASK_FAIL,
        payload: errorParser(error),
      });
    }
  };

//verify task exec
export const verifyExec =
  (token?: string, taskDetails?: { taskId?: string; postUrl?: string }) =>
  async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: VERIFY_TASK_EXEC_REQUEST });
  
      const { data } = await axiosInstance(token).post(
        "/api/v1/task/verify",
        taskDetails
      );
     

      dispatch({
        type: VERIFY_TASK_EXEC_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: VERIFY_TASK_EXEC_FAIL,
        payload: errorParser(error),
      });
    }
  };

//get daily task
export const getDailyTask =
  (token?: string) => async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: GET_DAILY_TASK_REQUEST });

      const { data } = await axiosInstance(token).get("/api/v1/task/daily");
      dispatch({
        type: GET_DAILY_TASK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_DAILY_TASK_FAIL,
        payload: errorParser(error),
      });
    }
  };

//get task progress
export const getActiveTaskProgress =
  (token?: string) => async (dispatch: (action: ACTION) => void) => {
    try {
      dispatch({ type: GET_ACTIVE_TASK_PROGRESS_REQUEST });

      const { data } = await axiosInstance(token).get(
        "/api/v1/task/daily/progress"
      );

      dispatch({
        type: GET_ACTIVE_TASK_PROGRESS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_TASK_PROGRESS_FAIL,
        payload: errorParser(error),
      });
    }
  };

// Clear All Errors
export const clearErrors = () => (dispatch: (action: ACTION) => void) => {
  dispatch({ type: CLEAR_ERRORS });
};
