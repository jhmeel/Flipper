/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import MetaData from "../misc/MetaData";
import styled, { keyframes } from "styled-components";
import {
  IconCalendarEventFill,
  IconChevronRight,
  IconCubeOutline,
  IconSubtask,
} from "../assets/icons";
import WeekActivity from "../components/WeekActivities";
import Footer from "../components/Footer";
import NotificationItem from "../components/NotificationItem";
import VerifyTaskExecModal from "../components/VerifyTaskExecModal";
import { Task } from "../types";
import { getDailyTask, clearErrors as clearTaskErr } from "../actions/task";
import {
  getWallet,
  clearErrors as clearWalletErr,
  getTxHistory,
} from "../actions/user";
import { useSelector, useDispatch } from "react-redux";
import RDotSpinner from "../components/loaders/RDotSpinner";
import HLoader from "../components/loaders/HLoader";
import { Mask, getROC } from "../utils/formatter";
import { useSnackbar } from "notistack";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const TaskExecution = () => {
  const [taskCompletionStatus, setTaskCompletionStatus] = useState<
    "Pending..." | "Inprogress" | "Completed" | "Closed" | "N/A"
  >("Pending...");
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    error: taskErr,
    loading: taskLoading,
    progress,
    tasks,
  } = useSelector((state: RootState) => state.task);

  const {
    error: walletErr,
    loading: walletLoading,
    wallet,
    tillLastweekCumulation,
  } = useSelector((state: RootState) => state.wallet);
  const { token } = useSelector((state: RootState) => state.user);

  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isTaskExecModalActive, setIsTaskExecModalActive] =
    useState<boolean>(false);
  const [isVerificationModalActive, setVerificationModalActive] =
    useState<boolean>(false);

  useEffect(() => {
    if (progress === 0) {
      setTaskCompletionStatus("Pending...");
    } else if (progress <= 2) {
      setTaskCompletionStatus("Inprogress");
    } else if (progress === 3) {
      setTaskCompletionStatus("Completed");
    } else if (!progress) {
      setTaskCompletionStatus("N/A");
    }
  }, [progress]);

  const onTaskExecModalRemove = () => {
    setIsTaskExecModalActive(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (
      taskErr &&
      taskErr?.includes(
        "Please choose an investment plan and activate your wallet!"
      )
    ) {
      //user dont have a wallet yet go to home
      navigate("/");
      toast.error(taskErr);
      dispatch<any>(clearTaskErr());
    } else if (taskErr) {
      enqueueSnackbar(taskErr, { variant: "error" });
      dispatch<any>(clearTaskErr());
    }
    const getTask = async () => {
      navigator.onLine && token && dispatch<any>(getDailyTask(token));
    };

    getTask();
  }, [dispatch]);

  const getTillLastWeekCumulation = async () => {
    dispatch<any>(getTxHistory(token));
  };

  useEffect(() => {
    getTillLastWeekCumulation();
  }, []);

  const getWalletD = async () => {
    navigator.onLine && token && dispatch<any>(getWallet(token));
  };

  //Only show error if package is activated
  useEffect(() => {
    if (walletErr && wallet?.pId) {
      enqueueSnackbar(walletErr, { variant: "error" });
      dispatch<any>(clearWalletErr());
    }

    getWalletD();
  }, [dispatch]);

  useEffect(() => {
    const countToDate = tasks ? new Date().getTime() + 12 * 60 * 60 * 1000 : 0;
    const updateCountdown = () => {
      const currentDate = new Date();
      const timeBetweenDates = Math.ceil(
        (countToDate - currentDate.getTime()) / 1000
      );
      setTime(timeBetweenDates);
    };

    // Initial update
    updateCountdown();

    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const verifyTaskExec = () => {
    setVerificationModalActive(true);
  };

  const onVerificationModalRemove = () => {
    setVerificationModalActive(false);
  };

  return (
    <>
      <MetaData title="Tasks" />
      <TaskActivityRenderer>
        {taskLoading && <HLoader />}
        <div className="activity-progress">
          <div className="progress-banner">
            <header>
              <IconSubtask style={{ cursor: "pointer" }} />
              <h6>{taskCompletionStatus}</h6>
            </header>
            <h2
              className="current-earning"
              title="Balance"
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
            >
              {walletLoading ? (
                <RDotSpinner />
              ) : wallet?.balance && isBalanceVisible ? (
                `₦ ${wallet?.balance}`
              ) : wallet?.balance && !isBalanceVisible ? (
                Mask(String(wallet?.balance), 0, "*")
              ) : (
                "--"
              )}
            </h2>
            <div className="progrss-desc"></div>
            <div className="act-progress">
              <span style={{ width: `${(progress * 100) / 3}%` }}></span>
            </div>
            <div className="progress-footer">
              <span className="timer">
                Time left{" "}
                <span style={{ color: "#993908" }}>
                  {tasks
                    ? `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
                        seconds
                      )}`
                    : "N/A"}
                </span>
              </span>
              <span>{progress && (Number(progress) / 3) * 100}%</span>
            </div>
          </div>
        </div>
        <div className="activities">
          <header>
            <h3>Daily Tasks</h3>
            <span className="activity-date">
              <IconCalendarEventFill fill="gray" />
              {new Date().toDateString()}
            </span>
          </header>
          <div className="task-cont">
            {tasks?.length > 0
              ? tasks.map((task: Task, i) => (
                  <div className="task" key={i}>
                    <span className="task-icon-cont">
                      <IconCubeOutline height={16} fill="#4a4ab9" />
                    </span>

                    <p>{task.name}</p>

                    <p className="task-roc" title="Return on completion">
                      ROC | <span>₦{getROC(wallet?.pId)}</span>
                    </p>
                    <button
                      className="active-btn"
                      title="Execute"
                      onClick={() => {
                        setIsTaskExecModalActive(true);
                        setActiveTask(task);
                      }}
                    >
                      execute
                      <IconChevronRight fill="#fff" />
                    </button>
                  </div>
                ))
              : Array(3)
                  .fill(null)
                  .map((task, i) => (
                    <div className="task" key={i}>
                      <span className="task-icon-cont">
                        <IconCubeOutline height={16} fill="#4a4ab9" />
                      </span>

                      <p>N/A</p>

                      <p className="task-roc" title="Return on completion">
                        ROC | <span>₦---</span>
                      </p>
                      <button disabled title="N/A" className="disabled-btn">
                        execute
                        <IconChevronRight fill="#fff" />
                      </button>
                    </div>
                  ))}
          </div>
        </div>
        <div className="weekly-activity-chart">
          <header>
            <h3>Week Activity</h3>
            <span className="activity-date">
              <IconCalendarEventFill fill="gray" />
              Last 7 days
            </span>
          </header>
          <WeekActivity activities={tillLastweekCumulation} pId={wallet?.pId} />
        </div>
      </TaskActivityRenderer>

      {isTaskExecModalActive && (
        <NotificationItem
          type={activeTask?.variant}
          icon={<IconCubeOutline fill="#3498db" />}
          title={activeTask?.name}
          description={activeTask?.instruction}
          onRemove={onTaskExecModalRemove}
          btnText="Done"
          onPress={verifyTaskExec}
        />
      )}

      {isVerificationModalActive && (
        <VerifyTaskExecModal
          task={activeTask}
          onRemove={onVerificationModalRemove}
        />
      )}

      <Footer />
    </>
  );
};

export default TaskExecution;
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
const TaskActivityRenderer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  padding: 5px 10px;
  margin: 0 auto;
  gap: 10px;

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }
    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  .activity-progress,
  .activities,
  .weekly-activity-chart {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      font-size: 14px;
    }
  }
  .progress-banner {
    height: 120px;
    width: 95%;
    border-radius: 10px;
    animation: ${gradientAnimation} 5s infinite;
    background: linear-gradient(45deg, #3498db, #9b59b6, #2ecc71);
    background-size: 200% 200%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
  }
  .act-progress {
    width: 90%;
    height: 6px;
    background-color: #ededed;
    border-radius: 12px;
    position: relative;
  }

  .act-progress span {
    position: absolute;
    background-color: #cac53d;
    height: 100%;
    border-radius: 12px;
    transition: 0.3s ease-out;
  }
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  header span {
    font-size: 12px;
    color: gray;
  }
  .task-cont {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
    gap: 4px;
  }
  .task-icon-cont {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: rgb(171, 171, 243);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .task {
    width: 180px;
    height: 150px;
    border-radius: 8px;
    border: 1px solid #ededed;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
  }
  @media (max-width: 767px) {
    .task {
      width: 120px;
    }
  }
  .disabled-btn {
    border: none;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: pointer;
    border-radius: 8px;
    background-color: rgb(141, 141, 155);
    color: #fff;
  }
  .task .active-btn {
    border: none;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: pointer;
    border-radius: 8px;
    background-color: rgb(85, 85, 236);
    color: #fff;
  }
  .task button:hover {
    transform: scale(1.01);
  }
  .progress-footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  .progress-footer span {
    font-size: 12px;
    color: #000000;
    font-weight: 700;
  }

  .task-roc {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    font-size: 12px;
    color: rgb(152, 152, 230);
    cursor: pointer;
  }
  .task-roc span {
    font-weight: 700;
  }
  .activity-date {
    display: flex;
    gap: 3px;
    align-items: center;
  }

  .current-earning {
    position: relative;
    font-size: 18px;
    font-family: "Zeitung", serif;
    font-weight: 500;
    animation: pulse 1.5s ease-out infinite;
    cursor: pointer;
    color: #fff;
  }
  .timer {
    position: relative;
  }
  .timer::before,
  .timer::after {
    position: absolute;
    content: "";
    height: 4px;
    width: 4px;
    border-radius: 50%;
    left: -12px;
    bottom: 5px;
    background-color: #234;
  }
  .timer::before {
    width: 8px;
    height: 8px;
    background-color: #234;
  }
  .timer::after {
    width: 8px;
    height: 8px;
    animation: pulse 1s linear infinite;
  }
`;
