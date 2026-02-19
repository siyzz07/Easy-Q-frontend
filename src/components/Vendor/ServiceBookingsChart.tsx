import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface IServiceChartProps {
  data: any[];
}

const ServiceBookingsChart: React.FC<IServiceChartProps> = ({ data }) => {
  // Map our topServices data to the format expected by the chart
  const chartData = data.map((item) => ({
    name: item.name,
    bookings: item.count,
    revenue: item.revenue,
  }));

  const chartConfig = {
    bookings: {
      label: "Bookings",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="w-full shadow-sm border border-slate-100 rounded-[2rem] bg-white overflow-hidden">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-black text-slate-900">Service Performance</CardTitle>
        <CardDescription>Bookings per service</CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-2">
        <ChartContainer config={chartConfig} className="aspect-[2/1] w-full">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
          >
            <defs>
              <linearGradient id="serviceGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#E2E8F0" />
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              className="text-[11px] font-black text-slate-600 uppercase tracking-tight"
              width={120}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(0,0,0,0.03)", radius: 8 }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="bookings"
              fill="url(#serviceGradient)"
              radius={[0, 8, 8, 0]}
              barSize={32}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ServiceBookingsChart;
