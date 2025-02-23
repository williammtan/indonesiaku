"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Legend, Cell } from "@/components/ui/chart"

interface ChartData {
  name: string;
  value: number;
  percentage: number;
}

interface CorpusChartProps {
  data: ChartData[];
}

const COLORS = [
  "#2563eb", // blue-600
  "#16a34a", // green-600
  "#dc2626", // red-600
  "#ca8a04", // yellow-600
  "#9333ea", // purple-600
  "#0891b2", // cyan-600
  "#64748b", // slate-500
];

export function CorpusChart({ data }: CorpusChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Language Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percentage }) => `${name} (${percentage}%)`}
              labelLine={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              wrapperStyle={{
                paddingTop: "2rem",
              }}
              formatter={(value: string) => {
                const item = data.find((d) => d.name === value);
                return `${value} (${item?.value.toLocaleString()})`;
              }}
            />
          </PieChart>
        </div>
      </CardContent>
    </Card>
  );
} 