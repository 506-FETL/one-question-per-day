/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
export default async function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  try {
    return await fetcher()
  }
  catch (e) {
    if (maximumRetryCount === 0) {
      throw e
    }
    else {
      return fetchWithAutoRetry(fetcher, maximumRetryCount - 1)
    }
  }
}
