import ure from 'ure'
import { Image, Icon } from 'vant'

import './style.scss'

export default {
  props: {
    value: { type: Object, default: () => {} }
  },

  computed: {
    list () {
      return ure.getValue(this.value, 'v_niche.0.v_card') || []
    }
  },

  render () {
    const { value, list } = this

    return (
      <div class='home-songsheet'>
        <h3>{ value.title_template }</h3>
        <div class='sheet-card-wrapper'>
        {
          list.map(sheet => {
            return (
              <div class='sheet-card' key={sheet.id}>
                <div class='img-wrapper'>
                  <Image src={sheet.cover} width={'100%'} height={'100%'} />
                </div>
                <div class='play-count'>
                  <Icon name='play-circle-o' />
                  { this.$_playCount(sheet.cnt) }
                </div>
                <div class='title'>{ sheet.title }</div>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}