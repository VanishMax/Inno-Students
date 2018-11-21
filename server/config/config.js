import cfg from './hidden'

const obj = {
  googleClientID: process.env.googleClientId || cfg.googleClientID || '',
  googleClientSecret: process.env.googleClientSecret || cfg.googleClientSecret || '',
  mongoURI: process.env.mongoURI || cfg.mongoURI || '',
  cookieKey: process.env.cookieKey || cfg.cookieKey || ''
}
export default obj