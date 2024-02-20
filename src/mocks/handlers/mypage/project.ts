import { HttpResponse, http } from 'msw'

export const getWProjectList = http.get('/api/users/project/write', () => {
  const data = {
    content: [],
    totalElements: 0,
  }

  return HttpResponse.json(data, { status: 200 })
})

export const getPProjectList = http.get(
  '/api/users/project/participation',
  () => {
    const data = {
      content: [
        {
          projectId: 2,
          name: 'two project',
          status: 'COMPLETE',
        },
      ],
      totalElements: 1,
    }

    return HttpResponse.json(data, { status: 200 })
  },
)

export const getMyProject = http.get('/api/users/project/:projectId', () => {
  const data = {
    userId: 99,
    leader: false,
    projectId: 2,
    name: 'two project',
    status: 'COMPLETE',
    deadline: '2024-01-01T00:00:00',
    startDate: '2024-01-09T00:00:00',
    endDate: '2024-02-01T00:00:00',
    totalAverageScore: 9,
    projectMembers: [
      {
        userId: 99,
        nickName: '색다른개발자',
        profileImage: null,
        review: false,
      },
      {
        userId: 0,
        nickName: '개발자',
        profileImage: null,
        review: false,
      },
      {
        userId: 1,
        nickName: '또다른개발자',
        profileImage: null,
        review: true,
      },
    ],
  }

  return HttpResponse.json(data, { status: 200 })
})

export const getVoteData = http.get('/api/projects/:projectId/vote', () => {
  return HttpResponse.json([], { status: 200 })
})

export const postReview = http.post(
  '/api/projects/:projectId/review/:targetId',
  () => {
    return HttpResponse.json([], { status: 200 })
  },
)
