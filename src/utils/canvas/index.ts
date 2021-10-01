import { CanvasToImageConfig } from './interface'
// TODO 大图片处理
export function transCanvasToImg(config: CanvasToImageConfig) {
	config.fileName = config.fileName || 'canvas'
	const MIME_TYPE = 'image/png'
	const imgUrl = config.canvas.toDataURL(MIME_TYPE)
	const link = document.createElement('a')

	link.download = config.fileName
	link.href = imgUrl

	// TODO appendChile & append
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}