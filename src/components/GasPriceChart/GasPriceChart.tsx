import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import GasPriceChartProps from "./GasPriceChartProps";

const data = [
  { time: "19:49:37", value: 23 },
  { time: "19:49:50", value: 57 },
  { time: "19:49:50", value: 29 },
  { time: "19:51:07", value: 43 },
];

function GasPriceChart(props: GasPriceChartProps) {
  return (
    <ResponsiveContainer height={300} width="100%">
      <LineChart data={props.values}>
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default GasPriceChart;
