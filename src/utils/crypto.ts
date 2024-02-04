import { SHA256 as sha256 } from 'crypto-js'

export const getHashedPassword = (string: string) => {
  return sha256(string).toString()
}
