/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled, { keyframes } from "styled-components";
import sourceImg from "../assets/images/sources.jpg";
const RevenueSourceChart = () => {
  const sources = [
    {
      name: "Stock Market",
      amount: "$10,000",
      percentage: "50%",
      bg: "#ba5e09",
    },
    {
      name: "Ads",
      amount: "$8,000",
      percentage: "30%",
      bg: "#6990b0",
    },
    {
      name: "Affiliate Marketing",
      amount: "$3,500",
      percentage: "20%",
      bg: "#4c4d89",
    },
  ];

  return (
    <RevenueSourceContainer>
      <div className="rev-main">
        {sources.map((source, index) => (
          <RevenueItem key={index}>
            <RevenueItemHeader>
              <RevenueItemTitle>{source.name}</RevenueItemTitle>
              <RevenueItemPercentage>{source.percentage}</RevenueItemPercentage>
            </RevenueItemHeader>
            <ProgressBarContainer>
              <div
                className="src-progress"
                style={{
                  background: source.bg,
                  width: source.percentage,
                  animationDuration: `${index * 0.5 + 5}s`,
                }}
              ></div>
            </ProgressBarContainer>
            <RevenueItemAmount>{source.amount}</RevenueItemAmount>
          </RevenueItem>
        ))}
      </div>
      <img src={sourceImg} />
    </RevenueSourceContainer>
  );
};

export default RevenueSourceChart;

const RevenueSourceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  width: 100%;
 
  .rev-main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
  }
  img {
    width: 40%;
  }
  @media (max-width: 767px) {
    flex-direction:column-reverse;
    .rev-main {
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
  }
  img {
    width: 90%;
  }

    }
`;

const RevenueItem = styled.div`
  display: flex;
  max-width: 600px;
  width: inherit;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 5px 10px;
  border: 1px solid #ededed;
  &:hover {
    transition: 200ms ease-in-out;
    transform: scale(1.01);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    width: 90%;
  }
`;

const RevenueItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const RevenueItemTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const RevenueItemPercentage = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const RevenueItemAmount = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: #4a4a4a;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const progressBarAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: ${(props: any) => props?.width};
  }
`;

const ProgressBarContainer = styled.div`
  position: relative;
  height: 10px;
  width: 100%;
  background-color: #c7d9e5;
  border-radius: 5px;
  overflow: hidden;

  .src-progress {
    position: absolute;
    height: 100%;
    background-color: rgb(85, 85, 263);
    animation: ${progressBarAnimation} forwards;
    animation-timing-function: ease-in-out;
  }
`;
