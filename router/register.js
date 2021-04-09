var express = require('express');
var router = express.Router();
var connection = require('../db/db');

router.post('/register',(req,res)=>{
    var email=req.body.email;
    var username=req.body.username;
    var mobileno=req.body.mobileno;
    var password=req.body.password;

    connection.query('select * from users where email=?',[email],(error,result) => {
        if(error) {
            res.json({"status":0,"message":"Email should be unique"})
        }

        if(result.length ==0){
            connection.query('insert into users(username,email,mobileno,password) value(?,?,?,?)',[username,email,mobileno,password],(error,iresult)=>{
                if(error) {
                    res.json({"Error":error})
                }
                res.json({
                    'message':'SignUp successfully..!!'
                })               
            })
        }else {
            res.json({"status":0,"message":"Email already registered"})
        }
        
    })

})

router.get('/test',(req,res)=>{
    
})


module.exports=router;

