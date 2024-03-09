import { HttpResponse, http } from 'msw'
import { rankData } from 'public/mockData/rank/rank'

export const getRankList = http.get('/api/rank/users', ({ request }) => {
  const url = new URL(request.url)

  const page = url.searchParams.get('page')
  const size = url.searchParams.get('size')

  const startIndex = Number(page) * Number(size)
  const endIndex = startIndex + Number(size)
  const slicedData = rankData.slice(startIndex, endIndex)

  const data = {
    content: slicedData,
  }

  return HttpResponse.json(data, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
})
