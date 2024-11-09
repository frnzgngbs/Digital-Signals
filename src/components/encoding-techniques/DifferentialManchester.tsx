import React, { useState } from "react";
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

const DifferentialManchester = ({ bitsArray }: EncodingTechniquesProp) => {
	const [initialSignal, setInitialSignal] = useState(1);
	const chartData: ChartData[] = [];
	let currentSignal = initialSignal;

	// Handle radio button change
	const handleSignalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInitialSignal(event.target.value === "high" ? 1 : -1);
	};

	bitsArray.forEach((bit, index) => {
		if (bit === 0) {
			currentSignal = -currentSignal;
		}

		chartData.push({
			x: index * 2,
			y: currentSignal,
			bitIndex: index,
		});

		currentSignal = -currentSignal;

		chartData.push({
			x: index * 2 + 1,
			y: currentSignal,
			bitIndex: index,
		});
	});

	chartData.push({
		x: bitsArray.length * 2,
		y: currentSignal,
		bitIndex: bitsArray.length - 1,
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
			<h3 className="text-lg font-semibold mb-4">
				Differential Manchester Encoding
			</h3>

			<div className="mb-4">
				<label className="mr-4">
					<input
						type="radio"
						name="initialSignal"
						value="high"
						checked={initialSignal === 1}
						onChange={handleSignalChange}
					/>
					Start High
				</label>
				<label>
					<input
						type="radio"
						name="initialSignal"
						value="low"
						checked={initialSignal === -1}
						onChange={handleSignalChange}
					/>
					Start Low
				</label>
			</div>

			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="x"
						type="number"
						domain={[0, bitsArray.length * 2]}
						ticks={[...Array(bitsArray.length * 2 + 1)].map((_, i) => i)}
						tickFormatter={(value) =>
							bitsArray[Math.floor(value / 2)]?.toString() || ""
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

export default DifferentialManchester;
