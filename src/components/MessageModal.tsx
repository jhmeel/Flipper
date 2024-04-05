import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import telgImg from "../assets/images/telegram.png";

const MessageModal = () => {
  const [currentMsg, setCurrentMsg] = useState(0);

  const messages = [
    {
      title: "Join Our Telegram Community!!",
      paragraph: `Get Involved in the community on Telegram!`,
      image: telgImg,
      btn: "Join",
      link: "https://t.me/+vqcGKoD_j643ZjI0",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMsg((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <>
      <MessageModalRenderer id={"MessageModal"}>
        <div className="msg-card">
          <div className="m-content">
            <p className="m-heading">{messages[currentMsg].title}</p>
            <p className="m-para">{messages[currentMsg].paragraph}</p>
            {messages[currentMsg].link && (
              <Link to={messages[currentMsg].link}>
                <button className="m-btn" title={messages[currentMsg].btn}>
                  {messages[currentMsg].btn}
                </button>
              </Link>
            )}
            {messages[currentMsg].image && (
              <img
                className="m-card-avt"
                src={messages[currentMsg].image}
                alt="image"
              />
            )}
          </div>
        </div>
      </MessageModalRenderer>
    </>
  );
};

export default MessageModal;

const MessageModalRenderer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 60%;
  height: 300px;
  flex-direction: column;
  border: 1px solid #ededed;
  padding: 15px 20px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  margin-right: 8px;
  position: relative;
  border-radius: 4px;
  background-color: #f1f7fe;
  .m-content {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 40px;
    gap: 10px;
    color: gray;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .m-card-avt {
    position: absolute;
    max-width: 350px;
    height: auto;
    right: 30px;
    bottom: 0;
  }
  .m-heading {
    font-weight: bold;
    font-size: 24px;
    text-align: center;
  }

  .m-para {
    font-size: 16px;
    color: gray;
    width: 70%;
  }

  .m-btn {
    color: #e8e8e8;
    text-decoration: none;
    padding: 10px 20px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    background: #368eef;
    transition: 0.3s ease-in-out;
  }
  .m-btn:hover {
    transform: scale(1.01);
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(-45deg, #5f5fac 0%, #5555ec 100%);
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &:hover .btn {
    color: #212121;
    background: #e8e8e8;
  }

  .btn:hover {
    outline: 2px solid #e8e8e8;
    background: transparent;
    color: #e8e8e8;
  }

  .btn:active {
    box-shadow: none;
  }

  @media (max-width: 767px) {
    & {
      width: 80%;
      max-height: 500px;
      min-height: 500px;
      justify-content: flex-start;
      align-items: center;
    }
    .m-content .m-heading {
      font-size: 22px;
      margin-top: 5px;
    }
    .m-content .m-para {
      font-size: 14px;
      width: 100%;
    }
    .m-card-avt {
      right: 18px;
    }
  }
`;
