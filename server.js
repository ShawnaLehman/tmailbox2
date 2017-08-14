const express = require('express')

let app = express()


app.use(express.static('public'))
app.use(express.static('public/pages/dealer-mailbox_files'))

app.get('/dealer-mailbox-notifications', (req, res) => {
  res.sendFile(__dirname + '/public/pages/dealer-mailbox-notifications.html')
})


app.get('/dealer-mailbox-pins', (req, res) => {
  res.sendFile(__dirname + '/public/pages/dealer-mailbox-pins.html')
})

app.get('/dealer-mailbox-compose', (req, res) => {
  res.sendFile(__dirname + '/public/pages/dealer-mailbox-compose.html')
})

app.get('/dealer-mailbox', (req, res) => {
  res.sendFile(__dirname + '/public/pages/dealer-mailbox.html')
})


app.listen(3000, () => {
  console.log('listening on 3000');
})
