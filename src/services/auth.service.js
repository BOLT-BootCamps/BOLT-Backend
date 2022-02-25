const isRole = (decoded, role) => {
  return decoded['https://apibolt.zhehaizhang.com/roles'].includes(role)
}

module.exports = {
  isRole
}
