import React from "react";
import Header from "../components/Header";
import MetaData from "../misc/MetaData";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import styled, { keyframes } from "styled-components";
import Testimonials from "../components/Testimonials";
import RevenueSourceChart from "../components/RevenueSourceChart";
import Packages from "../components/Packages";
import MessageModal from "../components/MessageModal";
import Faq from "../components/faq/Faq";
import HowItWorks from "../components/HowItWorks/HowItWorks";

const Home = (): React.ReactElement => {
  return (
    <>
      <MetaData title="Home" />
      <HomeRenderer>
        <Header />
        <Banner />
        <section className="main">
          <div className="avail-pkg">
            <div className="s-header">
              <h3>Available Packages</h3>
            </div>
            <Packages />
          </div>

          <div className="h-it-w">
            <div className="s-header">
              <h3> How It Works</h3>
            </div>
            <HowItWorks />
          </div>
          <div className="revenue-source">
            <div className="s-header">
              <h3>Revenue Sources</h3>
            </div>

            <RevenueSourceChart />
          </div>
          <div className="msg-modal">
            <MessageModal />
          </div>
          <div className="faq">
            <div className="s-header">
              <h3>Frequently Asked Questions</h3>
            </div>
            <Faq />
          </div>

          <div className="testimonial-cont">
            <div className="s-header">
              <h3>Testimonials</h3>
            </div>
            <Testimonials />
          </div>
        </section>
      </HomeRenderer>
      <Footer />
    </>
  );
};

export default Home;

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
const HomeRenderer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .main {
    animation: ${gradientAnimation} 5s infinite;
    background: linear-gradient(45deg, #ccd5dc, #ffffff, #a9c7b6);
    background-size: 200% 200%;
    position: relative;
  }

  .testimonial-cont {
    padding: 5px 10px;
  }
  .s-header {
    width: 100%;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Zeitung", serif;
  }
  .s-header h3 {
    display: flex;
    align-items: center;
    gap: 15px;
    color: rgb(32, 33, 36);
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .avail-pkg {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .revenue-source {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ededed;
    background-color:#fff;
  }
  .h-it-w {
    border-bottom: 1px solid #ededed;
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
    background-color: #fefefe;
  }
  .msg-modal {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
    align-items: center;
  }
  @media (max-width: 767px) {
    .s-header h3 {
      font-size: 18px;
    }
  }
`;
