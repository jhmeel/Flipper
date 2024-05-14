import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const Chart = ({ weeklyCumulation }) => {
  const [cumulations, setCumulation] = useState([]);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  /**
   * @updateCumulation- reformat the activities object keys {coming from the server} with a more native keys;
   *  it exchange the {_id} which is a list of numbers {1-7} representing days of the week with actual day in the days array above
   */
  const updateCumulation = () => {
    if (weeklyCumulation) {
      setCumulation(
        weeklyCumulation?.map((cumu) => ({
          name: days[cumu?._id - 1],
          earnings: cumu?.total || 0,
          amt: cumu?.total || 0,
        }))
      );
    }
  };

  useEffect(() => {
    updateCumulation();
  }, [weeklyCumulation]);

  const getRandomColor = () => {
    const colors = ["#3498db", "#9b59b6", " #2ecc71"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Section>
      <div className="sales">
        <div className="sales__details">
          <div>
            <h3>Balance</h3>
          </div>
          <div>
            <span>past week</span>
          </div>
        </div>
        <div className="sales__graph">
          <ResponsiveContainer width="100%" height="150%">
            <BarChart
              width={500}
              height={300}
              data={cumulations}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="earnings" stackId="a" fill={getRandomColor()} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Section>
  );
};

export default Chart;

const Section = styled.section`
  .sales {
    color: black;
    width: 100%;
    .sales__details {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
      h3 {
        @media (max-width: 767px) {
          font-size: 14px;
        }
      }
      div {
        display: flex;
        gap: 1rem;
        span {
          color: gray;
          font-size: 12px;
        }
      }
    }
    .sales__graph {
      height: 10rem;
      width: 100%;
      .recharts-default-tooltip {
        background-color: black !important;
        border-color: black !important;
        color: white !important;
      }
    }
  }
`;
