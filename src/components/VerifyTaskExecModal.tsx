import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { IconChevronLeft, IconInfoCircleFill, IconLink } from "../assets/icons";
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
    if (!postLink) {
      toast.error("Please provide the link!");
      return;
    } else if (!postLink.startsWith("https")) {
      toast.error("Please provide a valid link!");
      return;
    }
    dispatch<any>(
      verifyExec(authToken, { taskId: task?._id, postUrl: postLink })
    );
  };
  return (
    <VerifyTaskExecModalRenderer>
      {loading && <HLoader />}
      <span title="back" className="back" onClick={onRemove}>
        <IconChevronLeft />| back
      </span>
      <div className="info">
        <span>
          <IconInfoCircleFill fill="#125b8c" />
        </span>

        <p>
          To receive your ROC, please provide the link to the post where you
          completed the previous step. Ensure the link is correct.
        </p>
      </div>

      <form>
        <div className="input-cont">
          <label htmlFor="Link">
            <IconLink height={20} width={20} />
            Enter the Link<span className="required">*</span>
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
    font-size: 15px;
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 3px;
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
    border-radius: 14px;
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

  .info {
    margin-top: 15px;
    margin-bottom: 40px;
    padding: 10px;
    background-color: #77b1d7;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    font-size: 12px;
    border-left: 4px solid #2b7eb6;
  }
  .info p {
    color: #f1f1f1;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
`;
