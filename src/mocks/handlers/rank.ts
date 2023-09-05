import { RankDataType } from '@/types/rank/rankDataType'
import { rest } from 'msw'

export const rankHandler = rest.get('/api/ranks', (req, res, ctx) => {
  const pageParam = req.url.searchParams.get('page')
  const pageSize = 24
  const startIndex = pageParam ? parseInt(pageParam) * pageSize : 0
  const endIndex = startIndex + pageSize

  const generateRankData = () => {
    const rankData = []
    for (let i = 1; i <= 100; i++) {
      rankData.push({
        userId: i,
        nickname: '야호',
        profileImage: null,
        rankPoint: 10 + i * 10,
      })
    }
    return rankData
  }

  const ranks: RankDataType[] = generateRankData()

  const pageRanks = ranks.slice(startIndex, endIndex)
  const hasMore = endIndex < ranks.length

  return res(
    ctx.status(200),
    ctx.json({
      ranks: pageRanks,
      hasMore: hasMore,
    }),
  )
})
