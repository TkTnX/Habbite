import { FormControl, Input, InputLabel, type InputProps } from "@mui/material"

interface Props extends InputProps {
	disabled?: boolean
	name: string
	label: string
	className?:string
}

export const FormInput = ({ disabled, className, name, label, ...props }: Props) => {
	return (
		<FormControl className={className} disabled={disabled}>
			<InputLabel htmlFor='firstName'>{label}</InputLabel>
			<Input name={name} id={name} {...props} />
		</FormControl>
	)
}
