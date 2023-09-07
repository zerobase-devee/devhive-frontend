interface BadgeDto {
  readonly id: number
  readonly image: string
  readonly name: string
}

export interface BadgeDataType {
  badgeDto: BadgeDto
  score: number
}
