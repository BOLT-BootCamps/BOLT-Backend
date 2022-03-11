const express = require('express')
const router = express.Router()
const { userDB } = require('../services/database')
require('dotenv').config()

router.post('/addUser', async (req, res, next) => {
  const sFirstName = req.body.sFirstName || ''
  const sLastName = req.body.sLastName || ''
  const sSchool = req.body.sSchool || ''
  const sProgram = req.body.sProgram || ''
  const sYearOfStudy = req.body.sYearOfStudy || ''
  const sEmail = req.body.sEmail
  const auth = req.body.auth

  if (auth !== process.env.AUTH0_VERIFICATION) {
    res.status(400).json({
      message: 'Invalid.'
    })
  }

  try {
    const user = await userDB.userExists(sEmail)
    if (user > 0) {
      return res.status(500).json({
        message: 'User exists'
      })
    }
    await userDB.addUser({ sFirstName, sLastName, sEmail, sSchool, sProgram, sYearOfStudy })
  } catch (e) {
    return res.status(500).json({
      message: e.message
    })
  }

  return res.status(200).send()
})

router.post('/emailExists', async (req, res, next) => {
  const email = req.body.sEmail
  const auth = req.body.auth

  if (auth !== process.env.AUTH0_VERIFICATION) {
    return res.status(400).json({
      message: 'Invalid.'
    })
  }
  let user
  try {
    user = await userDB.userExists(email)
  } catch (e) {
    return res.status(500).json({
      message: e.message
    })
  }
  if (user > 0) {
    return res.status(200).json({
      message: 'User does exist'
    })
  } else {
    return res.status(201).json({
      message: 'User does not exist'
    })
  }
})

module.exports = router
