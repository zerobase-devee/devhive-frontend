import {
  deleteFavoriteProject,
  postFavoriteProject,
} from '@/apis/mypage/favoriteProject'
import {
  deleteFavoriteUser,
  postFavoriteUser,
} from '@/apis/mypage/favoriteUser'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { FavoriteProject, FavoriteUser } from '@/types/users/favoriteDataType'
import { useMutation, useQueryClient } from 'react-query'

const useFavorite = () => {
  const queryClient = useQueryClient()

  const addFavoriteUserMutation = useMutation(
    (userId: number | string) => {
      return postFavoriteUser(userId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.favoriteUser)
        queryClient.invalidateQueries(REACT_QUERY_KEY.profile)
      },
    },
  )

  const deleteFavoriteUserMutation = useMutation(
    (favoriteId: number) => deleteFavoriteUser(favoriteId),
    {
      onMutate: (index: number) => {
        const prevData = queryClient.getQueryData<FavoriteUser[]>([
          REACT_QUERY_KEY.favoriteUser,
          index,
        ])
        queryClient.setQueryData(
          [REACT_QUERY_KEY.favoriteUser, index],
          (prevData) => {
            return (
              (prevData as FavoriteUser[])?.filter(
                (item: FavoriteUser) => item.favoriteId !== null,
              ) || []
            )
          },
        )
        return { prevData }
      },
      onError: (_err, _variables, context) => {
        if (context?.prevData) {
          queryClient.setQueryData(
            REACT_QUERY_KEY.favoriteUser,
            context.prevData,
          )
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(REACT_QUERY_KEY.favoriteUser)
        await queryClient.invalidateQueries(REACT_QUERY_KEY.profile)
      },
    },
  )

  const addFavoriteProjectMutation = useMutation(
    (projectId: number) => {
      return postFavoriteProject(projectId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.favoriteProject)
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectDetail)
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectList)
      },
    },
  )

  const deleteFavoriteProjectMutation = useMutation(
    (bookmarkId: number) => deleteFavoriteProject(bookmarkId),
    {
      onMutate: (index: number) => {
        const prevData = queryClient.getQueryData<FavoriteProject[]>([
          REACT_QUERY_KEY.favoriteProject,
          index,
        ])
        queryClient.setQueryData(
          [REACT_QUERY_KEY.favoriteProject, index],
          (prevData) => {
            return (
              (prevData as FavoriteProject[])?.filter(
                (item: FavoriteProject) => item.bookmarkId !== null,
              ) || []
            )
          },
        )
        return { prevData }
      },
      onError: (_err, _variables, context) => {
        if (context?.prevData) {
          queryClient.setQueryData(
            REACT_QUERY_KEY.favoriteProject,
            context.prevData,
          )
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(REACT_QUERY_KEY.favoriteProject)
        await queryClient.invalidateQueries(REACT_QUERY_KEY.projectDetail)
        await queryClient.invalidateQueries(REACT_QUERY_KEY.projectList)
      },
    },
  )

  return {
    addFavoriteUserMutation,
    deleteFavoriteUserMutation,
    addFavoriteProjectMutation,
    deleteFavoriteProjectMutation,
  }
}

export default useFavorite
