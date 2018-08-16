import { Base64 } from 'js-base64'

export function gobase64 (str) {
  return Base64.decode(str)
}
