/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { IconChevronLeft } from "../assets/icons";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateBankInfo } from "../actions/user";
import toast from "react-hot-toast";
import { UPDATE_BANK_INFO_RESET } from "../constants";
import HLoader from "./loaders/HLoader";
import { useSnackbar } from "notistack";
import useGetToken from "../utils/getToken";
import { SupportedBanks } from "../misc/Banks";

interface AccountProps {
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
}
const AccountDetailsForm = ({
  bankDetails,
  onRemove,
}: {
  bankDetails?: AccountProps;
  onRemove: () => void;
}) => {
  const dispatch = useDispatch();
  const { loading, isUpdated, error } = useSelector(
    (state: any) => state.profile
  );
  const accessToken = useGetToken();
  const [accountDetails, setAccountDetails] = useState<AccountProps>({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  useEffect(() => {
    if (bankDetails) {
      setAccountDetails((prev) => ({
        ...prev,
        ...bankDetails,
      }));
    }
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  const handleAccountFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAccountDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch<any>(clearErrors());
    }
    if (isUpdated) {
      toast.success("Updated successfully!");
      dispatch({ type: UPDATE_BANK_INFO_RESET });
      onRemove();
    }
  }, [dispatch, enqueueSnackbar, error, isUpdated, onRemove]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !accountDetails.accountName ||
      !accountDetails.accountNumber ||
      !accountDetails.bankName
    ) {
      toast.error("Please provide your account details");
      return;
    }

    dispatch<any>(updateBankInfo(await accessToken, accountDetails));
  };
  return (
    <AccountDetailsFormRenderer>
      {loading && <HLoader />}
      <div className="account-details-form-hd">
        <span title="back" className="back" onClick={onRemove}>
          <IconChevronLeft />| back
        </span>
      </div>
      <form>
        <div className="input-cont">
          <label htmlFor="Bank name">
            Bank Name<span className="required">*</span>
          </label>
          <input
            list="supported-banks"
            type="text"
            autoFocus
            value={accountDetails.bankName}
            onChange={handleAccountFormChange}
            required
            name="bankName"
          />
          <datalist id="supported-banks">
            {SupportedBanks.sort().map((banks, i) => (
              <option value={banks.name} key={i}>
                {banks.name}
              </option>
            ))}
          </datalist>
        </div>
        <div className="input-cont">
          <label htmlFor="Bank name">
            Account Name<span className="required">*</span>
          </label>
          <input
            type="text"
            autoFocus
            value={accountDetails.accountName}
            onChange={handleAccountFormChange}
            required
            name="accountName"
          />
        </div>
        <div className="input-cont">
          <label htmlFor="Bank name">
            Account Number<span className="required">*</span>
          </label>
          <input
            type="text"
            autoFocus
            value={accountDetails.accountNumber}
            onChange={handleAccountFormChange}
            required
            name="accountNumber"
          />
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </form>
    </AccountDetailsFormRenderer>
  );
};

export default AccountDetailsForm;

const AccountDetailsFormRenderer = styled.div`
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

  .account-details-form-hd {
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
    margin-top: 20px;
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
    width: 300px;
    padding: 10px;
    background-color: #ededed;
    border: none;
    height: 40px;
    outline: none;
    border-radius: 16px;
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
`;
