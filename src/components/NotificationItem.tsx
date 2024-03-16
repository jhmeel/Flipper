import React from "react";
import styled from "styled-components";
import {
  IconInfoCircleFill,
  IconRemoveFill,
  IconSpeaker,
} from "../assets/icons";
interface NotificationProps {
  icon?: React.ReactElement;
  title?: string;
  description?: string;
  imageUrl?: string;
  href?: string;
  btnText?: string;
  onPress?: () => void;
  type?: "social" | "typical";
  onRemove?: () => void;
}
const NotificationItem = (props: NotificationProps): React.ReactElement => {
  const {
    icon,
    imageUrl,
    title,
    description,
    href,
    btnText,
    type,
    onRemove,
    onPress,
  } = props;

  const handleHref = () => {
    window.open(href, "_blank");
  };
  return (
    <NotificationRenderer>
      <div className="notification-main">
        <div className="notification-header">
          <span className="hd-icon">
            {" "}
            {type == "social" && !icon ? (
              <IconSpeaker width={25} height={25} fill="blue" />
            ) : type == "typical" && !icon ? (
              <IconInfoCircleFill width={25} height={25} fill="blue" />
            ) : (
              icon
            )}
          </span>
          <span title="remove" onClick={onRemove}>
            <IconRemoveFill className="rmv-icon" />
          </span>
        </div>
        {imageUrl && (
          <div className="img-cont">
            <img src={imageUrl} loading="lazy" />
          </div>
        )}
        <h2>{title}</h2>
        <div className="notification-desc">
          {type === "typical" ? (
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          ) : (
            <p>{description}</p>
          )}
        </div>

        <button onClick={href ? handleHref : onPress}>{btnText}</button>
      </div>
    </NotificationRenderer>
  );
};

export default NotificationItem;

const NotificationRenderer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  -moz-backdrop-filter: blur(3px);
  -o-backdrop-filter: blur(3px);

  .notification-main {
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 8px;
    max-width: 400px;
    max-height: 550px;
    width: 320px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
  }

  .img-cont {
    position: relative;
    min-height: 65px;
    max-height: 65px;
    width: 65px;
    border-radius: 6px;
    border: 2px solid #ededed;
  }
  .img-cont img {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
  .rmv-icon {
    height: 18px;
    width: 18px;
    cursor: pointer;
  }
  .notification-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
  }
  .hd-icon {
    height: 45px;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ededed;
    border-radius: 50%;
  }
  .notification-desc {
    font-size: 14px;
    overflow-y: scroll;
    text-align: center;
  }
  .notification-desc p{
    line-height:1.6rem;
    text-align:justify;
font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .notification-desc::-webkit-scrollbar {
    display: none;
  }

  button {
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 12px;
    padding: 10px 20px;
    border-radius: 8px;
    color: #fff;
    background-color: rgb(85, 85, 236);
    border: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  button:hover {
    transform: scale(1.01);
  }
`;
