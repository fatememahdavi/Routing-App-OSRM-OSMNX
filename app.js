var express = require('express');
const config = require('config');
const cors = require('cors');
const path = require('path');

const osmnxRoute = require('./routes/osmnxRoute');
const osrmRoute = require('./routes/osrmRoute');

const corsOptions = {
  origin: config.get('frontBaseUrl')
};


var app = express();
app.use(express.json())
app.use(cors(corsOptions));


app.use(express.static(path.join(__dirname, 'frontend_build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend_build', 'index.html'))
})

app.use('/routing/osmnx', osmnxRoute);
app.use('/routing/osrm', osrmRoute);

const port = config.get('port')
var server = app.listen(port, "0.0.0.0", () => {
  console.log(`server running on port ${port}`);
})
server.on('connection', function (socket) {
  socket.setTimeout(600 * 60 * 1000); 
})

