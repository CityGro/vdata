import checksum from './checksum'

const makeRequestKey = (url, options) => {
  const headers = Object.entries(options.headers || {}).map(([key, val]) => `${key}:${val}`)
  return `${options.method}-${checksum(headers, url)}`
}

export default makeRequestKey
