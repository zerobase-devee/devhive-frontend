import { http, HttpResponse } from 'msw'

export const loginHandler = http.post(
  '/api/auth/signin',
  async ({ request }) => {
    const data = {
      accessToken: '12341234',
      refreshToken: '1234',
    }

    const result: any = await request.json()

    const email = result?.email
    const password = result?.password

    if (email === 'qwe@qwe.com' && password === 'qwer1234!') {
      return new HttpResponse(JSON.stringify(data), {
        status: 200,
      })
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'authentication_failed',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  },
)
