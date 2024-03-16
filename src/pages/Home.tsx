import React from "react";
import Header from "../components/Header";
import MetaData from "../misc/MetaData";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import styled from "styled-components";
import Testimonials from "../components/Testimonials";
import RevenueSourceChart from "../components/RevenueSourceChart";
import {
  IconArrowTrendUp,
  IconCubeOutline,
  IconPeople16,
} from "../assets/icons";
import Packages from "../components/Packages";
import MessageModal from "../components/MessageModal";

const Home = (): React.ReactElement => {
  return (
    <>

      <MetaData title="Home" />
      <HomeRenderer>
        <Header />
        <Banner />
        <div className="avail-pkg">
          <div className="s-header">
            <h3>
              <IconCubeOutline /> Available Packages
            </h3>
            </div>
            <Packages /> 
          
        </div>
        <div className="revenue-source">
          <div className="s-header">
            <h3>
              <IconArrowTrendUp /> Revenue Source
            </h3>
          </div>

          <RevenueSourceChart />
        </div>
        <div className="msg-modal">
          <MessageModal />
        </div>

        <div className="testimonial-cont">
          <div className="s-header">
            <h3>
              <IconPeople16 /> Testimonials
            </h3>
          </div>
          <Testimonials />
        </div>
      </HomeRenderer>
      <Footer />
    </>
  );
};

export default Home;

const HomeRenderer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .testimonial-cont {
    padding: 5px 10px;
  }
  .s-header {
    width: 100%;
    padding: 5px 10px;
    display: flex;
    align-items: center;
  }
  .s-header h3{
    font-size:18px;
  }
  .avail-pkg {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ededed;
  }
  .revenue-source {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ededed;
  }
  .msg-modal{
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;
