import { Swipe, SwipeItem, Image } from 'vant'

import './style.scss'

export default {
  props: {
    title: { type: String, default: '' },
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
    const { title, value, genImgStyle } = this

    return (
      <div class='home-swiper'>
        <h3>{ title }</h3>
        <Swipe width={250} show-indicators={false} autoplay={3000} loop>
          {
            value.map(item => {
              return (
                <SwipeItem key={item.id}>
                  <div class='home-swipe-item'>
                    <div class='banner-image' style={genImgStyle(item.cover)}>
                      <div class='pic-name'>
                        <Image height='30' width='30' src={item.miscellany.icon} round />
                        <span>{ item.title }</span>
                      </div>
                    </div>
                    <div class='subtitle'>{ item.subtitle }</div>
                  </div>
                </SwipeItem>
              )
            })
          }
        </Swipe>
      </div>
    )
  }
}