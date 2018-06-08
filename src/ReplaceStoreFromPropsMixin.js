import {getStoreById} from './registry'

export default {
  mounted () {
    console.log('[@citygro/vdata] replace store from props', this.$store)
  },
  props: {
    vdataStoreId: {
      type: String,
      required: true
    }
  },
  computed: {
    '$store': {
      get () {
        return getStoreById(this.vdataStoreId)
      }
    }
  }
}
