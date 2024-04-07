import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IconCubeOutline, IconProfile } from "../assets/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBlog } from "react-icons/fa";
interface StyledLabelProps {
  isSelected: boolean;
}

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedTab, setSelectedTab] = useState<string>("home");

  const handleLabelClick = (tab: string) => {
    if (["/", ""].includes(tab)) tab = "home";
    setSelectedTab(tab);
  };
  useEffect(() => {
    if (selectedTab === "home") {
      navigate("/");
      return;
    }
    navigate(`/${selectedTab}`);
  }, [selectedTab]);

  useEffect(() => {
    handleLabelClick(pathname.replace(/^\/+/, ""));
  }, []);
  return (
    <StyledSection>
      <StyledLabel
        title="home"
        htmlFor="home"
        onClick={() => handleLabelClick("home")}
        isSelected={selectedTab === "home"}
      >
        <input
          id="home"
          name="page"
          type="radio"
          checked={selectedTab === "home"}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 21 20"
          height="20"
          width="21"
          className="navIcon"
        >
          <path
            fill="inherit"
            d="M18.9999 6.01002L12.4499 0.770018C11.1699 -0.249982 9.16988 -0.259982 7.89988 0.760018L1.34988 6.01002C0.409885 6.76002 -0.160115 8.26002 0.0398848 9.44002L1.29988 16.98C1.58988 18.67 3.15988 20 4.86988 20H15.4699C17.1599 20 18.7599 18.64 19.0499 16.97L20.3099 9.43002C20.4899 8.26002 19.9199 6.76002 18.9999 6.01002ZM10.9199 16C10.9199 16.41 10.5799 16.75 10.1699 16.75C9.75988 16.75 9.41988 16.41 9.41988 16V13C9.41988 12.59 9.75988 12.25 10.1699 12.25C10.5799 12.25 10.9199 12.59 10.9199 13V16Z"
          />
        </svg>
      </StyledLabel>

      <StyledLabel
        title="task"
        htmlFor="task"
        onClick={() => handleLabelClick("task")}
        isSelected={selectedTab === "task"}
      >
        <input
          id="task"
          name="page"
          type="radio"
          checked={selectedTab === "task"}
        />
        <IconCubeOutline height={22} width={22} className="navIcon" />
      </StyledLabel>

      <StyledLabel
        title="ads"
        htmlFor="ads"
        onClick={() => handleLabelClick("ads")}
        isSelected={selectedTab === "ads"}
      >
        <input
          id="ads"
          name="page"
          type="radio"
          checked={selectedTab === "ads"}
        />
        <FaBlog className="navIcon" />
      </StyledLabel>

      <StyledLabel
        title="profile"
        htmlFor="profile"
        onClick={() => handleLabelClick("profile")}
        isSelected={selectedTab === "profile"}
      >
        <input
          id="profile"
          name="page"
          type="radio"
          checked={selectedTab === "profile"}
        />
        <IconProfile className="navIcon" />
      </StyledLabel>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  --col-blue: #3498db;
  --col-dark: #0c0f14;
  --col-darkGray: #52555a;
  --col-gray: #aeaeae;

  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--col-dark);
  border-radius: 30px;
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const StyledLabel = styled.label<StyledLabelProps>`
  padding: 8px 18px;
  transition: all 200ms;
  display: inline-block;

  input[type="radio"] {
    display: none;
  }

  > .navIcon {
    transition: all 200ms;
    fill: var(--col-gray);
    width: 14px;
    cursor: pointer;
  }

  &:hover:not(:has(input:checked)) > .navIcon {
    fill: #62a1cb;
    opacity: 0.6;
  }

  &::before {
    content: "";
    display: block;
    width: 0%;
    height: 2px;
    border-radius: 5px;
    position: relative;
    left: 50%;
    top: 20px;
    background: var(--col-blue);
    transition: all 200ms;
  }

  > .navIcon {
    transition: 300ms;
    fill: var(--col-darkGray);
    margin-top: 0;
  }

  &:has(input:checked) > .navIcon {
    fill: var(--col-blue);
    scale: 1.2;
    margin-top: -5px;
  }

  &:has(input:checked)::before {
    width: 100%;
    left: 0;
    top: 25px;
  }

  ${(props) =>
    props.isSelected &&
    `
    > .navIcon{
      fill: var(--col-blue);
      scale: 1.2;
      margin-top: -5px;
    }

    ::before {
      width: 100%;
      left: 0;
      top: 25px;
    }
  `}
`;

export default NavBar;
