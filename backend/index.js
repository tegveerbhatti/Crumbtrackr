const express = require('express')
const cors = require('cors')
const pg = require('pg')
const {readdirSync} = require('fs')

const app = express();

const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(cors())

// Export handler for Vercel
//routes
readdirSync('./routes').map((route) => app.use('/api', require(`./routes/transactions`)))
const server = () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}
server()
