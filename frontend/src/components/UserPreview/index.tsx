import { Skeleton } from "@mui/material"
import { useUserStore } from "../../shared/stores"
import "./userPreview.scss"
export const UserPreview = () => {
	const { user } = useUserStore()

	if (!user) return <Skeleton width={"100%"} height={80} />

	return (
		<div className='userPreview'>
			{user?.avatar ? (
				<img src={user.avatar} className='userPreview__avatar' />
			) : (
				<div className='userPreview__avatar' />
			)}

			<p className='userPreview__name'>
				{user?.firstName + " " + user?.lastName}
			</p>
		</div>
	)
}
