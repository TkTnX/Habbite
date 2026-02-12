import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Skeleton
} from "@mui/material"
import { FormInput } from "../../components/ui"
import { useUserStore } from "../../shared/stores"
import { ImageUpload } from "../ImageUpload"
import "./settingsForm.scss"
import { useUser } from "../../shared/hooks"
import type { IUpdateUser } from "../../shared"
import { toast } from "react-toastify"
export const SettingsForm = () => {
	const { updateUserMutation } = useUser()
	const { mutate, isPending } = updateUserMutation()
	const { user } = useUserStore()

	if (!user) return <Skeleton height={"500px"} />

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.target)

        const image = formData.get('image') as File
        if (image && image.size === 0) {
            formData.delete('image')
        }

		const { password, ...values } = Object.fromEntries(
			formData
		) as unknown as IUpdateUser

		const hasEmpty = Object.entries(values).some(
			([key, value]) => key !== "image" && value === ""
		)
		if (hasEmpty) return toast.error("Не должно быть пустых полей!")
		mutate(formData, {
			onSuccess: () => toast.success("Данные изменены!")
		})
	}

	return (
		<form onSubmit={onSubmit} className='settingsForm'>
			<ImageUpload />
			<div className='settingsForm__accordions'>
				<Accordion defaultExpanded className='settingsForm__accordion'>
					<AccordionSummary>Информация об аккаунте</AccordionSummary>
					<AccordionDetails className='settingsForm__inputs'>
						<FormInput
							disabled={isPending}
							label='Имя'
							name='firstName'
							defaultValue={user.firstName}
						/>
						<FormInput
							disabled={isPending}
							label='Фамилия'
							name='lastName'
							defaultValue={user.lastName}
						/>
						<FormInput
							type='email'
							disabled={isPending}
							label='Почта'
							name='email'
							defaultValue={user.email}
						/>
						<FormInput
							type='password'
							disabled={isPending}
							label='Новый пароль'
							name='password'
							placeholder={"******"}
						/>
					</AccordionDetails>
				</Accordion>
				<Accordion className='settingsForm__accordion'>
					<AccordionSummary>Информация о вас</AccordionSummary>
					<AccordionDetails className='settingsForm__inputs'>
						<FormInput
							type='number'
							disabled={isPending}
							label='Рост'
							name='height'
							defaultValue={user.height}
						/>
						<FormInput
							type='number'
							disabled={isPending}
							label='Желаемый вес'
							name='weightGoal'
							defaultValue={user.weightGoal}
						/>
						<FormInput
							disabled={isPending}
							label='Дата рождения'
							name='birthday'
							type='date'
							defaultValue={
								new Date(user.birthday!)
									.toISOString()
									.split("T")[0]
							}
						/>
					</AccordionDetails>
				</Accordion>
				<button disabled={isPending} className='button'>
					Сохранить изменения
				</button>
			</div>
		</form>
	)
}
