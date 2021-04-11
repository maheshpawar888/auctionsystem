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

module.exports = router;

