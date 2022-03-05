const isRole = (decoded, role) => {
  return decoded['https://apibolt.zhehaizhang.com/roles'].includes(role)
}

const getEmail = (decoded) => {
  return decoded['https://apibolt.zhehaizhang.com/email']
}

module.exports = {
  isRole,
  getEmail
}
