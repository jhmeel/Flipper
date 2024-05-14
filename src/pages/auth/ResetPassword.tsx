/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useState } from "react";
import MetaData from "../../misc/MetaData";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, resetPassword } from "../../actions/user";
import { RESET_PASSWORD_RESET } from "../../constants";
import HLoader from "../../components/loaders/HLoader";
import { IconInfoCircleFill } from "../../assets/icons";
import Footer from "../../components/Footer";

const ResetPassword = () => {
  const [password, setPassword] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const param = useParams()
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state: any) => state.password
  );
  //To ensure state is at init when page is first loaded
  useEffect(() => {
    dispatch<any>(clearErrors());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch<any>(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch<any>({ type: RESET_PASSWORD_RESET });
      navigate("/login");
    }
  }, [dispatch, error, message, navigate]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch<any>(resetPassword(param?.email, password));
  };
  return (
    <>
      <MetaData title="Reset Password" />
      <ResetPasswordRenderer>
        {loading && <HLoader />}
        <h2>Reset Password</h2>
        <div className="info">
          <span>
            <IconInfoCircleFill fill="#125b8c" />
          </span>

          <p>
            Please provide the new password and ensure it's atleast 8
            characters, with 1 capital letter and one digit.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-cont">
            <label htmlFor="New Password">
              New Password<span className="required">*</span>
            </label>
            <input
              type="text"
              value={password}
              autoFocus
              name="password"
              onChange={onChangeHandler}
              required
            />
          </div>

          <button title="reset">Reset</button>
        </form>
      </ResetPasswordRenderer>
      <Footer />
    </>
  );
};

export default ResetPassword;

const ResetPasswordRenderer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  gap: 5px;
  h2 {
    padding-bottom: 10px;
    display: flex;
    align-self: flex-start;
    font-weight: 1000;
    margin: 0 10px;
  }
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
    color: rgb(80, 80, 80);
    font-size: 1em;
    font-weight: 600;
  }
  .input-cont input {
    padding: 10px;
    background-color: #ededed;
    border: none;
    height: 40px;
    width: 320px;
    outline: none;
    border-radius:16px;
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
    width: 100%;
  }
  button:hover {
    transform: scale(1.01);
  }

  .info {
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
