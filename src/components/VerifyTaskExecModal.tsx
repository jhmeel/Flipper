import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { IconChevronLeft } from "../assets/icons";
import { useNavigate } from "react-router-dom";
import { Task } from "../types";
import { verifyExec, clearErrors } from "../actions/task";
import { useSelector, useDispatch } from "react-redux";
import getToken from "../utils/getToken";
import toast from "react-hot-toast";
import { VERIFY_TASK_EXEC_RESET } from "../constants";
import HLoader from "./loaders/HLoader";
import { useSnackbar } from "notistack";
const VerifyTaskExecModal = ({
  task,
  onRemove,
}: {
  task: Task;
  onRemove: () => void;
}) => {
  const dispatch = useDispatch();
  const { isVerified, loading, error } = useSelector(
    (state: any) => state.task
  );
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [postLink, setPostLink] = useState<string | undefined>(undefined);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPostLink(e.target.value);
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch<any>(clearErrors());
    }

    if (isVerified) {
      toast.success("Verified!");
      dispatch({ type: VERIFY_TASK_EXEC_RESET });
      navigate("/profile");
    }
  }, [dispatch, navigate, error, isVerified, enqueueSnackbar]);

  const verifyPost = async (e: MouseEvent) => {
    e.preventDefault();
    const authToken = await getToken();
    dispatch<any>(
      verifyExec(authToken, { taskId: task._id, postUrl: postLink })
    );
  };
  return (
    <VerifyTaskExecModalRenderer>
      {loading && <HLoader />}
      <span title="back" className="back" onClick={onRemove}>
        <IconChevronLeft />| back
      </span>
      <form>
        <div className="input-cont">
          <label htmlFor="Link to the quoted post">
            Link to the quoted post<span className="required">*</span>
          </label>
          <input
            type="text"
            value={postLink}
            autoFocus
            onChange={onChangeHandler}
            required
          />
        </div>

        <button title="verify" onClick={(e) => verifyPost(e)}>
          Verify
        </button>
      </form>
    </VerifyTaskExecModalRenderer>
  );
};

export default VerifyTaskExecModal;

const VerifyTaskExecModalRenderer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  -moz-backdrop-filter: blur(3px);
  -o-backdrop-filter: blur(3px);
  form {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 5px;
  }
  .required {
    color: crimson;
  }
  .input-cont {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .input-cont label {
    font-weight: 600;
    font-family: monospace;
    font-size: 15px;
    padding: 5px;
  }
  .input-cont input {
    padding: 10px;
    background-color: #ededed;
    border: none;
    height: 40px;
    width: 320px;
    outline: none;
    border-radius: 4px;
  }
  .input-cont input:focus {
    border-bottom: 2px solid #2481a9;
    transition: 0.3s ease-in-out;
  }
  button {
    padding: 10px 20px;
    background-color: #3498db;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    color: #fff;
    margin-top: 10px;
    transition: 0.3s ease-out;
  }
  button:hover {
    transform: scale(1.01);
  }
  .back {
    position: absolute;
    top: 3px;
    left: 5px;
    padding: 5px 10px;
    border: 1px solid #ededed;
    border-radius: 5px;
    background: #fff;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 99;
  }
`;
