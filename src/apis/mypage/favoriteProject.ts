import { axiosAccessFn } from '..'

const axiosAccess = axiosAccessFn()

export const getFavoriteProject = async (page: number, size: number) => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: `/bookmark`,
      params: {
        page: page,
        size: size,
      },
    })

    return res.data
  } catch (error) {
    throw error
  }
}

export const postFavoriteProject = async (projectId: number) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: `/bookmark/projects/${projectId}`,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const deleteFavoriteProject = async (bookmarkId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `/bookmark/${bookmarkId}`,
    })
    return res
  } catch (error) {
    throw error
  }
}
