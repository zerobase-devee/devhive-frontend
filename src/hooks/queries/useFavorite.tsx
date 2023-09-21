import {
  deleteFavoriteProject,
  postFavoriteProject,
} from '@/apis/mypage/favoriteProject'
import {
  deleteFavoriteUser,
  postFavoriteUser,
} from '@/apis/mypage/favoriteUser'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import {
  deleteFavoriteProjectIdState,
  deleteFavoriteUserIdState,
} from '@/recoil/deleteBookmarkId'
import { FavoriteProject, FavoriteUser } from '@/types/users/favoriteDataType'
import { useMutation, useQueryClient } from 'react-query'
import { useSetRecoilState } from 'recoil'

const useFavorite = () => {
  const queryClient = useQueryClient()
  const setDeleteFavoriteUserIds = useSetRecoilState(deleteFavoriteUserIdState)
  const setDeleteFavoriteProjectIds = useSetRecoilState(
    deleteFavoriteProjectIdState,
  )

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
          '관심유저',
        ])
        const updatedData = (prevData || []).filter(
          (item: FavoriteUser) => item.favoriteId !== index,
        )
        queryClient.setQueryData(
          [REACT_QUERY_KEY.favoriteUser, '관심유저'],
          updatedData,
        )
        return { prevData, deletedFavoriteId: index }
      },
      onError: (_err, _variables, context) => {
        if (context?.prevData) {
          queryClient.setQueryData(
            [REACT_QUERY_KEY.favoriteUser, '관심유저'],
            context.prevData,
          )
        }
      },
      onSuccess: async (_data, _variables, context) => {
        const deletedFavoriteId = context?.deletedFavoriteId

        if (deletedFavoriteId !== undefined) {
          setDeleteFavoriteUserIds(deletedFavoriteId)
        }

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
        queryClient.invalidateQueries(REACT_QUERY_KEY.mainProject)
      },
    },
  )

  const deleteFavoriteProjectMutation = useMutation(
    (bookmarkId: number) => deleteFavoriteProject(bookmarkId),
    {
      onMutate: (index: number) => {
        const prevData = queryClient.getQueryData<FavoriteProject[]>([
          REACT_QUERY_KEY.favoriteProject,
          '관심프로젝트',
        ])
        const updatedData = (prevData || []).filter(
          (item: FavoriteProject) => item.bookmarkId !== index,
        )
        queryClient.setQueryData(
          [REACT_QUERY_KEY.favoriteProject, '관심프로젝트'],
          updatedData,
        )
        return { prevData, deletedFavoriteId: index }
      },
      onError: (_err, _variables, context) => {
        if (context?.prevData) {
          queryClient.setQueryData(
            REACT_QUERY_KEY.favoriteProject,
            context.prevData,
          )
        }
      },
      onSuccess: async (_data, _variables, context) => {
        const deletedFavoriteId = context?.deletedFavoriteId

        if (deletedFavoriteId !== undefined) {
          setDeleteFavoriteProjectIds(deletedFavoriteId)
        }

        await queryClient.invalidateQueries(REACT_QUERY_KEY.favoriteProject)
        await queryClient.invalidateQueries(REACT_QUERY_KEY.projectDetail)
        await queryClient.invalidateQueries(REACT_QUERY_KEY.projectList)
        await queryClient.invalidateQueries(REACT_QUERY_KEY.mainProject)
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
