import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { EncodingTechniquesProp } from "../../types/EncodingTechniquesProp";

interface ChartData {
	x: number;
	y: number;
	bitIndex: number;
}

const NRZL = ({ bitsArray }: EncodingTechniquesProp) => {
	const chartData: ChartData[] = [];

	bitsArray.forEach((bit, index) => {
		chartData.push({
			x: index,
			y: bit === 1 ? 1 : -1,
			bitIndex: index,
		});

		chartData.push({
			x: index + 0.999,
			y: bit === 1 ? 1 : -1,
			bitIndex: index,
		});
	});

	const customTooltip = ({ active, payload }: any) => {
		if (!active || !payload || !payload.length) return null;

		const data = payload[0].payload;
		const bitValue = bitsArray[data.bitIndex];

		return (
			<div className="bg-blue-600 text-white p-2 border border-blue-500 rounded shadow">
				<p>Bit: {bitValue}</p>
			</div>
		);
	};

	return (
		<div className="w-full">
			<h3 className="text-lg font-semibold mb-4">NRZL Encoding</h3>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
				>
					<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
					<XAxis
						dataKey="x"
						type="number"
						domain={[0, bitsArray.length - 1]}
						ticks={[...Array(bitsArray.length)].map((_, i) => i)}
						tickFormatter={(value) =>
							bitsArray[Math.floor(value)]?.toString() || ""
						}
						stroke="#ffffff" // White color for axis ticks
					/>
					<YAxis domain={[-1.5, 1.5]} ticks={[-1, 0, 1]} stroke="#ffffff" /> {/* White ticks for better contrast */}
					<Tooltip content={customTooltip} />
					<Legend />
					<Line
						name="Signal"
						type="linear"
						dataKey="y"
						stroke="#ff6347" // Changed line color to tomato red for better visibility
						strokeWidth={2}
						dot={false}
						isAnimationActive={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default NRZL;
