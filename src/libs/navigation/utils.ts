export type Query = Record<string, string>

export const withQuery = (url: string, query: Query = {}) => {
  const queryString = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return `${url}?${queryString}`
}
