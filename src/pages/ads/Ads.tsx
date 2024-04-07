import React from "react";
import MetaData from "../../misc/MetaData";
import styled from "styled-components";
import Footer from "../../components/Footer";
import { Ads as TAds } from "../../types";
import { FaArrowRight } from "react-icons/fa";

const AdsCardWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ededed;
  padding: 10px;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }
  .ads-date {
    color: grey;
    font-size: 12px;
  }
`;

const AdsImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

const Brand = styled.p`
  color: #4d4d4d;
  font-size: 0.8rem;
  font-weight: 700;
`;

const Content = styled.p`
  color: gray;
  font-size: 1rem;
  line-height: 1.6;
`;

const ReadMoreLink = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  color: #007bff;
  text-decoration: none;
  margin-top: 10px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
const AdsCard: React.FC<{ ads: TAds }> = ({ ads }) => {
  const { title, brand, content, image, url, createdAt } = ads;

  return (
    <AdsCardWrapper>
      <MetaData title={title} />
      <AdsImage src={image} alt={title} />
      <Title>{title}</Title>
      <span className="ads-date">{createdAt}</span>
      <Brand>{brand}</Brand>
      <Content>{content.substring(0, 150)}...</Content>
      <ReadMoreLink onClick={() => window.open(url, "_blank")}>
        View
        <FaArrowRight fill="#007bff" />
      </ReadMoreLink>
    </AdsCardWrapper>
  );
};

const AdsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 10px;
`;

const Ads: React.FC = () => {
  return (
    <>
      <MetaData title="Ads" />
      <AdsContainer>
        <h2>Ads</h2>
        {pubAds.map((ad, index) => (
          <AdsCard key={index} ads={ad} />
        ))}
      </AdsContainer>
      <Footer />
    </>
  );
};

export default Ads;

const pubAds: TAds[] = [
  {
    title: "The Importance of React in Modern Web Development",
    brand: "John Doe",
    content:
      "React has become a fundamental tool for building interactive and dynamic user interfaces...",
    image: "https://via.placeholder.com/800x400",
    url: "www.reactjs.com",
    createdAt: new Date().toDateString(),
  },
];
