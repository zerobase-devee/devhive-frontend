import { axiosBasic } from '..'

export const getRanks = async (pageParam = 0, pageSize: number) => {
  try {
    const res = await axiosBasic.get(`/rank/users`, {
      params: {
        page: pageParam,
        size: pageSize,
      },
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}
