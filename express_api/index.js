'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.use('/api/table/', require('./controllers/table'));
app.use('/api/customer', require('./controllers/customer'));
// app.use('/api/reservation', require('./controllers/reservation'));


// const getBooks = (request, response) => {
//   pool.query('SELECT * FROM table_info', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results)
//   })
// }

// const addBook = (request, response) => {
//   const { author, title } = request.body

//   pool.query(
//     'INSERT INTO books (author, title) VALUES ($1, $2)',
//     [author, title],
//     (error) => {
//       if (error) {
//         throw error
//       }
//       response.status(201).json({ status: 'success', message: 'Book added.' })
//     }
//   )
// }

// app
//   .route('/reservations/tables')
//   // GET endpoint
//   .get(getBooks)
//   // POST endpoint
//   //.post(addBook)

// Start server
app.listen(process.env.LISTENPORT || 3002, () => {
  console.log(`Server listening on port ${process.env.LISTENPORT}`)
})