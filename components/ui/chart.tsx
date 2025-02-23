"use client"

import type React from "react"

import {
  ResponsiveContainer,
  PieChart as RechartsBarChart,
  Pie as RechartsPie,
  Legend as RechartsLegend,
  Cell as RechartsCell,
} from "recharts"

export const PieChart = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart className={className}>{children}</RechartsBarChart>
    </ResponsiveContainer>
  )
}

export const Pie = RechartsPie
export const Legend = RechartsLegend
export const Cell = RechartsCell

