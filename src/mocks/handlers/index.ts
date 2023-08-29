import { imageUploadHandler } from './imageUploadHandler'
import ProjectDetail from './projectDetail'

export const handlers = [...ProjectDetail, imageUploadHandler]
