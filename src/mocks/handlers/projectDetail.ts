import { rest } from 'msw'
import { projectDetailData } from 'public/data/projectDetailData'

const ProjectDetail = rest.get('/api/projects/:projectId', (req, res, ctx) => {
  const { projectId } = req.params

  const projectData = projectDetailData

  return res(ctx.status(200), ctx.json(projectData))
})

export default ProjectDetail
