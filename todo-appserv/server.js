const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer  = require('multer')


const app = express()
app.use(cors())
app.use(bodyParser.json())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './FileData')
    }
    ,
    filename: (req, file, cb) => {
      cb(null,file.originalname)
    }
});
const upload = multer({storage: storage});

// app.post('/api/uploadFile',upload.single('image'),(req,res)=>{
    
//  })

app.post('/api/uploadFile',upload.array('img',12), (req,res)=>{
    
   res.send(console.log(req))
    // upload(req,res,(err)=> {
    //     if(err){
    //         res.send(console.log(err))
    //     }else{
    //         console.log(req.file)
    //     }
    // })
}
    // res.send(console.log(req.data))
// upload(req,res,function (err){
//     if(err){
        
//     }
// })
    
)

    app.listen(3030, () => console.log('Example app listening on port 3030!'))