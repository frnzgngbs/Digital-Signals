import { useTheme } from "@mui/material/styles";
import { Box, FormLabel, TextField, Grid } from "@mui/material";
import { BitsInputProps } from "../types/BitsInputProps";

const BitsInput: React.FC<BitsInputProps> = ({
	inputBits,
	onInputChange,
	hasInputError,
}) => {
	const theme = useTheme();

	return (
		<Box sx={{ display: "flex", width: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={7}>
					<Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
						<FormLabel
							sx={{
								fontSize: "0.9rem",
								color: theme.palette.secondary.main,
								marginBottom: "0.5rem",
							}}>
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
									width: "100%", // Full width for responsiveness
									fontSize: "0.8rem",
								},
							}}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default BitsInput;
