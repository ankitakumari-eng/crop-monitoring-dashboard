// Mock API service - کوئی real API call नहीं!
// Backend ready होने पर यह file update होगी

const mockApi = {
  get: async (url) => {
    console.log(`Mock GET: ${url}`)
    return { data: {} }
  },
  post: async (url, data) => {
    console.log(`Mock POST: ${url}`, data)
    return { data: {} }
  }
}

export default mockApi