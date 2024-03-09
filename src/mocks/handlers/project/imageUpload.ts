import { http, HttpResponse } from 'msw'

export const imageUploadHandler = http.post('/api/projects/image', () => {
  const imageUrl = 'http://via.placeholder.com/640x480'

  return new HttpResponse(imageUrl, { status: 200 })
})
