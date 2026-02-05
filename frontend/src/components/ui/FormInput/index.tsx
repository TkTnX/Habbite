import { FormControl, Input, InputLabel } from "@mui/material"

interface Props {
    disabled?: boolean
    name: string
    label:string
}

export const FormInput = ({ disabled, name, label }: Props) => {
	return (
		<FormControl disabled={disabled}>
			<InputLabel htmlFor='firstName'>{label}</InputLabel>
			<Input name={name} id={name} />
		</FormControl>
	)
}
