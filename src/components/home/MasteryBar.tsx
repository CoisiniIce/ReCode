"use client";

import { useTranslation } from "@/hooks/useTranslation";

import { Bar, BarChart, XAxis, Cell, LabelList, CartesianGrid } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { MasteryBarProps } from "@/types";

export function MasteryBar({ distribution }: MasteryBarProps) {
  const { t } = useTranslation();

  const chartConfig = {
    count: {
      label: t("masterybar.questions"),
      // color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          {t("masterybar.title")}
        </h3>
        {/* decoration */}
        <div className="h-2 w-2 rounded-full bg-gray-300" />
      </div>

      <ChartContainer config={chartConfig} className="h-72 w-full">
        <BarChart
          accessibilityLayer
          data={distribution}
          margin={{
            top: 25,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          barSize={48}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="rgba(0,0,0,0.05)"
          />

          <XAxis
            dataKey="label"
            tickLine={false}
            tickMargin={12}
            axisLine={false}
            tick={{ fill: "#6b7280", fontSize: 13, fontWeight: 500 }}
          />

          <ChartTooltip
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
            content={
              <ChartTooltipContent
                hideLabel
                className="bg-white/90 backdrop-blur-md shadow-xl border-white/50 rounded-xl"
              />
            }
          />

          <Bar dataKey="count" radius={[12, 12, 12, 12]}>
            <LabelList
              dataKey="count"
              position="top"
              offset={12}
              className="fill-gray-600 font-bold"
              fontSize={13}
              formatter={(val: any) => (val > 0 ? val : "")}
            />

            {distribution.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
                strokeWidth={2}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
