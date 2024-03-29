import { StaticImageData } from 'next/image'

export interface AdminSendDataType {
  readonly name: string
  readonly imageUrl: string
}

export interface AdminUploadDataType {
  readonly image: File
  readonly name: string
}

export interface TechStackDataType {
  readonly id: number
  readonly image: string | StaticImageData
  readonly name: string
}

export interface BadgeDataType {
  readonly id: number
  readonly image: string | StaticImageData
  readonly name: string
}
