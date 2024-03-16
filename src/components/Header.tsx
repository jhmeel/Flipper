import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import emptyAvatar from "../assets/images/empty_avatar.png";
import { IconSettings2 } from "../assets/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = (): React.ReactElement => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { user, isAuthenticated } = useSelector((state: any) => state.user);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const navigate = useNavigate();
  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setModalActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  console.log(user?.avatar)
  return (
    <HeaderRenderer ref={modalRef}>
      <div className="logo-cont">flipper</div>
      <div className="user-mod" onClick={toggleModal}>
        <div className="user-avatar">
          <img src={user?.avatar || emptyAvatar} />
        </div>
        <div className="user-details">
          {isAuthenticated && !isMobile ? (
            <>
              <span className="username">{user?.username}</span>
              <span className="user-email">{user?.email}</span>
            </>
          ) : (
            !isAuthenticated &&
            !isMobile && (
              <div className="btns-cont">
                <button onClick={() => navigate("/signup")}>Signup</button>
                <button onClick={() => navigate("/login")}>Login</button>
              </div>
            )
          )}
        </div>
        {modalActive && isMobile && (
          <div className="modal-user-details">
            {isAuthenticated ? (
              <>
                <span className="modal-avatar">
                  <img src={user?.avatar || emptyAvatar} />
                </span>
                <span className="modal-username">{user?.username}</span>
                <span className="modal-email">{user?.email}</span>
              </>
            ) : (
              <div className="btns-cont">
                <button onClick={() => navigate("/signup")}>Signup</button>
                <button onClick={() => navigate("/login")}>Login</button>
              </div>
            )}
          </div>
        )}

        {isMobile && (
          <span>
            <IconSettings2 className="h-icon chevdown-icon" />
          </span>
        )}
      </div>
    </HeaderRenderer>
  );
};

export default Header;

const HeaderRenderer = styled.div`
  width: 100%;
  height: 70px;
  position: sticky;
  display: flex;
  z-index: 999;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  -o-backdrop-filter: blur(10px);
  transform: 0.5s;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  .user-mod {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    padding: 5px 10px;
    border: 1px solid #ededed;
    gap: 5px;
    background-color: #fff;
    position: relative;
  }

  .user-avatar {
    height: 28px;
    width: 28px;
    border: 1px solid #ededed;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
  }
  .user-avatar img {
    position: absolute;
    height: 28px;
    width: 28px;
    border-radius: 50%;
  }

  .user-details {
    display: flex;
    flex-direction: column;
  }
  .user-details span {
    font-size: 12px;
    line-height: 18px;
  }
  .user-email {
    color: #8b8e98;
  }
  .h-icon {
    height: 18px;
    width: 18px;
    cursor: pointer;
  }
  .chevdown-icon {
    height: 16px;
    width: 16px;
  }

  .modal-user-details {
    position: absolute;
    padding: 10px 20px;
    background-color: #ffffff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid #ededed;
    top: 45px;
    right: 5px;
    cursor: pointer;
  }
  .modal-username {
    font-size: 13px;
  }
  .modal-email {
    font-size: 10px;
    color: grey;
  }

  .modal-avatar img {
    width: 30px;
    border-radius: 50%;
    height: 30px;
    cursor: pointer;
  }
  .btns-cont {
    display: flex;
  }
  .btns-cont button {
    padding: 6px 12px;
    margin-left: 5px;
    border: none;
    color: #fff;
    background-color: rgb(85, 85, 236);
    cursor: pointer;
    font-size: 12px;
    transition: 0.3s ease-in-out;
  }
  .btns-cont button:hover {
    transform: scale(1.01);
  }
  @media (max-width: 767px) {
  }
`;
