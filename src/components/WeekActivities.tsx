import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { IconBarChartLineFill, IconPieChart } from "../assets/icons";
import { getCumulativePercentage } from "../utils/formatter";
import RDotSpinner from "./loaders/RDotSpinner";

const WeekActivity = ({ activities, pId }): React.ReactElement => {
  const [weekActivity, setWeekActivity] = useState([]);

  /**
   * @updateActivity- reformat the activities object keys {coming from the server} with a more native keys and compute the cumulative percentage till last week
   */
  const updateActivity = () => {
    if (activities) {
      setWeekActivity(
        activities?.map((act: { _id: string; total: number; }) => ({
          name: act._id,
          amount: act?.total,
          percentage: getCumulativePercentage(pId, act._id, act?.total),
        }))
      );
    }
  };

  useEffect(() => {
    updateActivity();
  }, [activities]);


  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const [chartType, setChartType] = useState<"bar" | "pie">("bar");

  const toggleChartType = () => {
    setChartType((prevType) => (prevType === "bar" ? "pie" : "bar"));
  };
  const randColor = getRandomColor();
  return (
    <WeekActivityRenderer id="WeekActivity_table">
      <header>
        <span onClick={toggleChartType}>
          {chartType === "bar" ? (
            <>
              <IconPieChart className="chart-icon" /> See Pie Chart
            </>
          ) : (
            <>
              <IconBarChartLineFill className="chart-icon" /> See Bar Chart
            </>
          )}
        </span>
      </header>
      {chartType === "bar" && weekActivity?.length > 0 ? (
        <div className="platform-details">
          {weekActivity?.map((activity, i: number) => (
            <div className="platform-item" key={i}>
              <h4 className="name">{activity.name}</h4>
              <div className="progress">
                <span
                  style={{
                    width: activity.percentage,
                    backgroundColor: randColor,
                  }}
                ></span>
              </div>
              <div className="amount_percentage">
                <span className="amount">₦{activity.amount}</span>
                <span className="percentage">
                  {"+" + activity.percentage + "%"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : chartType === "pie" && weekActivity?.length > 0 ? (
        <div className="platform-details">
          <PieChart width={300} height={300}>
            <Pie
              data={weekActivity?.map((activity) => ({
                ...activity,
                percentage: activity.percentage,
              }))}
              dataKey="percentage"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {weekActivity?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={randColor} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      ) : (
        <RDotSpinner />
      )}
    </WeekActivityRenderer>
  );
};

export default WeekActivity;

const WeekActivityRenderer = styled.div`
  padding: 5px 10px;
  z-index: 999;
  border: 1px solid #ededed;
  border-radius: 6px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  -o-backdrop-filter: blur(10px);
  transform: 0.5s;
  width: 100%;

  header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }

  header span {
    cursor: pointer;
    font-size: 12px;
    color: #3498db;
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .chart-icon {
    fill: #3498db;
    width: 14px;
    height: 14px;
  }

  .platform-details {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
  }

  .platform-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 8px;
    padding: 10px;
  }

  .progress {
    width: 100%;
    height: 10px;
    background-color: #ededed;
    border-radius: 12px;
    position: relative;
  }

  .progress span {
    position: absolute;
    background-color: #3498db;
    height: 100%;
    border-radius: 12px;
    transition: 0.3s ease-out;
  }

  .amount_percentage {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .platform-item .name {
    font-size: 14px;
    text-align: center;
    font-family: "Times New Roman", Times, serif;
  }

  .platform-item .amount,
  .percentage {
    font-size: 12px;
  }

  @media (max-width: 767px) {
    .platform-item .name {
      font-size: 12px;
    }

    .platform-item .amount,
    .percentage {
      font-size: 10px;
    }

    header h3 {
      font-size: 14px;
    }
  }
`;
