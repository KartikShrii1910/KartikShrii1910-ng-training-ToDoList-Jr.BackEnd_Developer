const express = require('express');
const cors = require('cors')
const route = require('./app/route/route');
const app = express()
const port = 3000

app.use(cors());

app.use(express.json())

app.use('/', route);

app.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports=app;