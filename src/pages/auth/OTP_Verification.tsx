import React, { useEffect, useRef, useState } from "react";
import MetaData from "../../misc/MetaData";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, verifyOTP } from "../../actions/user";
import { FORGOT_PASSWORD_RESET, OTP_VERIFY_RESET } from "../../constants";
import HLoader from "../../components/loaders/HLoader";
import { IconInfoCircleFill } from "../../assets/icons";
import Footer from "../../components/Footer";
import { enqueueSnackbar } from "notistack";

const OTP_Verification = (): React.ReactElement => {
  const { error, loading, message, expiresAt } = useSelector(
    (state: any) => state.password
  );
  const [OTP, setOTP] = useState<string | null>(null);
  const OTPInputs = Array.from({ length: 4 }, () =>
    useRef<HTMLInputElement | null>(null)
  );

   //To ensure state is at init when page is first loaded
   useEffect(() => {
    dispatch<any>(clearErrors());
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch<any>(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch<any>({ type: FORGOT_PASSWORD_RESET });
      dispatch<any>({ type: OTP_VERIFY_RESET });
      navigate("/reset-password");
    }
  }, [dispatch, error, message, navigate]);

  const btn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    OTPInputs[0].current?.focus();
  }, []);

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    const nextIndex = index + 1;

    if (value.length > 1 && value.length === 2) {
      e.target.value = "";
    }

    if (value && nextIndex < OTPInputs.length) {
      OTPInputs[nextIndex].current?.focus();
    }

    if (value && nextIndex === OTPInputs.length) {
      btn.current?.focus();
    }

    const isFilled = OTPInputs.every((inputRef) => inputRef.current?.value);

    if (isFilled) {
      btn.current?.classList.add("active");
      const otpVals: string = OTPInputs.map(
        (inp, i) => inp["current"]["value"]
      ).join("");
      setOTP(otpVals);
    } else {
      btn.current?.classList.remove("active");
    }
  };

  const handleBackspace = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (
      e.key === "Backspace" &&
      OTPInputs[index].current?.previousElementSibling
    ) {
      const currentInput = e.currentTarget as HTMLInputElement;
      currentInput.value = "";
      currentInput.disabled = true;
  
      const previousInput = OTPInputs[index].current?.previousElementSibling as HTMLInputElement;
      if (previousInput) {
        previousInput.focus();
      }
    }
  };
  const onVerifyOTP = (e:any) => {
    e.preventDefault();
    if (!OTP) {
      return;
    }
    dispatch<any>(verifyOTP(OTP));
  };

  const onResendOTP = async () => {
    navigate("/forgot-password");
  };

  //OTP EXPIRY TIMER
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const updateCountdown = () => {
      const currentDate = new Date();
      const timeBetweenDates = Math.ceil(
        (expiresAt - currentDate.getTime()) / 1000
      );
      setTime(timeBetweenDates);
    };

    let intervalId;
    // Initial update
    if (expiresAt) {
      updateCountdown();

      intervalId = setInterval(updateCountdown, 1000);
    }

    return () => clearInterval(intervalId);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hours = expiresAt ? Math.floor(time / 3600) : 0;
  const minutes = expiresAt ? Math.floor((time % 3600) / 60) : 0;
  const seconds = expiresAt ? time % 60 : 0;

  const formatTime = (value: number) => value.toString().padStart(2, "0");
  return (
    <>
      <MetaData title="OTP Verification" />
      <OTPFormRenderer>
        {loading && <HLoader />}
        <h3>Security Verification</h3>
        <div className="info">
          <span>
            <IconInfoCircleFill fill="#125b8c" />
          </span>

          <p>
            Please provide the one time passcode[OTP] that was sent to your
            email address.
          </p>
        </div>
        <form>
          <div className="input-cont">
            {OTPInputs.map((inputRef, index) => (
              <input
                key={index}
                type="number"
                ref={inputRef}
                onChange={(e) => handleInputChange(index, e)}
                onKeyUp={(e) => handleBackspace(index, e)}
              />
            ))}
          </div>
          <div className="input-cont-footer">
            <div className="footer-in">
              <span>
                {formatTime(minutes)}:{formatTime(seconds)}
              </span>
              <span
                style={{ textDecoration: "underline" }}
                onClick={onResendOTP}
              >
                resend Code?
              </span>
            </div>

            <button onClick={onVerifyOTP} ref={btn} className="active-btn">
              Verify
            </button>
          </div>
        </form>
      </OTPFormRenderer>
      <Footer />
    </>
  );
};

export default OTP_Verification;

const OTPFormRenderer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  h3 {
    padding-bottom: 10px;
    display: flex;
    align-self: flex-start;
    font-weight: 1000;
    margin: 0 10px;
  }
  form {
    max-width: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }

  .input-cont {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 8px;
  }
  .input-cont input {
    border: none;
    width: 50px;
    height: 60px;
    text-align: center;
    border-radius: 5px;
    background-color: #f0f0f0;
    font-size: 25px;
  }
  .input-cont input:focus {
    outline: 1.5px solid rgb(85, 85, 236);
    outline-offset: 1.6px;
  }

  .input-cont input::-webkit-inner-spin-button,
  .input-cont input::-webkit-outer-spin-button {
    display: none;
  }
  .input-cont-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .footer-in {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .active-btn {
    background-color: rgb(85, 85, 236);
    padding: 8px 16px;
    border: none;
    outline: none;
    border-radius: 14px;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
  }
  .active-btn:hover {
    transform: scale(1.01);
  }
  .input-cont-footer span {
    font-size: 12px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    cursor: pointer;
    color: rgb(85, 85, 236);
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
