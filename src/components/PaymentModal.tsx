/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";
import { IconChevronLeft } from "../assets/icons";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { activatePackage, clearErrors } from "../actions/user";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HLoader from "./loaders/HLoader";
import Config from "../config/Config";
import { useSnackbar } from "notistack";
import useGetToken from "../utils/getToken";
import { ACTIVATE_PACKAGE_RESET } from "../constants";

const PaymentModal = ({
  packageId,
  packageName,
  packagePrice,
  oncloseHandler,
}: {
  packageId?: string;
  packageName?: string;
  packagePrice?: number | string;
  oncloseHandler: () => void;
}): React.ReactElement => {
  const publicKey: string = Config.PAYSTACK_SECRETE_KEY;
  const [email, setEmail] = useState<string>("");
  const accessToken = useGetToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isActivated, error } = useSelector(
    (state: any) => state.package
  );
  const { user, error: userErr } = useSelector((state: any) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const componentProps = {
    className: "purchase-btn",
    email,
    amount: Number(packagePrice) * 100,
    publicKey,
    text: `Purchase ${packageName}`,
    onSuccess: () => {
      onPackagePurchase();
    },
    onClose: oncloseHandler,
  };

  useEffect(() => {
    if (!user?.username) {
      navigate("/login");
    }
    setEmail(user?.email);
  }, [navigate, user, user?.email, userErr]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch<any>(clearErrors());
    }
    if (isActivated) {
      toast.success("Your package has been activated successfully!");

      dispatch<any>({ type: ACTIVATE_PACKAGE_RESET });
      navigate("/task");
    }
  }, [dispatch, enqueueSnackbar, error, isActivated]);

  const onPackagePurchase = async () => {
    dispatch<any>(activatePackage(await accessToken, packageId));
  };

  return (
    <PaymentModalRenderer>
      {loading && <HLoader />}
      <span title="back" className="back" onClick={oncloseHandler}>
        <IconChevronLeft />| back
      </span>
      <PaystackButton {...componentProps} />
    </PaymentModalRenderer>
  );
};

export default PaymentModal;

const PaymentModalRenderer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  -moz-backdrop-filter: blur(8px);
  -o-backdrop-filter: blur(8px);

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

  .purchase-btn {
    padding: 10px 20px;
    border-radius: 6px;
    background-color: rgb(85, 85, 236);
    color: #fff;
    border: none;
    cursor: pointer;
  }
`;
