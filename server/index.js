const express =require('express')
const volleyball= require('volleyball')
const path = require('path')
const axios = require('axios')

const app =express();

app.use(volleyball)
app.use(express.json())
app.use(express.static(path.join(__dirname,"..","dist")))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})
app.get("/api/trips", async(req,res,next)=>{
  let trips = await axios.get('https://data.cityofnewyork.us/resource/2yzn-sicd.json?$select=pickup_datetime&$limit=50')
  res.json(trips.data)
})

app.get("/api/trips/:time", async(req,res,next)=>{
  let trip = await axios.get(`https://data.cityofnewyork.us/resource/2yzn-sicd.json?pickup_datetime=${req.params.time}`)
  res.json(trip.data[0])
})

app.use((req,res,next)=>{
  const html = `<!DOCTYPE html>
      <html>
      <head>
      <title>2015 NYC Taxi Trips</title>
      </head>
      <body>
        <div >
          <h1>No Taxis Here!</h1>
          <h2>Why not go back here and try again?<h2>
          </div>
      </body>
      </html>`
  res.send(html);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`listening at port ${PORT}` ))
