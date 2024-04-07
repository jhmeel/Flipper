import React from "react";
import styled from "styled-components";
import { FaSignInAlt, FaMoneyCheckAlt, FaMoneyBillWave } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      image: FaSignInAlt,
      guide: "Create an Account",
      description: "By clicking get started",
    },
    {
      image: FaMoneyCheckAlt,
      guide: "Activate a package",
      description: "Choose a package that meet your investment goals",
    },
    {
      image: FaMoneyBillWave,
      guide: "Execute tasks and earn",
    },
  ];
  return (
    <HItWorksRenderer>
      <div className="stepItem">
        <span className="stepId">{1}</span>

        <span className="stp-icon-cont">
          <FaSignInAlt className="stp-icon" fill="#3c6466" />
        </span>
        <div className="stp-meta">
          <span className="stp-guide">{steps[0].guide}</span>
          <span className="stp-des">{steps[0].description}</span>
        </div>
      </div>

      <div className="stepItem">
        <span className="stepId">{2}</span>

        <span className="stp-icon-cont">
          <FaMoneyCheckAlt className="stp-icon" fill="#1e9f65"/>
        </span>
        <div className="stp-meta">
          <span className="stp-guide">{steps[1].guide}</span>
          <span className="stp-des">{steps[1].description}</span>
        </div>
      </div>

      <div className="stepItem">
        <span className="stepId">{3}</span>
        <span className="stp-icon-cont">
          <FaMoneyBillWave className="stp-icon" fill="#0ca394"/>
        </span>
        <div className="stp-met-last">
          {" "}
          <span className="stp-guide">{steps[2].guide}</span>
          <span className="stp-des">{steps[2].description}</span>
        </div>
      </div>
    </HItWorksRenderer>
  );
};

export default HowItWorks;

const HItWorksRenderer = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 10px;

  .stepId {
    width: 30px;
    height: 30px;
    padding: 10px;
    display: flex;
    align-items: center;
    border-radius: 50%;
    font-weight: 700;
    color: #07527d;
    background-color: #ffffff;
    border: 1px solid #ededed;
  }
  .stepItem {
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;

    .stp-img {
    }
    .stp-guide {
      font-family: serif;
      font-weight: 600;
      line-height: 1.6rem;
    }
    .stp-des {
      color: grey;
      font-size: 12px;
    }
    .stp-icon {
      font-size: 40px;
    }
  }
  .stp-icon-cont {
    height: 70px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid rgb(85, 85, 263);
    border-style:dashed;
    cursor: pointer;
  }
  .stp-meta {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding-right:60px;
    border-right:1px solid #ededed;
  }
.stp-met-last{
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 767px) {
    & {
      flex-direction: column;
    }
    .stepItem {
      position: relative;
      min-height: 150px;
      max-height: 150px;
      width: 90%;
      margin: 10px 0;
      border-left: 1px solid #ededed;
    }
    .stp-meta {
        border-right:none;
        padding-right:0;
    }
    .stepId {
      position: absolute;
      left: -3%;
      margin-bottom: 35%;
    }
  }
  
`;
