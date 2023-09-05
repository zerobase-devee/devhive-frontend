export interface MyProfileDataType {
  readonly userId: number
  readonly isLocalLogin: boolean
  readonly email: string
  readonly nickname: string
  readonly region: string | null
  readonly profileImage: string | null
  readonly intro: string | null
}
