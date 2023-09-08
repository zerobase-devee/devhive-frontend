import styles from './rankList.module.css'
import RankCard from '../card/RankCard'
import { useInfiniteQuery } from 'react-query'
import { useEffect, useRef } from 'react'
import { RankDataType } from '@/types/rank/rankDataType'
import Loading from '@/components/common/loading/Loading'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { getRanks } from '@/apis/rank/rank'

const RankList = () => {
  const bottom = useRef<HTMLDivElement>(null)
  const PAGE_SIZE = 20

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    REACT_QUERY_KEY.rank,
    ({ pageParam }) => getRanks(pageParam, PAGE_SIZE),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === PAGE_SIZE) {
          return allPages.length
        }
        return null
      },
    },
  )

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })

    if (bottom.current) {
      observer.observe(bottom.current)
    }

    return () => observer.disconnect()
  }, [hasNextPage, fetchNextPage])

  if (!data) {
    return <Loading />
  }

  if (error) {
    return <p>Error: 에러발생</p>
  }
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {status === 'error' && <p>에러가 발생했어요.</p>}
        {status === 'success' &&
          data.pages.map((page) =>
            page.map((item: RankDataType) => (
              <RankCard
                rank={item.rank}
                userId={item.userId}
                key={item.userId}
                profileImage={item.profileImage}
                rankPoint={item.rankPoint}
                nickName={item.nickName}
              />
            )),
          )}
      </div>
      {isFetchingNextPage && <Loading />}
      {hasNextPage && <div ref={bottom} />}
    </div>
  )
}

export default RankList
