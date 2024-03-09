import { HttpResponse, http } from 'msw'
import { commentMockData } from 'public/mockData/comment/commentData'
import {
  projectDetialData,
  projectDetialLoginData,
} from 'public/mockData/project/projectDetail'

export const getProject = http.get('/api/projects/:projectId', () => {
  const storedData = localStorage.getItem('loginState')
  const isLogin = storedData
    ? JSON.parse(storedData).loginState === true
    : false

  const data = isLogin ? projectDetialLoginData : projectDetialData

  return HttpResponse.json(data, { status: 200 })
})

export const getComment = http.get('/api/comments/projects/:projectId', () => {
  const data = commentMockData

  return HttpResponse.json(data, { status: 200 })
})
