export default (o, key, fallback) => {
  const value = o[key]
  delete o[key]
  return (value === undefined)
    ? fallback
    : value
}
