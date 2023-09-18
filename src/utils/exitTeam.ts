import {
  deleteProjectLeaderExit,
  deleteProjectMemberExit,
  postExitProcess,
} from '@/apis/mypage/myProject'

export const exitTeamMember = async (
  targetUserId: number,
  projectId: number,
) => {
  try {
    await postExitProcess(targetUserId)
    await deleteProjectMemberExit(targetUserId, projectId)
  } catch (error) {
    console.error(error)
  }
}

export const exitTeamLeader = async (
  targetUserId: number,
  projectId: number,
) => {
  try {
    await postExitProcess(targetUserId)
    await deleteProjectLeaderExit(projectId)
  } catch (error) {
    console.error(error)
  }
}
