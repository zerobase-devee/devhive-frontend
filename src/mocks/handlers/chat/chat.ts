import { HttpResponse, http } from 'msw'

export const chat = http.get('/api/chat/room', () => {
  return HttpResponse.json([], {
    status: 200,
  })
})
