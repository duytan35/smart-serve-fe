const url =
  process.env.NEXT_PUBLIC_API_URL || 'http://34.126.68.84:5000/api/v1';

async function fetchApi(endpoint, options = {}) {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50SWQiOiIwYWJiMDkzOS03Y2U3LTQxNTktYTc2YS1hYTVjYTFhNTFmNzAiLCJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiZXhwIjoxNzMwMTg1NDU0fQ._dDmtg8rJd9hKXG5Mhbr4gWcjOQnnmiHi2tY53jU_28';

  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Similar to `withCredentials: true` in Axios
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${url}${endpoint}`, config);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
}

export default fetchApi;
