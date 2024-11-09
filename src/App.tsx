import { Box, createTheme, ThemeProvider } from "@mui/material";
import BasePage from "./pages/BasePage";

export const App = () => {
	const theme = createTheme({
		palette: {
			mode: "dark",
			primary: {
				main: "#90caf9", // A lighter shade of blue for better contrast
			},
			secondary: {
				main: "#f48fb1", // A softer pink for secondary color, more readable on dark mode
			},
			background: {
				default: "#121212", // Dark background for dark mode
				paper: "#1e1e1e", // Slightly lighter paper background
			},
			text: {
				primary: "#ffffff", // Ensure primary text is white for readability
				secondary: "#e0e0e0", // Lighter secondary text
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			{/*<CssBaseline />*/}
			<Box>
				<BasePage />
			</Box>
		</ThemeProvider>
	);
};
