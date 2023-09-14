import { axiosAccessFn } from '..'

const axiosAccess = axiosAccessFn()

export const getChatRoom = async () => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: '/chat/room',
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const postCreateChatRoom = async (projectId: number, title: string) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: `/chat/room/${projectId}`,
      data: { title: title },
    })

    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const postEnterChatRoom = async (roomId: number) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: `/chat/${roomId}`,
    })

    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteOutChatRoom = async (roomId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `/chat/${roomId}`,
    })

    return res.data
  } catch (error) {
    console.error(error)
  }
}
