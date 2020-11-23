// Install libraries
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

// configure the environment variable
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000
const BITCOIN_BASE_URL =
  'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCSGD'

// create an instance of express
const app = express()

// Add CORS header to the response
app.use(cors())
app.use(express.json())

// create resources
app.get('/', (req, res) => {
  res.status(200)
  res.type('application/json')
  res.json('testing 1,2,3')
  console.info('Bitcoin')
})

app.get('/bitcoinaverage', async (req, res) => {
  try {
    const response = await fetch(BITCOIN_BASE_URL, {
      headers: { 'x-ba-key': `${process.env.BITCOIN_API_KEY}` },
    })

    const result = await response.json()

    if (response.status === 200) {
      res.status(200)
      res.json(result)
      // console.log(result.ask)
      // console.log(result.display_symbol)
    } else throw Error
  } catch (err) {
    console.log('>>> Error: ', err, response.status)
    res.status(response.status)
    res.send('>>> ERROR IN CONNECTION TO API <<<')
  }
})

// start the app
app.listen(PORT, () => {
  console.info(`Application started on port ${PORT} at ${new Date()}`)
})
