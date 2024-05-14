import styled from "styled-components";

const HLoader = () => {
  return (
    <LoaderRenderer>
      <Loader></Loader>
    </LoaderRenderer>
  );
};

export default HLoader;
const LoaderRenderer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  -moz-backdrop-filter: blur(8px);
  -o-backdrop-filter: blur(8px);
  cursor: progress;
`;
const Loader = styled.div`
  display: block;
  --height-of-loader: 5px;
  --loader-color: #6990b0;
  width: 100%;
  height: var(--height-of-loader);
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    background: linear-gradient(45deg, #3498db, #9b59b6, #2ecc71);
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    border-radius: 30px;
    animation: moving 1.5s ease-in-out infinite;
  }

  @keyframes moving {
    50% {
      width: 100%;
    }

    100% {
      width: 0;
      right: 0;
      left: unset;
    }
  }
`;
