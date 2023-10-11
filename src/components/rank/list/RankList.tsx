import styles from './rankList.module.css'
import RankCard from '../card/RankCard'
import { useInfiniteQuery } from 'react-query'
import { useEffect, useRef } from 'react'
import { RankDataType } from '@/types/rank/rankDataType'
import Loading from '@/components/common/loading/Loading'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { getRanks } from '@/apis/rank/rank'
import ErrorComponent from '@/components/common/error/ErrorComponent'
import SkeletonCard from '@/components/common/loading/SkeletonCard'

const RankList = () => {
  const bottom = useRef<HTMLDivElement>(null)
  const PAGE_SIZE = 20

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
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

  if (isError || data === undefined) {
    return (
      <div className={styles.container}>
        <ErrorComponent />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {isLoading ? (
          <>
            {new Array(PAGE_SIZE).fill(0).map((_, index) => (
              <SkeletonCard key={`Rank${index}`} />
            ))}
          </>
        ) : (
          data.pages.map(
            (page, pageIndex) =>
              page?.content.map((item: RankDataType, index: number) => (
                <RankCard
                  userBadges={item.userBadges}
                  rank={index + PAGE_SIZE * pageIndex}
                  userId={item.userId}
                  key={item.userId}
                  profileImage={item.profileImage}
                  rankPoint={item.rankPoint}
                  nickName={item.nickName}
                />
              )),
          )
        )}
      </div>
      {isFetchingNextPage && <Loading />}
      {hasNextPage && <div ref={bottom} />}
    </div>
  )
}

export default RankList
