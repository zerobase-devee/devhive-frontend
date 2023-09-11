import { IoMdClose } from 'react-icons/io'
import styles from './alarm.module.css'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { fetchAccessData } from '@/utils/fetchAccessData'
import { HiBell } from 'react-icons/hi'
import { Alarm } from '@/types/users/alarmsDataType'
import { formatDatetoYYYYMMDDHHMM } from '@/utils/formatDate'
import { deleteAlarm } from '@/apis/alarms/alarms'
import { useRouter } from 'next/router'

const Alarm = ({
  isOpenAlarm,
  handleToggleAlarm,
}: {
  isOpenAlarm: boolean
  handleToggleAlarm: () => void
}) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data, error, isLoading } = useQuery(
    [REACT_QUERY_KEY.alarm, router.asPath],
    () => fetchAccessData('/users/alarms'),
    {
      staleTime: 1000,
    },
  )

  const deleteAlarmMutation = useMutation(
    (alarmId: number) => deleteAlarm(alarmId),
    {
      onMutate: (deletedAlarmId) => {
        const previousData = queryClient.getQueryData<Alarm[]>(
          REACT_QUERY_KEY.alarm,
        )
        queryClient.setQueryData(REACT_QUERY_KEY.alarm, (previousData) => {
          return (
            (previousData as Alarm[])?.filter(
              (item: Alarm) => item.alarmId !== deletedAlarmId,
            ) || []
          )
        })
        return { previousData }
      },
      onSuccess: () => {
        queryClient.invalidateQueries([REACT_QUERY_KEY.alarm, router.asPath])
      },
    },
  )

  const handleDeleteAlarm = async (
    event: React.MouseEvent<HTMLButtonElement>,
    alarmId: number,
  ) => {
    event.stopPropagation()
    try {
      await deleteAlarmMutation.mutateAsync(alarmId)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLink = (content: Alarm['content'], projectId: number) => {
    handleToggleAlarm()
    if (!(content === 'EXIT_LEADER_DELETE_PROJECT')) {
      router.push(
        !(
          content === 'EXIT_VOTE' ||
          content === 'PROJECT_APPLY' ||
          content === 'VOTE_RESULT_EXIT_SUCCESS' ||
          content === 'VOTE_RESULT_EXIT_FAIL' ||
          content === 'REVIEW_REQUEST' ||
          content === 'REVIEW_RESULT'
        )
          ? `/project/${projectId}`
          : `/mypage/myproject/${projectId}`,
      )
    } else {
      return
    }
  }

  if (isLoading) {
    return (
      <button className={styles.btn}>
        <span className={styles.badge}>{0}</span>
        <HiBell />
      </button>
    )
  }

  if (!data) {
    return null
  }

  if (data.length === 0) {
    return (
      <>
        <button className={styles.btn}>
          <span className={styles.badge}>{0}</span>
          <HiBell />
        </button>
        {isOpenAlarm && (
          <div className={`${styles.container} ${styles.null}`}>
            아직 온 알림이 없어요.
          </div>
        )}
      </>
    )
  }

  const ALARM_CONTENT = {
    COMMENT: '에 새로운 댓글을 확인해보세요.',
    REPLY: '에 작성한 내 댓글에 답글이 달렸어요.',
    PROJECT_APPLY: '에 새로운 신청자가 있어요.',
    APPLICANT_ACCEPT: '에 신청이 수락 되었어요.',
    APPLICANT_REJECT: '에 신청이 거절 되었어요.',
    EXIT_VOTE:
      '님에 대한 프로젝트 퇴출 투표가 생성되었어요. 24시간 내에 투표해주세요.',
    VOTE_RESULT_EXIT_SUCCESS: '님이 프로젝트에서 퇴출 되었어요.',
    VOTE_RESULT_EXIT_FAIL: '님의 퇴출 투표결과가 무효되었어요.',
    EXIT_LEADER_DELETE_PROJECT: '에 팀장이 퇴출되어서 프로젝트가 삭제되었어요.',
    REVIEW_REQUEST: '프로젝트는 어떠셨나요? 팀원 평가를 진행해주세요.',
    REVIEW_RESULT: '프로젝트의 팀원 평가가 완료되었어요.',
    FAVORITE_USER: '님이 새로운 프로젝트를 업로드하였어요.',
    RECOMMEND: '님이 흥미를 보일 새로운 프로젝트가 업데이트 되었어요.',
  }

  const ALARM_BADGE = {
    COMMENT: '댓글',
    REPLY: '답글',
    PROJECT_APPLY: '프로젝트',
    APPLICANT_ACCEPT: '프로젝트',
    APPLICANT_REJECT: '프로젝트',
    EXIT_VOTE: '프로젝트',
    VOTE_RESULT_EXIT_SUCCESS: '프로젝트',
    VOTE_RESULT_EXIT_FAIL: '프로젝트',
    EXIT_LEADER_DELETE_PROJECT: '프로젝트',
    REVIEW_REQUEST: '프로젝트',
    REVIEW_RESULT: '프로젝트',
    FAVORITE_USER: '추천',
    RECOMMEND: '추천',
  }

  if (error) {
    return <p>에러 발생</p>
  }

  return (
    <>
      <button className={styles.btn}>
        <span className={styles.badge}>{data.length}</span>
        <HiBell />
      </button>
      {isOpenAlarm && (
        <div
          className={`${styles.container} ${styles.scroll}`}
          onClick={(e) => e.stopPropagation()}
        >
          {data?.map((item: Alarm) => (
            <div
              onClick={() =>
                handleLink(item.content, item.projectDto.projectId)
              }
              key={item.alarmId}
              className={styles.item}
            >
              <div className={styles.top}>
                <p className={styles.alarmBadge}>{ALARM_BADGE[item.content]}</p>
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => handleDeleteAlarm(e, item.alarmId)}
                >
                  <IoMdClose />
                </button>
              </div>
              <p className={styles.content}>
                <span className={styles.bold}>
                  {item.content === 'EXIT_VOTE' ||
                  item.content === 'VOTE_RESULT_EXIT_SUCCESS' ||
                  item.content === 'VOTE_RESULT_EXIT_FAIL' ||
                  item.content === 'FAVORITE_USER' ||
                  item.content === 'RECOMMEND'
                    ? item.userDto?.nickName
                    : item.projectDto.projectName}
                </span>
                <span className={styles.text}>
                  {ALARM_CONTENT[item.content]}
                </span>
              </p>
              <p className={styles.time}>
                {formatDatetoYYYYMMDDHHMM(item.createDate)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Alarm
