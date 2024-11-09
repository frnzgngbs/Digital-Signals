export interface BitsInputProps {
	inputBits: string;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	hasInputError: boolean;
}
