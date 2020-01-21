import { Swipe, SwipeItem, Image } from 'vant'

import './style.scss'

export default {
  props: {
    value: { type: Array, default: () => [] }
  },

  methods: {
    genImgStyle (url) {
      return {
        backgroundImage: `url(${url})`
      }
    }
  },

  render() {
    const { value, genImgStyle } = this

    return (<Swipe show-indicators={false} autoplay={3000} loop>
      {
        value.map(item => {
          return (
            <SwipeItem>
              <div class='home-swipe-item'>
                <div class='banner-image' style={genImgStyle(item.cover)}>
                  <div class='pic-name'>
                    <Image height='50' width='50' src={item.miscellany.icon} round />
                    <span>{ item.title }</span>
                  </div>
                </div>
                <div class='subtitle'>{ item.subtitle }</div>
              </div>
            </SwipeItem>
          )
        })
      }
    </Swipe>)
  }
}