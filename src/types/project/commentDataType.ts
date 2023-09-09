import { UserInfo } from './projectDataType'

export interface CommentData {
  readonly content: string
}

export interface ReplyDataType {
  readonly replyId: number
  readonly userDto: UserInfo
  readonly content: string
  readonly createDate: string
  readonly modifyDate: string
}

export interface CommentDataType extends CommentData {
  readonly commentId: number
  readonly userDto: UserInfo
  readonly createDate: string
  readonly modifyDate: string
  readonly replies: ReplyDataType[]
}
