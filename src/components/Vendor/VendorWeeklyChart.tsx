import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer } from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

interface IChartData {
  chartConfig: any,
  chartData: any
}

const VendorWeeklyChart: React.FC<IChartData> = ({ chartConfig, chartData }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Custom tool tip component for better aesthetics
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-white text-xs font-bold">Bookings</span>
              <span className="text-primary text-sm font-black">{payload[0].value}</span>
            </div>
            {payload[1] && (
              <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-1 mt-1">
                <span className="text-slate-400 text-xs font-bold">Revenue</span>
                <span className="text-emerald-400 text-sm font-black">₹{payload[1].value.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full shadow-sm border border-slate-100 rounded-[2rem] bg-white overflow-hidden">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black text-slate-900">Weekly Performance</CardTitle>
            <CardDescription className="text-slate-500 font-medium">Daily booking & revenue flow</CardDescription>
          </div>
          <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer 
          config={chartConfig} 
          className="aspect-[2/1] w-full"
        >
          <AreaChart 
            data={chartData}
            margin={{ top: 20, right: 20, left: isMobile ? -30 : 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-slate-100" />
            
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              className="text-[10px] font-black text-slate-400 uppercase tracking-tighter"
              dy={10}
            />
            
            <YAxis 
              tickLine={false}
              axisLine={false}
              hide={isMobile}
              className="text-[10px] font-black text-slate-400"
            />

            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="bookings" 
              stroke="#4F46E5" 
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#bookingGradient)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="revenue" 
              stroke="#10B981" 
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#revenueGradient)"
              animationDuration={2000}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default VendorWeeklyChart;
