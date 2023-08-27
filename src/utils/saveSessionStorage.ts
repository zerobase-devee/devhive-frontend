export const setSessionStorage = (data: any, key: string) => {
  sessionStorage.setItem(key, JSON.stringify(data))
}

export const getSessionStorage = (key: string) => {
  const getData = sessionStorage.getItem(key)
  if (!getData) {
    return
  } else {
    return JSON.parse(getData)
  }
}
