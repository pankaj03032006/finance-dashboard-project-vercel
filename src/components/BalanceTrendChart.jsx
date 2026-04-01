import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function BalanceTrendChart({ transactions }) {

  const data = transactions.map((t) => ({
    date: t.date,
    amount: t.amount
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-lg font-semibold mb-4">
        Balance Trend
      </h2>

      <LineChart width={400} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="date"/>
        <YAxis/>
        <Tooltip/>
        <Line type="monotone" dataKey="amount" stroke="#6366F1"/>
      </LineChart>

    </div>
  );
}