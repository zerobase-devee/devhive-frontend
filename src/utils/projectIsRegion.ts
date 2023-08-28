export const isRegion = (region: string | null) => {
  if (region === null) {
    return
  } else {
    return '・' + region
  }
}
