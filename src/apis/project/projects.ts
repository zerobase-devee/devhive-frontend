import { axiosAccessFn, axiosBasic } from '..'
import { SendProjectDataType } from '@/types/project/projectDataType'

const axiosAccess = axiosAccessFn()

export interface dataProps {
  keyword: string
  development: 'FRONTEND' | 'BACKEND' | 'FULLSTACK' | 'ALL'
  recruitment: 'ONLINE' | 'OFFLINE' | 'ALL'
  techStackIds: never[] | number[]
}

export const postProjectList = async (
  pageParam: number,
  pageSize: number,
  data: dataProps,
  sort: string,
) => {
  try {
    const res = await axiosBasic({
      method: 'post',
      url: `/projects/list`,
      params: {
        page: pageParam,
        size: pageSize,
        sort: sort,
      },
      data: data,
    })

    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const postAccessProjectList = async (
  pageParam: number,
  pageSize: number,
  data: dataProps,
  sort: string,
) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: `/projects/list`,
      params: {
        page: pageParam,
        size: pageSize,
        sort: sort,
      },
      data: data,
    })

    console.log(data)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const postProject = async (formData: SendProjectDataType) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: '/projects',
      data: formData,
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const getimageFileConversion = async (formData: FormData) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: '/projects/image',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return res.data
  } catch (error) {
    throw error
  }
}

export const deleteProject = async (projectId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `projects/${projectId}`,
    })

    return res.data
  } catch (error) {
    throw error
  }
}

export const putProject = async (
  projectId: number,
  formData: SendProjectDataType,
) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `projects/${projectId}`,
      data: formData,
    })

    return res.data
  } catch (error) {
    throw error
  }
}
