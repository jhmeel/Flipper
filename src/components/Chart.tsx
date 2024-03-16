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
  const updateCumulation = () => {
    if (weeklyCumulation) {
      setCumulation(
        weeklyCumulation?.map((cumu, _) => ({
          name: days[cumu?._id - 1],
          earnings: cumu?.total,
          amt: cumu?.total,
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

const demoData = [
  {
    name: "Sun",
    earnings: 2400,
    amt: 2400,
  },
  {
    name: "Mon",
    earnings: 1398,
    amt: 2210,
  },
  {
    name: "Tue",
    earnings: 9800,
    amt: 2290,
  },
  {
    name: "Wed",
    earnings: 3908,
    amt: 2000,
  },
  {
    name: "Thur",
    earnings: 4800,
    amt: 2181,
  },
  {
    name: "Fri",
    earnings: 3800,
    amt: 2500,
  },
  {
    name: "Sat",
    earnings: 4300,
    amt: 2100,
  },
];
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
