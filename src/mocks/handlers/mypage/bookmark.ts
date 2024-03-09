import { HttpResponse, http } from 'msw'

export const getBookmark = http.get('/api/bookmark', () => {
  const data = {
    content: [],
    totalElements: 0,
  }

  return HttpResponse.json(data, {
    status: 200,
  })
})

export const getFavorite = http.get('/api/favorite', () => {
  const data = {
    content: [],
    totalElements: 0,
  }

  return HttpResponse.json(data, {
    status: 200,
  })
})
