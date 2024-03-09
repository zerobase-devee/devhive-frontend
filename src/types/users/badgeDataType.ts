import { StaticImageData } from 'next/image'

interface BadgeDto {
  readonly id: number
  readonly image: string | StaticImageData
  readonly name: string
}

export interface BadgeDataType {
  badgeDto: BadgeDto
  score: number
}
