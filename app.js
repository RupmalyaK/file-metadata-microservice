'use strict';

const express = require('express');
const cors = require('cors');
const multer = require("multer");
const join = require("path").join;
const fs = require("fs");

const storage = multer.diskStorage({
"destination":(req,file,cb) => {
  cb(null , "./uploads");
},
"filename": (req , file , cb) => {
  cb(null , file.originalname);
}  
});

const upload = multer({
storage, 
}).single("upfile");

// require and use "multer"...

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => 
     res.sendFile(process.cwd() + '/views/index.html'));

app.post("/api/fileanalyse" , (req , res) => {

  upload(req , res , err => {
        if (err)
        {
          res.status(400).json({
          "error":err
          });
          return; 
        }
        res.status(200).json({
        "name": req.file.filename,
        "type": req.file.mimetype,
        "size":req.file.size 
        });    
         });
});
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Node.js listening at port' , listener.address().port + "...");
});
