import { Box, Grid } from "@mui/material";
import BitsInput from "../components/BitsInput";
import { useEffect, useState } from "react";
import NRZL from "../components/encoding-techniques/NRZL";
import BipolarAMI from "../components/encoding-techniques/BipolarAMI";
import NRZI from "../components/encoding-techniques/NRZI";
import Pseudoternary from "../components/encoding-techniques/Pseudoternary";
import Manchester from "../components/encoding-techniques/Manchester";
import DifferentialManchester from "../components/encoding-techniques/DifferentialManchester";

const BasePage = () => {
	const [inputBits, setInputBits] = useState<string>("");
	const [hasInputError, setHasInputError] = useState<boolean>(false);
	const [bitsArray, setBitsArray] = useState<number[]>([]);

	useEffect(() => {
		if (inputBits === "") {
			setHasInputError(false);
			setBitsArray([]);
			return;
		}

		const isValid = /^[01]+$/.test(inputBits);
		setHasInputError(!isValid);

		if (isValid) {
			setBitsArray(inputBits.split("").map((bit) => parseInt(bit)));
			return;
		}

		setBitsArray([]);
	}, [inputBits]);

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputBits(e.target.value);
	};

	return (
		<Box sx={{ padding: 4 }}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<BitsInput
						inputBits={inputBits}
						hasInputError={hasInputError}
						onInputChange={onInputChange}
					/>
				</Grid>
			</Grid>

			{bitsArray.length > 0 && (
				<Box sx={{ mt: 8 }}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<NRZL bitsArray={bitsArray} />
						</Grid>
						<Grid item xs={12} md={6}>
							<NRZI bitsArray={bitsArray} />
						</Grid>
						<Grid item xs={12} md={6}>
							<BipolarAMI bitsArray={bitsArray} />
						</Grid>
						<Grid item xs={12} md={6}>
							<Pseudoternary bitsArray={bitsArray} />
						</Grid>
						<Grid item xs={12} md={6}>
							<Manchester bitsArray={bitsArray} />
						</Grid>
						<Grid item xs={12} md={6}>
							<DifferentialManchester bitsArray={bitsArray} />
						</Grid>
					</Grid>
				</Box>
			)}
		</Box>
	);
};

export default BasePage;
