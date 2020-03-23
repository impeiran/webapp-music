const noop = () => {}

const defaultOption = {
  namespace: 'paginationInfo',
  complete: noop,

  initialPage: 1,
  initialPageSize: 20
}

/**
 * 生成分页mixin
 * @description 必须重写[namespace + 'Action']: ():Promise => {}
 * @description 必须重写[namespace + 'Result']: ():void => {}
 * @description 可选择重写 [namespace + 'Error']: ():void => {}
 * @param {Object} option
 * {
 *   namespace: '',
 *   complete: ():Boolean => {},
 *   formatResult: ():Object => {}
 * }
 */
const createPagination = option => {
  Object.assign(option, defaultOption)

  const {
    namespace,
    complete,
    initialPage,
    initialPageSize
  } = option

  return {
    data () {
      return {
        [namespace]: {
          loading: false,
          completed: false,

          page: initialPage,
          pageSize: initialPageSize
        }
      }
    },

    methods: {
      [namespace + 'Load'] () {
        const info = this[namespace]

        if (info.completed) return

        const action = this[namespace + 'Action'] || noop
        const onResult = this[namespace + 'Result'] || noop
        const onError = this[namespace + 'Error']

        info.loading = true

        const { page, pageSize, result} = info
        const ret = action(page, pageSize, result)

        if (ret.then) {
          ret.then(res => {
            info.completed = Boolean(complete(res, page, pageSize))
            info.page = info.page + 1
            onResult(res)
          }).catch(err => {
            info.error = true
            onError && onError(err)
          }).finally(() => {
            info.loading = false
          })
        } else {
          info.loading = false
        }
      },

      [namespace + 'Reset'] (page) {
        const info = this[namespace]
        info.page = page || 1
        info.completed = false
      }
    },
  }
}

export default createPagination
