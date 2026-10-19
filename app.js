const express = require("express")
const path = require("path")
const fs = require('fs')
const app = express()
const PORT = 5000

const public = path.join(__dirname,"public")

app.use(express.static(public))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res)=>{
  res.sendFile(`${public}/index.html`)
})

app.post('/submit',(req,res)=>{
  console.log(req.body)
  fs.appendFile('./log.txt', JSON.stringify(req.body) + '\n', (err) => {
  if (err) {
    console.error('Error appending data:', err);
  } else {
    console.log('Data successfully appended.');
    res.redirect('/')
  }
});
})

app.listen(PORT,()=>{
  console.log(`Server is listening on port ${PORT}`)
})