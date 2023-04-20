const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {
    getBears,
    deleteBear, 
    createBear, 
    updateBear
} = require('./controller')

app.get(`/api/bears`, getBears)
app.delete(`/api/bears/:id`, deleteBear)
app.post(`/api/bears`, createBear)
app.put(`/api/bears/:id`, updateBear)

app.listen(4004, () => console.log(`running on 4004`))
