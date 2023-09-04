import styles from './rankList.module.css'
import RankCard from '../card/RankCard'
import axios from 'axios'
import { useInfiniteQuery } from 'react-query'
import { useEffect, useRef } from 'react'
import { RankDataType } from '@/types/rank/rankDataType'
import Loading from '@/components/common/loading/Loading'

const RankList = () => {
  const bottom = useRef<HTMLDivElement>(null)
  const PAGE_SIZE = 6

  const fetchRanks = async ({ pageParam = 0 }) => {
    try {
      const res = await axios.get(`/api/ranks?page=${pageParam}`)
      const ranks = res.data.ranks
      const hasMore = res.data.hasMore
      return {
        ranks: ranks,
        hasMore: hasMore,
        page: pageParam,
      }
    } catch (err) {
      console.log(err)
    }
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery('rankList', fetchRanks, {
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.hasMore) {
          return lastPage.page + 1
        }
        return undefined
      },
    })

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

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {status === 'loading' && <p>로딩중이에요.</p>}
        {status === 'error' && <p>에러가 발생했어요.</p>}
        {status === 'success' &&
          data &&
          data.pages.map(
            (page, pageIndex) =>
              page &&
              page.ranks.map((item: RankDataType, index: number) => (
                <RankCard
                  rank={index + PAGE_SIZE * pageIndex}
                  userId={item.userId}
                  key={item.userId}
                  profileImage={item.profileImage}
                  rankPoint={item.rankPoint}
                  nickname={item.nickname}
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
