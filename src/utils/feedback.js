import { Dialog, Notify } from 'vant'

const handleMsg = msg => {
  try {
    msg && typeof msg === 'object' ? JSON.stringify(msg) : msg
  } catch (error) {}
  return msg
}

const feedback = {
  /**
   * 错误弹窗
   * @param {Object || String} msg 
   */
  _errAlert (msg) {
    Dialog({
      message: handleMsg(msg),
      confirmButtonColor: 'red'
    })
  },

  /**
   * 成功弹窗
   * @param {Object || String} msg 
   */
  _successAlert (msg) {
    Dialog({
      message: handleMsg(msg),
      confirmButtonColor: 'red'
    })
  },

  /**
   * 失败通知
   * @param {Object || String} msg 
   */
  _errNotice (msg) {
    Notify({
      type: 'danger',
      message: handleMsg(msg)
    })
  },

  /**
   * 成功通知
   * @param {Object || String} msg 
   */
  _successNotice (msg) {
    Notify({
      type: 'success',
      message: handleMsg(msg)
    })
  }
}

export const feedbackMixin = { methods: feedback }

export default feedback
