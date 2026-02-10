import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

interface IChartData {
  chartConfig: any,
  chartData: any
}

const VendorWeeklyChart: React.FC<IChartData> = ({ chartConfig, chartData }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Card className="w-full shadow-2xl border-none mt-3">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 sm:p-8">
        <div className="space-y-1.5">
          <CardTitle className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            Weekly Bookings
          </CardTitle>
          <CardDescription className="text-base font-medium text-slate-500">
            Performance based on days of the week
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:px-4">
        <ChartContainer 
          config={chartConfig} 
          className="aspect-[4/5] sm:aspect-[2/1] lg:aspect-[2.4/1] w-full"
        >
          <BarChart 
            data={chartData}
            margin={{ top: 20, right: 10, left: isMobile ? -30 : 0, bottom: 60 }}
            barGap={isMobile ? 2 : 6}
          >
            <defs>
              <linearGradient id="bookingBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="#323256" stopOpacity={1}/>
                <stop offset="100%" stopColor="#323256" stopOpacity={0.5}/>
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
            
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              interval={0}
              scale="band"
              padding={{ left: 0, right: 0 }}
              tick={({ x, y, payload }) => (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0} 
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill="#64748" 
                    className="text-xs font-bold"
                  >
                    {payload.value}
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
            
            <Bar 
              dataKey="bookings" 
              fill="url(#bookingBlue)" 
              radius={[4, 4, 0, 0]} 
              barSize={isMobile ? 12 : 30} 
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default VendorWeeklyChart
