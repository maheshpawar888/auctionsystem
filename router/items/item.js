var express = require('express');
var router = express.Router();
var connection = require('../../db/db');

router.post('/addItem',(req,res)=>{

    const {itemname,ownerid,reserveprice,itemimg} = req.body

    connection.query('insert into item(itemName,ownerId,reservePrice,itemImg) values(?,?,?,?)',[itemname,ownerid,reserveprice,itemimg],(error,result)=>{
        if(error) return res.json({
            'Error':error
        })
        res.json({
            'message':"Item added successfully..!!!"
        })    
    })

})

router.get('/getItems',(req,res) => {

    connection.query('select * from item ',(err,result) => {
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