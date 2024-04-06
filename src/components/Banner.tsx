import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bannerImg from "../assets/images/investment.png";
import useGetToken from "../utils/getToken";
import { RoughNotation } from "react-rough-notation";

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
  .get-started-btn {
    padding: 10px 20px;
    background-color: #3498db;
    border: none;
    color: #fff;
    margin-top: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.2rem;
  width:80%;
  margin-bottom: 10px;
  color: #000000;
  @media (max-width: 767px) {
    font-size: 1.67rem;
  }
`;

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
  line-height: 1.5;
  color: #625c5c;
  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const BannerImage = styled.img`
  width: 50%;
  max-width: 400px;
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
  const token = useGetToken();

  return (
    <BannerWrapper id="banner">
      <BannerContainer>
        <BannerText>
          <Title>
            Welcome to flipper, where you &nbsp;
            <RoughNotation
              show
              type="highlight"
              animationDelay={250}
              animationDuration={2000}
              color={"#567"}
            >
              Execute
            </RoughNotation>
            &nbsp;
            and &nbsp;
            <RoughNotation
              show
              type="highlight"
              animationDelay={250}
              animationDuration={2000}
              color={"#287dd2"}
            >
              Earn
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
