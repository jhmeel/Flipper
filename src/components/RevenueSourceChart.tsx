import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


const RevenueSourceChart = () => {
    const sources = [
        {
          name: "Stock Market",
          amount: "$10,000",
          percentage: "50%",
        },
        {
          name: "Ads",
          amount: "$8000",
          percentage: "30%",
        },
        {
          name: "Affiliate Marketing",
          amount: "$3500",
          percentage: "20%",
        },
      ];
    
      const getRandomColor = () =>
        `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    
      const parsePercentage = (percentage: string): number => {
        return parseFloat(percentage.replace("%", ""));
      };
  return (
    <div>
         <PieChart width={300} height={300}>
            <Pie
              data={sources.map((platform) => ({
                ...platform,
                percentage: parsePercentage(platform.percentage),
              }))}
              dataKey="percentage"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {sources.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor()} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
    </div>
  )
}

export default RevenueSourceChart