import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import bannerImg from "../assets/images/investment.png";
import useGetToken from "../utils/getToken";
import { RoughNotation } from "react-rough-notation";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const reveal = keyframes`
  0% {
    transform: translateY(50%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const BannerWrapper = styled.div`
  padding: 10px 0;
  height: fit-content;
  display: flex;
  align-items: center;
  background: #fff;
  background-size: 200% 200%;
  overflow: hidden;
`;

const BannerContainer = styled.div`
  width: 90%;
  height: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 767px) {
    & {
      height: 370px;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`;

const BannerText = styled.div`
  flex: 1;
  position: relative;
  z-index: 10;
  margin-top:30px;
  .get-started-btn {
    padding: 10px 20px;
    background-color: rgb(85, 85, 263);
    border: none;
    color: #fff;
    margin-top: 10px;
  }
`;

const Title = styled.h1`
  color: rgb(32, 33, 36);
  font-size: 3rem;
  font-family: 'Zeitung', serif; 
  opacity: 0;
  animation: ${fadeIn} 0.3s ease-in-out 0.5s 1 normal both;
  @media (max-width: 767px) {
    font-size: 2.123rem;
  }
`;

const Description = styled.p`
  color: rgb(95, 99, 104);
  font-size: 20px;
  font-family: 'Source Sans Pro', sans-serif; 
  font-weight: 400;
  text-align: left;
  margin-bottom: 10px;
  opacity: 0;
  animation: ${reveal} 0.3s ease-in-out 0.6s 1 normal both;
  @media (max-width: 767px) {
    font-size: 1.123rem;
  }
`;
const BannerImage = styled.img`
  width: 80%;
  max-width: 600px;
  animation: ${fadeIn} 0.3s ease-in-out 0.5s 1 normal both;
  @media (max-width: 767px) {
    & {
      width: 90%;
      position: absolute;
      bottom: -60px;
      z-index: 1;
    }
  }
`;

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const token = Promise.resolve(useGetToken()).then((val) => val);

  return (
    <BannerWrapper id="banner">
      <BannerContainer>
        <BannerText>
          <Title>
            <RoughNotation
              show
              type="highlight"
              animationDelay={250}
              animationDuration={2000}
              color={"#567"}
            >
              Execute
            </RoughNotation>
            &nbsp; and &nbsp;
            <RoughNotation
              show
              type="highlight"
              animationDelay={250}
              animationDuration={2000}
              color={"#287dd2"}
            >
              Earn!
            </RoughNotation>
          </Title>
          <Description>
            Explore secure and lucrative investment opportunities tailored for
            long-term growth.
          </Description>
          {!token ||
            (typeof token !== "string" && (
              <button
                className="get-started-btn"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
            ))}
        </BannerText>

        <BannerImage src={bannerImg} loading="lazy" />
      </BannerContainer>
    </BannerWrapper>
  );
};

export default Banner;
