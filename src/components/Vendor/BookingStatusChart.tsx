import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Pie, PieChart as RechartsPieChart, Label, Cell } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

interface IBookingStatusChartProps {
  data: any[];
}

const BookingStatusChart: React.FC<IBookingStatusChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    value: item.count,
    fill: item.status === 'completed' ? '#10B981' : 
          item.status === 'pending' ? '#F59E0B' : 
          item.status === 'cancelled' ? '#EF4444' : '#6366F1'
  }));

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="w-full shadow-sm border border-slate-100 rounded-[2rem] bg-white overflow-hidden h-full flex flex-col">
      <CardHeader className="p-8 pb-0">
        <div className="flex items-center justify-between">
           <div className="text-left">
              <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Booking Status</CardTitle>
              <CardDescription className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Platform performance flow</CardDescription>
           </div>
           <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
              <PieChartIcon size={20} />
           </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 flex-1 flex flex-col justify-center items-center">
        <ChartContainer config={{}} className="aspect-square w-full max-w-[220px]">
          <RechartsPieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={90}
              strokeWidth={8}
              stroke="#fff"
              paddingAngle={4}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill}
                  className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-slate-900 text-3xl font-black tracking-tighter"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-slate-400 text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
        
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 w-full mt-8 pt-8 border-t border-slate-50">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-col gap-0.5 text-left">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
              </div>
              <span className="text-xl font-black text-slate-900 ml-4">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingStatusChart;
