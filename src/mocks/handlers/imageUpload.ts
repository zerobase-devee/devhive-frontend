import { rest } from 'msw'

export const imageUploadHandler = rest.post(
  '/api/projects/image',
  (req, res, ctx) => {
    const imageUrl = 'http://via.placeholder.com/640x480'

    return res(
      ctx.status(200),
      ctx.json({
        url: imageUrl,
      }),
    )
  },
)
