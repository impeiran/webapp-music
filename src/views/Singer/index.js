import { getSingerTags, getSingerList } from '@/service/singer'
import { Sidebar, SidebarItem, List, Cell, DropdownMenu, DropdownItem } from 'vant'

import './style.scss'

export default {
  name: 'singerList',

  data () {
    return {
      tagList: {},
      option: {
        index: -100,
        area: -100,
        genre: -100
      },

      sideBarTitle: '',

      singerList: [],
      curPage: 1,
      curSize: 80,
      hasCompleted: false,
      loadingList: false,
      loadingError: false
    }
  },

  computed: {
    indexList () {
      return this.tagList['index'] || []
    },

    areaList () {
      return (this.tagList['area'] || []).map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
    },

    genreList () {
      return (this.tagList['genre'] || []).map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
    }
  },

  methods: {
    initData () {
      getSingerTags().then(res => {
        this.tagList = res || {}
        this.$nextTick(() => {
          this.getList()
        })
      })
    },

    changeSideBar (index) {
      this.option.index = this.indexList[index].id
      this.reload()
    },

    changeArea (id) {
      this.option.area = id
      this.reload()
    },

    changeGenre (id) {
      this.option.genre = id
      this.reload()
    },

    reload () {
      this.singerList = []
      this.hasCompleted = false
      this.curPage = 1
      this.getList()
    },

    getList () {
      this.loadingList = true
      getSingerList({
        ...this.option,
        cur_page: this.curPage
      }).then(res => {
        this.hasCompleted = res.total < (this.curPage * this.curSize)
        this.singerList = this.singerList.concat(res.singerList)
        this.curPage++
      }).catch(() => {
        this.loadingError = true
      }).finally(() => {
        this.loadingList = false
      })
    }
  },
  
  mounted() {
    this.initData()
  },

  render () {
    return (
      <section class='singer-list-page'>
        <Sidebar vModel={this.sideBarTitle} onChange={this.changeSideBar} class='van-hairline--right'>
        {
          this.indexList.map(item => {
            return (
              <SidebarItem title={item.name} />
            )
          })
        }
        </Sidebar>

        <div class='content-container'>
          {/* 筛选框 */}
          <DropdownMenu class='filter-menu'>
            <DropdownItem 
              vModel={this.option.area} 
              options={this.areaList} 
              onChange={this.changeArea}
            />
            <DropdownItem 
              vModel={this.option.genre} 
              options={this.genreList} 
              onChange={this.changeGenre}
            />
          </DropdownMenu>

        {
          !!this.singerList.length && (
            <div class='content'>
              <List vModel={this.loadingList} finished={this.hasCompleted} onLoad={this.getList}>
                {
                  this.singerList.map(item => {
                    return (
                      <Cell
                        key={item.singer_id}
                        title={item.singer_name}
                        is-link
                      />
                    )
                  })
                }
              </List>
            </div>
          )
        }
        </div>

        
      </section>
    )
  }
}