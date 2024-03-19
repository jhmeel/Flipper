import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { IconChevronLeft, IconInfoCircleFill } from "../assets/icons";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, onWithdrawFunds } from "../actions/user";
import { WITHDRAW_FUNDS_RESET } from "../constants";
import HLoader from "./loaders/HLoader";
import getToken from "../utils/getToken";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

interface WithdrawalProps {
  amount?: number;
}
const WithdrawalModal = ({ onRemove }: { onRemove: () => void }) => {
  const [withdrawalDetails, setWithdrawalDetails] = useState<WithdrawalProps>({
    amount: undefined,
  });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, message, error } = useSelector((state: any) => state.wallet);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch<any>(clearErrors());
    }

    if (message) {
      toast.success(message);
      dispatch({ type: WITHDRAW_FUNDS_RESET });
      onRemove();
    }
  }, [dispatch, enqueueSnackbar, error, message, onRemove]);
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setWithdrawalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!withdrawalDetails.amount) {
      enqueueSnackbar("Please provide the amount to withdraw", {
        variant: "error",
      });

      return;
    } else if (withdrawalDetails.amount < 5_000) {
      enqueueSnackbar("Minimum withdrawable amount is ₦5000", {
        variant: "error",
      });

      return;
    }
    const authToken = await getToken();
    dispatch<any>(onWithdrawFunds(authToken, withdrawalDetails.amount));
  };
  return (
    <WithdrawalModalRenderer>
      {loading && <HLoader />}

      <div className="info">
        <span>
          <IconInfoCircleFill fill="#125b8c" />
        </span>

        <p>Note that your minimum withdrawable amount is ₦5,000.</p>
      </div>

      <div className="withdrawal-details-form-hd">
        <span title="back" className="back" onClick={onRemove}>
          <IconChevronLeft />| back
        </span>
      </div>
      <form>
        <div className="input-cont">
          <label htmlFor="amount">
            Amount<span className="required">*</span>
          </label>
          <input
            type="text"
            value={withdrawalDetails.amount}
            autoFocus
            onChange={handleFormChange}
            required
            name="amount"
          />
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </form>
    </WithdrawalModalRenderer>
  );
};

export default WithdrawalModal;

const WithdrawalModalRenderer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  -moz-backdrop-filter: blur(3px);
  -o-backdrop-filter: blur(3px);
  padding-top: 30px;

  .withdrawal-details-form-hd {
    max-width: 600px;
    display: flex;
    justify-content: flex-end;
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
    outline: none;
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
