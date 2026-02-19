import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Calendar } from "lucide-react";

interface IChartData {
  chartConfig: any,
  chartData: any,
  setYear: (year: number) => void,
  title?: string,
  description?: string
}

const ChartMultyChart: React.FC<IChartData> = ({ chartConfig, chartData, setYear, title, description }) => {
  const [isMobile, setIsMobile] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const configKeys = Object.keys(chartConfig).filter(key => key !== 'visitors' && key !== 'label');

  return (
    <Card className="w-full shadow-2xl border-none mt-3">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 sm:p-8">
        <div className="space-y-1.5 text-left">
          <CardTitle className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            {title || "Analytics"}
          </CardTitle>
          <CardDescription className="text-base font-medium text-slate-500">
            {description || "Full 12-Month Performance Comparison"}
          </CardDescription>
        </div>

        {/* Dynamic Year Selector */}
        <div className="relative w-full md:w-44">
          <select 
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full appearance-none bg-slate-100 dark:bg-slate-800 border-none px-4 py-3 rounded-xl text-sm font-bold cursor-pointer focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                Year {year}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l pl-2 border-slate-300 dark:border-slate-600">
            <Calendar className="h-4 w-4 text-slate-500" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:px-6">
        <ChartContainer 
          config={chartConfig} 
          className="aspect-[2/1] w-full"
        >
          <BarChart 
            data={chartData}
            margin={{ top: 20, right: 10, left: isMobile ? -30 : 0, bottom: 20 }}
            barGap={isMobile ? 4 : 12}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
            
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
              tick={({ x, y, payload }) => (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0} 
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill="#64748b" 
                    className="text-[10px] sm:text-xs font-bold"
                  >
                    {payload.value.slice(0, 3)}
                  </text>
                </g>
              )}
            />
            
            <YAxis 
              tickLine={false}
              axisLine={false}
              hide={isMobile}
              className="text-xs font-bold text-slate-400"
            />

            <ChartTooltip
              cursor={{ fill: "rgba(0,0,0,0.03)", radius: 4 }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            
            <ChartLegend 
              content={<ChartLegendContent />} 
              className="justify-center md:justify-end gap-6 pt-10 font-bold" 
            />
            
            {configKeys.map((key, idx) => (
              <Bar 
                key={key}
                dataKey={key} 
                fill={chartConfig[key].color || (idx === 0 ? "#3b82f6" : "#6366f1")} 
                radius={[4, 4, 0, 0]} 
                barSize={isMobile ? 12 : 30} 
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartMultyChart;