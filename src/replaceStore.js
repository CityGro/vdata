export default (store) => {
  return {
    created () {
      console.log('[@citygro/vdata] replaceStore', store)
    },
    computed: {
      '$store' () {
        return store
      }
    }
  }
}
