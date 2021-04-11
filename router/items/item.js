var express = require('express');
var router = express.Router();
var connection = require('../../db/db');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb) => { 
      console.log(file)
      cb(null, 'upload');
    },
    filename: (req,file,cb) => {
      
      cb(null,Date.now() + file.originalname);
    }
  })

router.post('/addItem',multer({storage: storage}).single('files'),(req,res)=>{
    console.log(req.file)
    const url = req.protocol + '://' + req.get("host");
    const fileUrl = url + '/upload/' + req.file.filename
    const fileType = req.file.mimetype



    const {itemname,reserveprice} = req.body

    connection.query('insert into item(itemName,reservePrice,itemImg) values(?,?,?)',[itemname,reserveprice,fileUrl],(error,result)   =>{
        if(error) return res.json({
            'Error':error
        })
        res.json({
            'status':1,
            'message':"Item added successfully..!!!"
        })    
    })

})

router.get('/getItems',(req,res) => {

    connection.query('select * from item where auctionstartornot=0 ',(err,result) => {
        if(err) return res.json(err)
        res.json(result)
    })
})

router.get('/getItems/:id',(req,res) => {

    connection.query('select * from item where ownerId=?',[req.params.id],(err,result) => {
        if(err) return res.json(err)

        res.json(result)

    })
})


module.exports = router;