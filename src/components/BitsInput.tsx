import { useTheme } from "@mui/material/styles";
import { Box, FormLabel, TextField } from "@mui/material";
import { BitsInputProps } from "../types/BitsInputProps";

const BitsInput: React.FC<BitsInputProps> = ({
	inputBits,
	onInputChange,
	hasInputError,
}) => {
	const theme = useTheme();

	return (
		<Box sx={{ display: "flex", width: 1 }}>
			<Box
				sx={{
					width: "50%",
					display: "flex",
					flexDirection: "column",
					alignItems: "stretch",
				}}>
				<FormLabel
					sx={{ fontSize: "0.9rem", color: theme.palette.secondary.main }}>
					Enter digital data:
				</FormLabel>
				<TextField
					sx={{
						fontSize: "0.7rem",
						"& .MuiOutlinedInput-root": {
							borderRadius: 2.3,
							"& fieldset": {
								borderColor: theme.palette.secondary.main,
							},
							"&:hover fieldset": {
								borderColor: theme.palette.secondary.main,
							},
							"&.Mui-focused fieldset": {
								borderColor: theme.palette.secondary.main,
							},
							"& input": {
								color: theme.palette.primary.main,
							},
						},
					}}
					value={inputBits}
					onChange={onInputChange}
					error={hasInputError}
					helperText={hasInputError ? "Invalid input bits." : ""}
					InputProps={{
						style: {
							height: 40,
							width: 400,
							fontSize: "0.8rem",
						},
					}}
				/>
			</Box>
		</Box>
	);
};

export default BitsInput;
