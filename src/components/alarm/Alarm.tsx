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
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { loginUserInfo } from '@/recoil/loginUserInfo'
import useSSE from '@/hooks/queries/useSSE'
import { ALARM_BADGE, ALARM_CONTENT } from '@/constants/alarm'

const Alarm = ({
  isOpenAlarm,
  handleToggleAlarm,
}: {
  isOpenAlarm: boolean
  handleToggleAlarm: () => void
}) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const loginUser = useRecoilValue(loginUserInfo)
  const userId = loginUser.userId
  const { startSSE } = useSSE()

  useEffect(() => {
    if (userId) {
      const cleanupSSE = startSSE(userId)

      return () => {
        cleanupSSE()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const [deletedAlarm, setDeletedAlarm] = useState<number | null>(null)

  const { data, error, isLoading, refetch } = useQuery(
    REACT_QUERY_KEY.alarm,
    () => fetchAccessData('/users/alarms'),
    {
      staleTime: 1000 * 30,
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
        setDeletedAlarm(deletedAlarmId)
        return { previousData }
      },
      onSuccess: () => {
        queryClient.invalidateQueries([REACT_QUERY_KEY.alarm, router.asPath])
      },
    },
  )

  const filteredData = data?.filter((item: Alarm) => {
    refetch()
    return item.alarmId !== deletedAlarm
  })

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
    if (!(content === 'DELETE_PROJECT')) {
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
          <div
            className={`${styles.container} ${styles.null}`}
            onClick={(e) => e.stopPropagation()}
          >
            아직 온 알림이 없어요.
          </div>
        )}
      </>
    )
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
          {filteredData.map((item: Alarm) => (
            <div
              onClick={() => handleLink(item.content, item.projectId)}
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
                  item.content === 'FAVORITE_USER'
                    ? item.userDto?.nickName
                    : item.projectName}
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
