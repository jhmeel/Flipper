import React from "react";
import styled from "styled-components";
import { FaSignInAlt, FaMoneyCheckAlt, FaMoneyBillWave } from "react-icons/fa";

interface StepProps {
  borderColor?: string;
}

interface IconProps {
  iconColor: string;
}

const HowItWorks = () => {
  const steps = [
    {
      image: FaSignInAlt,
      guide: "Create an Account",
      description: "By clicking get started",
      iconColor: "#467196",
      borderColor: "#9fc6e9",
    },
    {
      image: FaMoneyCheckAlt,
      guide: "Activate a Package",
      description: "Choose a package that meets your investment goals",
      iconColor: "#6b001e",
      borderColor: "#b2556f",
    },
    {
      image: FaMoneyBillWave,
      guide: "Execute Tasks and Earn",
      description: "Start completing tasks and earn rewards",
      iconColor: "#457f3e",
      borderColor: "#9ED298",
    },
  ];

  return (
    <HowItWorksWrapper>
      <HowItWorksContainer>
        {steps.map((step, index) => (
          <Step key={index} borderColor={step.borderColor}>
            <StepId>{index + 1}</StepId>
            <IconContainer borderColor={step.borderColor}>
              <StepIcon as={step.image} iconColor={step.iconColor}>
                {<step.image />}
              </StepIcon>
            </IconContainer>
            <StepContent>
              <StepGuide>{step.guide}</StepGuide>
              <StepDescription>{step.description}</StepDescription>
            </StepContent>
          </Step>
        ))}
      </HowItWorksContainer>
    </HowItWorksWrapper>
  );
};

export default HowItWorks;

const HowItWorksWrapper = styled.div`
  width: 100%;
  padding: 40px 0;
  height:fit-content;

`;

const HowItWorksContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  background:transparent;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;


const Step = styled.div<StepProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 300px;
  border-radius: 16px;
  padding: 20px 40px;
  border: 1px solid #ededed;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  -o-backdrop-filter: blur(10px);
  transform: 0.5s;
  cursor: pointer;
  position: relative;
  &:hover {
    transition: 0.3s ease-out;
    transform: scale(1.01);
  }
`;

const StepId = styled.div<StepProps>`
  position: absolute;
  top: -18px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ededed;
  display: flex;
  font-family: "Zeitung", serif;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-weight: 700;
  color: ${(props) => props.borderColor};
`;

const IconContainer = styled.div<StepProps>`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: ${(props) => props.borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const StepIcon = styled.div<IconProps>`
  font-size: 40px;
  fill: ${(props) => props.iconColor};
`;

const StepContent = styled.div`
  text-align: center;
`;

const StepGuide = styled.h3`
  font-family: serif;
  font-weight: 600;
  margin-bottom: 5v px;
  color:#3d3d3d;
`;

const StepDescription = styled.p`
  color: #bbbbbb;
  font-size: 14px;
`;
