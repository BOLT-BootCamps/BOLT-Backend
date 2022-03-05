const express = require('express')
const router = express.Router()
const { userDB } = require('../services/database')
require('dotenv').config()

router.post('/addUser', async (req, res, next) => {
  console.log(req.get('host'))

  const sFirstName = req.body.sFirstName || ''
  const sLastName = req.body.sLastName || ''
  const sEmail = req.body.sEmail
  const auth = req.body.auth

  if (auth !== process.env.AUTH0_VERIFICATION) {
    res.status(400).json({
      message: 'Invalid.'
    })
  }

  try {
    await userDB.addUser({ sFirstName, sLastName, sEmail })
  } catch (e) {
    res.status(500).json({
      message: e.message
    })
  }

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
  let user
  try {
    user = await userDB.userExists(email)
  } catch (e) {
    res.status(500).json({
      message: e.message
    })
  }
  if (user) {
    res.status(200).send()
    console.log('User does exist')
  } else {
    res.status(201).send()
    console.log('User does not exist')
  }
})

module.exports = router
