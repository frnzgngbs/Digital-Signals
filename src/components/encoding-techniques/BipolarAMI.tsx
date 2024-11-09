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

const BipolarAMI = ({ bitsArray }: EncodingTechniquesProp) => {
	const chartData: ChartData[] = [];

	let currentSignal = 1;

	bitsArray.forEach((bit, index) => {
		if (bit === 1) {
			chartData.push({
				x: index,
				y: currentSignal,
				bitIndex: index,
			});

			chartData.push({
				x: index + 0.999,
				y: currentSignal,
				bitIndex: index,
			});

			currentSignal = -currentSignal;
		} else {
			chartData.push({
				x: index,
				y: 0,
				bitIndex: index,
			});

			chartData.push({
				x: index + 0.999,
				y: 0,
				bitIndex: index,
			});
		}
	});

	const customTooltip = ({ active, payload }: any) => {
		if (!active || !payload || !payload.length) return null;

		const data = payload[0].payload;
		const bitValue = bitsArray[data.bitIndex];

		return (
			<div className="bg-white p-2 border border-gray-200 rounded shadow">
				<p>Bit: {bitValue}</p>
			</div>
		);
	};

	return (
		<div className="w-full">
			<h3 className="text-lg font-semibold mb-4">Bipolar AMI Encoding</h3>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="x"
						type="number"
						domain={[0, bitsArray.length - 1]}
						ticks={[...Array(bitsArray.length)].map((_, i) => i)}
						tickFormatter={(value) =>
							bitsArray[Math.floor(value)]?.toString() || ""
						}
					/>
					<YAxis domain={[-1.5, 1.5]} ticks={[-1, 0, 1]} />
					<Tooltip content={customTooltip} />
					<Legend />
					<Line
						name="Signal"
						type="linear"
						dataKey="y"
						stroke="#8884d8"
						strokeWidth={2}
						dot={false}
						isAnimationActive={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default BipolarAMI;
