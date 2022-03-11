require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
})

function getKey (header, callback) {
  client.getSigningKey(header.kid, function (error, key) {
    const signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
    if (error) {
      console.log(error)
    }
  })
}

async function checkToken (token) {
  const tokenArr = token.split(' ')
  if (tokenArr.length === 2) {
    token = tokenArr[1]
  }
  if (process.env.LEVEL === 'development') {
    return {
      error: null,
      decoded: {
        'https://apibolt.zhehaizhang.com/roles': 'Admin',
        'https://apibolt.zhehaizhang.com/email': 'thomas.e.villeneuve@gmail.com'
      }
    }
  }

  if (token) {
    const result = new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getKey,
        {
          audience: process.env.API_IDENTIFIER,
          issuer: `https://${process.env.AUTH0_DOMAIN}/`,
          algorithms: ['RS256']
        },
        (error, decoded) => {
          if (error) {
            resolve({ error })
          }
          if (decoded) {
            resolve({ decoded })
          }
        }
      )
    })

    return result
  }

  return { error: 'No token provided' }
}

module.exports = checkToken
