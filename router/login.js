var express = require('express');
var router = express.Router();
var connection = require('../db/db');


router.post('/login',(req,res)=>{
    const { Email, Password } = req.body
    connection.query('select * from users where email=?',[Email],(error,result) => {
        if(error) {
            res.status(400).json(error)
        }
        if(result.length == 0)  {
            res.json({"status":0,"message":"Username and password are invalid"})
        } else {
            if(Password == result[0].password){
                res.json({
                    'userid':result[0].id,
                    'message':'Login Succesfull'
                })
            }else{
                res.json({"status":0,"message":"Username and password are invalid"})
            }
        }
    })

})

module.exports = router