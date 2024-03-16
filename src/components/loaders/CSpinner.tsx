import React from "react";
import styled, { keyframes } from "styled-components";
import { CircleLoaderIcon } from "../../assets/icons";

const CSpinner:React.FC = () => {
  return (
   <Loader>
     <CircleLoaderIcon className='custom-loader'/> 
     <p>Loading...</p>
   </Loader>
  );
}; 

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

export default CSpinner;
const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${gradientAnimation} 5s infinite;
  background: linear-gradient(45deg, #3498db, #9b59b6, #2ecc71);
  background-size: 200% 200%;
  cursor: progress;
p{
  font-size:12px;
  color:#1e282f;
}
.custom-loader {
  width: 4em;
  transform-origin: center;
  animation: rotate4 2s linear infinite;
}

@keyframes rotate4 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash4 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
}

`