interface UserDto {
  readonly userId: number
  readonly nickName: string
}

export interface Alarm {
  readonly alarmId: number
  readonly projectId: number
  readonly projectName: string
  readonly userDto: UserDto | null
  readonly content:
    | 'COMMENT'
    | 'REPLY'
    | 'PROJECT_APPLY'
    | 'APPLICANT_ACCEPT'
    | 'APPLICANT_REJECT'
    | 'EXIT_VOTE'
    | 'VOTE_RESULT_EXIT_SUCCESS'
    | 'VOTE_RESULT_EXIT_FAIL'
    | 'EXIT_LEADER_DELETE_PROJECT'
    | 'REVIEW_REQUEST'
    | 'REVIEW_RESULT'
    | 'FAVORITE_USER'
    | 'RECOMMEND'

  readonly createDate: string
}
