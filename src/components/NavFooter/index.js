import { Tabbar, TabbarItem } from 'vant'

export default {
  components: {
    Tabbar, TabbarItem
  },

  data () {
    return {
      activeNav: 'home',
      navList: [
        { title: '首页', name: 'home', icon: 'wap-home-o', to: '/home' },
        { title: '排行榜', name: 'rank', icon: 'chart-trending-o', to: '/rank' },
        { title: '歌手', name: 'singer', icon: 'friends-o', to: '/singer/list' }
      ]
    }
  },

  render() {
    const { navList } = this

    return (
      <Tabbar vModel={this.activeNav} route>
      {
        navList.map(nav => {
          return (
            <TabbarItem
              name={nav.name}
              icon={nav.icon}
              to={nav.to}
            >{ nav.title }</TabbarItem>
          )
        })
      }
      </Tabbar>
    )
  }
}
