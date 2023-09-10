interface UserDto {
  readonly userId: number
  readonly nickName: string
  readonly relatedUserUrl: string
}

interface ProjectDto {
  readonly projectId: number
  readonly projectName: string
  readonly relatedUserUrl: string
}

export interface Alarm {
  readonly alarmId: number
  readonly userDto: UserDto
  readonly projectDto: ProjectDto
}
