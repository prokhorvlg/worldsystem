export const getMaps = async (projectId: string) => {
  const res = await fetch('/maps', {})
  return res.json()
}
