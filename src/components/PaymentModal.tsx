import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";
import { IconChevronLeft, SuccessIcon } from "../assets/icons";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import getToken from "../utils/getToken";
import { activatePackage, clearErrors } from "../actions/user";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HLoader from "./loaders/HLoader";
import Config from "../config/Config";
import { useSnackbar } from "notistack";

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
  const [price, setPrice] = useState<number | string | undefined>(packagePrice);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isActivated, error } = useSelector(
    (state: any) => state.package
   
  );
  const { user, error: userErr } = useSelector((state: any) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const componentProps = {
    email,
    amount: Number(price) * 100,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: `Purchase "${packageName}"`,
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
    setPhone(user?.phone);
    setName(user?.username);
  }, [navigate, user, user?.email, user?.phone, user?.username, userErr]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch<any>(clearErrors());
    }
    if (isActivated) {
      toast("Your package has been activated successfully!", {
        icon: <SuccessIcon />,
      });
    }
  }, [dispatch, error, isActivated]);

  const onPackagePurchase = async () => {
    const authToken = await getToken();
    dispatch<any>(activatePackage(authToken, packageId));
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
`;
