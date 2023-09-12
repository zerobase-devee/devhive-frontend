import { axiosAccessFn } from '..'

const axiosAccess = axiosAccessFn()

export const getFavoriteUser = async (page: number, size: number) => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: `/favorite`,
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

export const postFavoriteUser = async (userId: number | string) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: `/favorite/users/${userId}`,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const deleteFavoriteUser = async (favoriteId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `/favorite/${favoriteId}`,
    })
    return res
  } catch (error) {
    throw error
  }
}
