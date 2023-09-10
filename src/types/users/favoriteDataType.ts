export interface FavoriteUser {
  readonly favoriteId: number | null
  readonly userId: number
  readonly nickName: string
  readonly profileImage: string
}

export interface FavoriteProject {
  readonly bookmarkId: number | null
  readonly projectId: number
  readonly title: string
}
