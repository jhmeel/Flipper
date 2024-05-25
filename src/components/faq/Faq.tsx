import React from "react";
import styled from "styled-components";
import MetaData from "../../misc/MetaData";

const Faq = () => {
  const freQuestions = [
    {
      ischecked: true,
      question: "Are stock market investments guaranteed to make a profit?",
      answer: `No, stock market investments are not guaranteed to make a profit. The stock market can be volatile, and the value of stocks can fluctuate based on various factors, including market conditions, economic trends, and company performance. While investing in stocks can potentially lead to significant returns, it also carries inherent risks, and investors may experience losses.`,
    },
    {
      question: "What are some strategies for minimizing investment risk?",
      answer: `There are several strategies investors can use to minimize investment risk. Diversification is key, which involves spreading your investments across different asset classes, industries, and geographic regions to reduce exposure to any single investment. Additionally, conducting thorough research, staying informed about market trends, and maintaining a long-term perspective can help mitigate risk. It's also essential to regularly review and adjust your investment portfolio based on changing market conditions and your financial goals.`,
    },

    {
      question: "What is ROI (Return on Investment)?",
      answer: `ROI, or Return on Investment, is a financial metric used to evaluate the profitability of an investment relative to its cost. It is calculated by dividing the net profit from the investment by the initial cost of the investment and expressing the result as a percentage. A higher ROI indicates a more profitable investment.`,
    },
    {
      question: "How soon can I withdraw funds from my investment account?",
      answer: `The withdrawal availability from your investment account depends on various factors, including the type of investment, investment vehicle, and specific terms and conditions set by your brokerage or investment provider. Generally, for liquid investments such as stocks and bonds, you can typically withdraw funds relatively quickly, often within a few business days. However, for certain investments like retirement accounts or locked-in investment products, there may be restrictions or penalties for early withdrawals.`,
    },

    {
      question: "How can I calculate the potential return on an investment?",
      answer: `You can calculate the potential return on an investment using various financial metrics, such as ROI (Return on Investment), CAGR (Compound Annual Growth Rate), or IRR (Internal Rate of Return). These calculations consider factors such as initial investment amount, expected returns, investment duration, and any associated costs or fees. Additionally, online investment calculators and financial modeling tools can help you estimate the potential return on your investment under different scenarios.`,
    },
  ];

  return (
    <>
      <MetaData title="Help" />
      <FaqRenderer>
        <div className="help-main">
          <p className="h-des">
            Here are some common questions and answers that might address your
            concerns
          </p>
          <div className="h-accordion">
            {freQuestions.map((qI, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="accordion"
                  id={`accordion${i}`}
                  defaultChecked={qI?.ischecked}
                />
                <label htmlFor={`accordion${i}`} className="h-accordion-title">
                  » {qI.question}
                </label>
                <div className="h-accordion-content">{qI.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </FaqRenderer>
    </>
  );
};

export default Faq;

const FaqRenderer = styled.div`
  height: fit-content;
  width: 100%;
  font-size: 13px;
  font-family: "Open Sans", sans-serif;
  color: #000;
  display: flex;
  justify-content: center;
  padding: 10px 5px;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: #fff;

  .help-main {
    width: 70%;
    height: fit-content;
    background-color: white;
    border: 1px solid #ededed;
    border-radius: 40px;
    margin-top: 5px;
  }
  @media (max-width: 767px) {
    .help-main {
      width: 100%;
    }
    .h-accordion-title {
      font-size: 13px;
    }
  }
  .help-h-txt {
    padding: 5px 10px;
  }
  .h-des {
    font-size: 14px;
    color: #000000;
    font-weight: 600;
    padding: 10px 20px;
    line-height:1.7rem;
  }
  input[type="radio"] {
    display: none;
  }
  .h-accordion-title {
    display: block;
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    color: #fff;
    background-color: #366da4;
    z-index: 2;
    cursor: pointer;
    font-size: 14px;
    font-family: "Open Sans", sans-serif;
    padding: 10px 20px;
  }

  .h-accordion-content {
    padding: 0;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    z-index: -1;
    transition: 0.3s linear;
    line-height: 1.6rem;
    font-size: 14px;
    font-family: "Playfair Display";
    color: #000;
  }
  .h-accordion:last-child > .h-accordion-title,
  .h-accordion:last-child > .h-accordion-content {
    border: none;
  }
  h2 {
    padding: 5px 10px;
  }

  input:checked ~ .h-accordion-content {
    padding: 15px;
    opacity: 1;
    max-height: 500px;
    z-index: 1;
  }
`;
