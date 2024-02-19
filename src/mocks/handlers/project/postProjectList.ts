import { HttpResponse, http } from 'msw'
import { projectData } from 'public/mockData/project/projectData'

export const postProjectList = http.post(
  '/api/projects/list',
  ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')

    const startIndex = Number(page) * Number(size)
    const endIndex = startIndex + Number(size)
    const slicedData = projectData.slice(startIndex, endIndex)

    const data = {
      content: slicedData,
    }

    return HttpResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
)
