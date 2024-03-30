import React from "react";
import styled, { keyframes } from "styled-components";
import bannerImg from "../assets/images/investment_data.svg";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const BannerWrapper = styled.div`
  padding: 10px 0;
  height: 300px;
  display: flex;
  animation: ${gradientAnimation} 5s infinite;
  background: linear-gradient(45deg, #3498db, #9b59b6, #2ecc71);
  background-size: 200% 200%;
  overflow: hidden;
`;

const BannerContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 767px) {
    & {
      flex-direction: column;
      justify-content: space-between;
    }
  }
`;

const BannerText = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;

  color: #ffffff;
  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.02em;
  line-height: 1.5;
  color: #b9b7b7;
  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const BannerImage = styled.img`
  width: 50%;
  max-width: 400px;
  @media (max-width: 767px) {
    & {
      position: absolute;
      top: 43%;
    }
  }
`;

const Banner: React.FC = () => {
  return (
    <BannerWrapper id='banner'>
      <BannerContainer>
        <BannerText>
          <Title>
            Welcome to flipper, where financial success meets innovation
          </Title>
          <Description>
            Explore secure and lucrative investment opportunities tailored for
            long-term growth. Join us on the journey to financial freedom!
          </Description>
        </BannerText>
        <BannerImage src={bannerImg} loading="lazy" />
      </BannerContainer>
    </BannerWrapper>
  );
};

export default Banner;
