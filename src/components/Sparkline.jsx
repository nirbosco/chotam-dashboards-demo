import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

export function Sparkline({ data, color = '#0046ff', height = 40 }) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 4, right: 0, bottom: 4, left: 0 }}>
        <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
