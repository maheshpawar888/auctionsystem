var express = require('express');
var router = express.Router();
var connection = require('../../db/db');

router.post('/startauction',(req,res) => {
    var itemId =  req.body.itemId;

    connection.query('insert into startauction(itemId) values(?)',[itemId],(error,result) => {
        if(error) {
            res.json(error)
        }
        else {
            connection.query('update item set auctionstartornot=1 where id=?',[itemId],(error,result) => {
                if(error) {
                    res.json(error)
                } else {
                    res.json({
                        "status":1,
                        "msg":"auction started"
                    })
                }
            })
           
        }
    })
    
})

router.get('/showliveauction',(req,res) => {
    // var itemId = req.params.itemId;

    connection.query('SELECT * FROM startauction,item WHERE item.id=startauction.itemId AND startauction.sold=0',(error,result) => {
        if(error) {
            res.json(error)
        } else {
            res.json(result)
        }
    })
})

module.exports = router;

