import { BadgeDataType } from '../users/badgeDataType'

export interface RankDataType {
  readonly userId: number
  readonly nickName: string
  readonly profileImage: string | null
  readonly rankPoint: number
  readonly userBadges: BadgeDataType[]
}
