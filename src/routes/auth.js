const express = require('express')
const router = express.Router()
const { db } = require('../database/pgAdaptor')
const { userExists } = require('../services/database')
const { PreparedStatement: PS } = require('pg-promise')
require('dotenv').config()

router.post('/addUser', async (req, res, next) => {
  console.log(req.get('host'))

  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const username = req.body.username
  const email = req.body.email
  const auth = req.body.auth

  if (auth !== process.env.AUTH0_VERIFICATION) {
    res.status(400).json({
      message: 'Invalid.'
    })
  }

  const addUser = new PS({ name: 'add-user', text: 'INSERT INTO users(firstname, lastname, username, email) VALUES($1, $2, $3, $4)' })

  addUser.values = [firstname, lastname, username, email]

  db.none(addUser)
    .catch(error => {
      console.log(error)
    })
})

router.post('/emailExists', async (req, res, next) => {
  console.log(req.get('host'))

  const email = req.body.email
  const auth = req.body.auth

  if (auth !== process.env.AUTH0_VERIFICATION) {
    res.status(400).json({
      message: 'Invalid.'
    })
  }

  if (userExists(email)) {
    res.status(200)
  } else {
    res.status(400)
  }

})

module.exports = router
