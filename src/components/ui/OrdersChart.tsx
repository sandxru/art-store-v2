"use client";
import { Area, AreaChart, CartesianGrid, XAxis, LabelList } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Orders",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface OrdersChartProps {
  data: { month: string; desktop: number }[];
}

export function OrdersChart({ data }: OrdersChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" hideIndicator />}
        />
        <Area
          dataKey="desktop"
          type="linear"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        >
          <LabelList
            dataKey="desktop"
            position="top"
            fontSize={12}
            fill="slate-800"
            dy={-5}
          />
        </Area>
      </AreaChart>
    </ChartContainer>
  );
}

export default OrdersChart;
