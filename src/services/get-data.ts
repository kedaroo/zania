export const getData = async () => {
  const res = await fetch("/api/v1/data")
  const json = await res.json()
  return json
}