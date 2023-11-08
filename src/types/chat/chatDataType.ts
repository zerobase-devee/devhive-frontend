import { UserInfo } from '../project/projectDataType'

export interface ChatRoomDataType {
  projectId: number
  roomId: number
  title: string
}

export interface ChatDataType {
  userDto: UserInfo
  text: string
  sendTime: string
}
