export const setPagination = (page: number, key: string) => {
  sessionStorage.setItem(key, JSON.stringify(page))
}

export const getPagination = (key: string) => {
  const savePage = sessionStorage.getItem(key)
  if (savePage) {
    return JSON.parse(savePage)
  }
  return 1
}
