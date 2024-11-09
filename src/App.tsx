import { Box, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import BasePage from "./pages/BasePage";

export const App = () => {
	const theme = createTheme({
		palette: {
			mode: "dark",
			primary: {
				main: "#a6a6a6",
			},
			secondary: {
				main: "#ad84df",
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box>
				<BasePage />
			</Box>
		</ThemeProvider>
	);
};
