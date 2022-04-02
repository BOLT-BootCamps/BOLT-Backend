const jwt = require('jsonwebtoken')
const axios = require('axios')
require('dotenv').config()

const makeToken = () => {
  const payload = {
    iss: process.env.ZOOM_API_KEY,
    exp: ((new Date()).getTime() + 10000)
  }

  return jwt.sign(payload, process.env.ZOOM_API_SECRET)
}

const getMeetings = async () => {
  const token = makeToken()
  const response = await axios({
    method: 'get',
    url: 'https://api.zoom.us/v2/users/' + 'me' + '/meetings',
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'Zoom-api-Jwt-Request',
      'content-type': 'application/json'
    }
  })
  return response.data.meetings
}

const getParticipantLogs = async (meetingId) => {
  const token = makeToken()
  const response = await axios({
    method: 'get',
    url: `https://api.zoom.us/v2/report/meetings/${meetingId}/participants`,
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'Zoom-api-Jwt-Request',
      'content-type': 'application/json'
    }
  })
  return response.data.participants
}

const getZoomDetails = async (meetingId) => {
  const token = makeToken()
  const response = await axios({
    method: 'get',
    url: `https://api.zoom.us/v2/report/meetings/${meetingId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'Zoom-api-Jwt-Request',
      'content-type': 'application/json'
    }
  })

  const zoomDetails = response.data

  const logs = await getParticipantLogs(meetingId)

  zoomDetails.logs = logs

  return zoomDetails
}

const getAllZoomDetails = async () => {
  const meetingIDs = await getMeetings()
  const meetings = []
  for (let i = 0; i < meetingIDs.length; i++) {
    try {
      const meeting = await getZoomDetails(meetingIDs[i].pmi || meetingIDs[i].id)
      meetings.push(meeting)
    } catch (err) {
      console.log(err.message)
    }
  }
  return meetings
}

module.exports = {
  getZoomDetails,
  getAllZoomDetails,
  getMeetings
}
