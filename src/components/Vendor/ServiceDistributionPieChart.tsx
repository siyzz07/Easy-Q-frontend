import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Cell, Pie, PieChart } from "recharts";

interface IServiceDistributionProps {
  data: any[];
}

const ServiceDistributionPieChart: React.FC<IServiceDistributionProps> = ({ data }) => {
  const chartData = data.slice(0, 5).map((item) => ({
    name: item.name,
    value: item.count,
  }));

  const COLORS = ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981"];

  return (
    <Card className="w-full shadow-sm border border-slate-100 rounded-[2rem] bg-white overflow-hidden h-full">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-black text-slate-900">Service Distribution</CardTitle>
        <CardDescription>Popularity share among top services</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex justify-center items-center">
        <ChartContainer config={{}} className="aspect-square w-full max-w-[280px]">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="px-8 pb-8 space-y-2">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-xs font-bold text-slate-600 truncate max-w-[120px]">{item.name}</span>
            </div>
            <span className="text-xs font-black text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ServiceDistributionPieChart;
