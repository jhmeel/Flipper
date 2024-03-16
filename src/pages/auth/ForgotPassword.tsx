import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, forgotPassword } from "../../actions/user";
import HLoader from "../../components/loaders/HLoader";
import { IconInfoCircleFill } from "../../assets/icons";
import Footer from "../../components/Footer";
import emailjs from "@emailjs/browser";
import MetaData from "../../misc/MetaData";
import { useSnackbar } from "notistack";
import { errorParser } from "../../utils/formatter";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, otp, error } = useSelector((state: any) => state.password);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    emailjs.init({
      publicKey: "tTnt3JKDvvNxscd-i",
    });
  }, []);

  const sendEmail = async () => {
    try {
      const serviceID = "service_6fw6u9h";
      const templateID = "template_r4q3xh8";

      const params = {
        to_email: email,
        to_name: email.split("@")[0],
        from_name: "Flipper",
        OTP: otp,
        site_name: "Flipper",
      };

      await emailjs.send(serviceID, templateID, params);

      toast.success(`Verify your account- An OTP has been sent to ${email}`);
      navigate("/verify-otp");
    } catch (error) {
      enqueueSnackbar(errorParser(error), { variant: "error" });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch<any>(clearErrors());
    }
    if (otp) {
      sendEmail();
    }
  }, [dispatch, error, otp]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch<any>(forgotPassword(email));
  };
  return (
    <>
      <ForgotPasswordRenderer>
        <MetaData title="Forgot Password" />
        {loading && <HLoader />}

        <h2>Reset Password</h2>
        <div className="info">
          <span>
            <IconInfoCircleFill fill="#125b8c" />
          </span>

          <p>
            Please provide the email address associated with your account so
            that we can send you an OTP to reset your password.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-cont">
            <label htmlFor="Email">
              Your Email Address<span className="required">*</span>
            </label>
            <input
              type="email"
              value={email}
              autoFocus
              onChange={onChangeHandler}
              required
            />
          </div>

          <button title="proceed">Proceed</button>
        </form>
      </ForgotPasswordRenderer>
      <Footer />
    </>
  );
};

export default ForgotPassword;
const ForgotPasswordRenderer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #fff;

  h2 {
    max-width: 600px;
    padding-bottom: 5px;
    display: flex;
    margin: 0 10px;
    align-self: flex-start;
    font-weight: 1000;
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
    font-weight: 600;
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
