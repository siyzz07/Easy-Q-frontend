import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface IPeakHoursChartProps {
  data: any[];
}

const PeakHoursChart: React.FC<IPeakHoursChartProps> = ({ data }) => {
  // Format the data to ensure all hours are represented (0-23)
  const fullDayData = Array.from({ length: 24 }, (_, i) => {
    const hourData = data.find((d) => d.hour === i);
    return {
      hour: `${i}:00`,
      count: hourData ? hourData.count : 0,
    };
  });

  const chartConfig = {
    count: {
      label: "Bookings",
      color: "#4F46E5",
    },
  };

  return (
    <Card className="w-full shadow-sm border border-slate-100 rounded-[2rem] bg-white overflow-hidden">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-black text-slate-900 flex items-center gap-2">
          Peak Hours
        </CardTitle>
        <CardDescription>Busiest times of the day</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ChartContainer config={chartConfig} className="aspect-[3/1] w-full">
          <AreaChart
            data={fullDayData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis 
              dataKey="hour" 
              tickLine={false} 
              axisLine={false} 
              interval={3}
              className="text-[10px] font-bold text-slate-400"
            />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#4F46E5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PeakHoursChart;
