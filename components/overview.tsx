"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Jan",
    sales: 42000,
    repairs: 12000,
  },
  {
    name: "Feb",
    sales: 38000,
    repairs: 14000,
  },
  {
    name: "Mar",
    sales: 45000,
    repairs: 15000,
  },
  {
    name: "Apr",
    sales: 52000,
    repairs: 16000,
  },
  {
    name: "May",
    sales: 48000,
    repairs: 18000,
  },
  {
    name: "Jun",
    sales: 56000,
    repairs: 17000,
  },
  {
    name: "Jul",
    sales: 62000,
    repairs: 19000,
  },
  {
    name: "Aug",
    sales: 58000,
    repairs: 20000,
  },
  {
    name: "Sep",
    sales: 65000,
    repairs: 22000,
  },
  {
    name: "Oct",
    sales: 72000,
    repairs: 21000,
  },
  {
    name: "Nov",
    sales: 68000,
    repairs: 23000,
  },
  {
    name: "Dec",
    sales: 85000,
    repairs: 25000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `£${value / 1000}k`}
        />
        <Tooltip
          formatter={(value) => [`£${value.toLocaleString()}`, undefined]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Bar dataKey="sales" name="Watch Sales" fill="#4f46e5" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="repairs" name="Repair Services" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

