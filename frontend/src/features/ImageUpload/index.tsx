import { Camera } from "lucide-react"
import "./imageUpload.scss"
export const ImageUpload = () => {
	return (
		<label className='imageUpload'>
			<input name="image" type='file' hidden accept='image/*' />
			<Camera stroke='#6b6b6b' fill='white' />
			<p>Нажмите, чтобы изменить фото</p>
		</label>
	)
}
