import NavFooter from '../../NavFooter'

import './index.scss'

export default {
  components: {
    NavFooter
  },

  render () {
    return (
      <div class="app-container">
        <router-view></router-view>

        <NavFooter></NavFooter>
      </div>
    )
  }
}
