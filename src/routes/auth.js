const express = require('express')
const router = express.Router()
const { userDB } = require('../services/database')
require('dotenv').config()

router.post('/addUser', async (req, res, next) => {
  console.log(req.get('host'))

  const firstname = req.body.firstname || ''
  const lastname = req.body.lastname || ''
  const username = req.body.username || req.body.email
  const email = req.body.email
  const auth = req.body.auth

  if (auth !== process.env.AUTH0_VERIFICATION) {
    res.status(400).json({
      message: 'Invalid.'
    })
  }

  await userDB.addUser({ firstname, lastname, username, email })

  res.status(200).send()
})

router.post('/emailExists', async (req, res, next) => {
  const email = req.body.email
  const auth = req.body.auth

  if (auth !== process.env.AUTH0_VERIFICATION) {
    console.log('not authenticated')
    res.status(400).json({
      message: 'Invalid.'
    })
  }
  console.log(email)
  const user = await userDB.userExists(email)

  if (user) {
    res.status(200).send()
    console.log('User does exist')
  } else {
    res.status(201).send()
    console.log('User does not exist')
  }
})

module.exports = router
