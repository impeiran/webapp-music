import feedback from '@/utils/feedback'
import { getRankList } from '@/service/rank'
import { Icon } from 'vant'

import './style.scss'

export default {

  data () {
    return {
      list: []
    }
  },

  mounted () {
    getRankList().then(res => {
      this.list = res
    }).catch(() => feedback._errAlert('获取排行榜列表失败'))
  },

  render () {
    return (
      <section class='rank-page'>
      {
        this.list.map(item => {
          return (
            <div class='rank-item'>
              <div class='img-wrapper'>
                <h5 class='title'>{ item.updateTips }</h5>
                <img src={item.frontPicUrl} alt={item.titleShare} />
                <div class='play-count'>
                  <Icon name='play-circle-o' />
                  { this.$_playCount(item.listenNum) }
                </div>
              </div>

              <div class='content-wrapper'>
                <h4>{ item.title }</h4>
                <ul>
                  {
                    (item.song || []).map(song => {
                      return (
                        <li>
                          <strong>{ song.rank }.</strong>
                          { `${song.title} - ${song.singerName}` }
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          )
        })
      }
      </section>
    )
  }
}