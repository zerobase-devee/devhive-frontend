import { HttpResponse, http } from 'msw'
import techStackImg1 from '/public/images/techStack/javascript.png'
import techStackImg2 from '/public/images/techStack/React.png'
import techStackImg3 from '/public/images/techStack/typescript.png'

export const getTechStack = http.get('/api/admin/tech-stacks', () => {
  const data = [
    {
      id: 0,
      image: techStackImg1,
      name: 'Javascript',
    },
    {
      id: 1,
      image: techStackImg2,
      name: 'React',
    },
    {
      id: 2,
      image: techStackImg3,
      name: 'Typescript',
    },
  ]

  return HttpResponse.json(data, { status: 200 })
})
