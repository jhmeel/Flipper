import React, { useState } from "react";
import styled from "styled-components";
import { IconInfoCircleFill } from "../assets/icons";
import PaymentModal from "./PaymentModal";
import NotificationItem from "./NotificationItem";
import { Package } from "../types";
import Config from "../config/Config";

const Packages = () => {
  const [purchasedPackage, setPurchasedPackage] = useState<{
    packageName?: string;
    packagePrice?: number | string;
    packageId?: string;
  }>({
    packageName: "",
    packageId: "",
    packagePrice: 0,
  });
  const [isNotificationModalActive, setNotificationModalActive] =
    useState<boolean>(false);
  const [activePackage, setActivePackage] = useState<Package | null>(null);

  const onNotificationModalRemove = () => {
    setNotificationModalActive(false);
  };
  const [isPaymentModalActive, setIsPaymentModalActive] =
    useState<boolean>(false);

  const handlePurchase = (
    pname?: string,
    pp?: number | string,
    pid?: string
  ) => {
    setPurchasedPackage((prev) => ({
      ...prev,
      packageName: pname,
      packagPrice: pp,
      packageId: pid,
    }));

    setIsPaymentModalActive(true);
  };

  const oncloseHandler = () => {
    setIsPaymentModalActive(false);
  };
  const packages: Array<Package> = Config.PACKAGES;

  return (
    <PackageRenderer>
      <div className="package">
        <div className="pkg-header">
          <span className="pid1">{packages[0].id}</span>
          <span
            title="info"
            onClick={() => {
              setNotificationModalActive(true);
              setActivePackage((prev) => ({
                ...prev,
                price: packages[0].price,
                id: packages[0].id,
                name: packages[0].name,
                ROC: packages[0].ROC,
                LROI: packages[0].LROI,
              }));
            }}
          >
            <IconInfoCircleFill />
          </span>
        </div>
        <span className="pname">{packages[0].name}</span>
        <span className="pp">{`₦${packages[0].price}`}</span>
        <button
          className="p-btn"
          onClick={() =>
            handlePurchase(packages[0].name, packages[0].price, packages[0].id)
          }
        >
          Activate
        </button>
      </div>

      <div className="package">
        <div className="pkg-header">
          <span className="pid2">{packages[1].id}</span>
          <span
            title="info"
            onClick={() => {
              setNotificationModalActive(true);
              setActivePackage((prev) => ({
                ...prev,
                price: packages[1].price,
                id: packages[1].id,
                name: packages[1].name,
                ROC: packages[1].ROC,
                LROI: packages[1].LROI,
              }));
            }}
          >
            <IconInfoCircleFill />
          </span>
        </div>
        <span className="pname">{packages[1].name}</span>
        <span className="pp">{`₦${packages[1].price}`}</span>
        <button
          className="p-btn"
          onClick={() =>
            handlePurchase(packages[1].name, packages[1].price, packages[1].id)
          }
        >
          Activate
        </button>
      </div>

      <div className="package">
        <div className="pkg-header">
          <span className="pid3">{packages[2].id}</span>
          <span
            title="info"
            onClick={() => {
              setNotificationModalActive(true);
              setActivePackage((prev) => ({
                ...prev,
                price: packages[2].price,
                id: packages[2].id,
                name: packages[2].name,
                ROC: packages[2].ROC,
                LROI: packages[2].LROI,
              }));
            }}
          >
            <IconInfoCircleFill />
          </span>
        </div>
        <span className="pname">{packages[2].name}</span>
        <span className="pp">{`₦${packages[2].price}`}</span>
        <button
          className="p-btn"
          onClick={() =>
            handlePurchase(packages[2].name, packages[2].price, packages[2].id)
          }
        >
          Activate
        </button>
      </div>
      {isPaymentModalActive && (
        <PaymentModal
          packageId={purchasedPackage.packageId}
          packageName={purchasedPackage.packageName}
          packagePrice={purchasedPackage.packagePrice}
          oncloseHandler={oncloseHandler}
        />
      )}
      {isNotificationModalActive && activePackage && (
        <NotificationItem
          type="typical"
          title={activePackage.name}
          description={`
                        Package <b>${activePackage.name}</b> with ID <b>${activePackage.id}</b> is valued at <b>₦${activePackage.price}</b>.
                        It offers a Return on Completion [ROC] of <b>${activePackage.ROC}%</b>  and a Total Lifetime Return on Investment [LROI] of <b>₦${activePackage.LROI}</b>.
                        <br/>--------------------------------------------------<br/><b>🔊Note that this package will only be active for the duration of 1 month and will require a renewal to begin another investment session<b/>.
                    `}
          btnText="Purchase"
          onPress={() => {
            setNotificationModalActive(false);
            handlePurchase(activePackage.name, activePackage.price);
          }}
          onRemove={onNotificationModalRemove}
        />
      )}
    </PackageRenderer>
  );
};

export default Packages;
const PackageRenderer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
  padding: 10px;
  gap: 6px;

  .pkg-header {
    width: 100%;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 5px;
  }
  .pid1,
  .pid2,
  .pid3 {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: teal;
    color: #fff;
  }
  .pid1 {
    background-color: #c7a540;
  }
  .pid2 {
    background-color: #456;
  }
  .pid3 {
    background-color: #b8b8b8;
  }
  .package {
    display: flex;
    max-width: 300px;
    width: 180px;
    height: 220px;
    border: 1px solid #ededed;
    border-radius: 8px;
    flex-direction: column;
    padding: 5px 10px;
    align-items: center;
    justify-content: space-evenly;
    transition: 0.3s ease-in-out;
    position: relative;
  }
  .package span {
    cursor: pointer;
  }
  .package:hover {
    transform: scale(1.02);
  }
  .pp {
    font-size: 18px;
    font-weight: 700;
  }
  .pname {
    background-color: crimson;
    padding: 3px 6px;
    color: #fff;
    font-weight: 600;
    margin-top: 10px;
  }
  .p-btn {
    padding: 5px 10px;
    border: none;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background-color: rgb(85, 85, 236);
    color: #fff;
    cursor: pointer;
    position: absolute;
    bottom: 0;
  }

  @media (max-width: 767px) {
    & {
      width: 100%;
    }
    .package {
      display: flex;
      max-width: 350px;
      height: 200px;
    }
  }
  .pname {
    font-size: 13px;
  }
  .pid1,
  .pid2,
  .pid3 {
    height: 25px;
    width: 25px;
    font-size: 8px;
  }
`;
