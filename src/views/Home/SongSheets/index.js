import { Image } from 'vant'

export default {
  props: {
    value: { type: Object, default: () => {} }
  },

  components: {
    Image
  },

  render () {
    const { value } = this

    return (
      <div class='home-songsheet'>
        <h2>{ value.title_template }</h2>
      </div>
    )
  }
}