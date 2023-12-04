export type Query = Record<string, unknown>

export const withQuery = (url: string, query: Query = {}) => {
  const queryString = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  if (!queryString) {
    return url
  }

  return `${url}?${queryString}`
}
