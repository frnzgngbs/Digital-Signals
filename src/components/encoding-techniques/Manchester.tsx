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

const Manchester = ({ bitsArray }: EncodingTechniquesProp) => {
	const chartData: ChartData[] = [];

	let currentSignal = 1;

	bitsArray.forEach((bit, index) => {
		if (bit === 0) {
			chartData.push({
				x: index,
				y: currentSignal,
				bitIndex: index,
			});

			chartData.push({
				x: index + 0.5,
				y: -currentSignal,
				bitIndex: index,
			});
		} else {
			chartData.push({
				x: index,
				y: -currentSignal,
				bitIndex: index,
			});

			chartData.push({
				x: index + 0.5,
				y: currentSignal,
				bitIndex: index,
			});
		}
	});

	const lastBitIndex = bitsArray.length - 1;
	if (bitsArray[lastBitIndex] === 0) {
		chartData.push({
			x: lastBitIndex + 0.5,
			y: -currentSignal,
			bitIndex: lastBitIndex,
		});

		chartData.push({
			x: lastBitIndex + 1,
			y: -currentSignal,
			bitIndex: lastBitIndex,
		});
	} else {
		chartData.push({
			x: lastBitIndex + 0.5,
			y: currentSignal,
			bitIndex: lastBitIndex,
		});

		chartData.push({
			x: lastBitIndex + 1,
			y: currentSignal,
			bitIndex: lastBitIndex,
		});
	}

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
			<h3 className="text-lg font-semibold mb-4">Manchester Encoding</h3>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="x"
						type="number"
						domain={[0, bitsArray.length]}
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
						type="stepAfter"
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

export default Manchester;
