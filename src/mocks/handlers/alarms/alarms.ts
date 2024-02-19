import { HttpResponse, http } from 'msw'

export const alarms = http.get('/api/users/alarms', () => {
  return HttpResponse.json([], { status: 200 })
})
