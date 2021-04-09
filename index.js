var express = require('express');
const connection = require('./db/db')
const register = require('./router/register')
const login = require('./router/login')
const item = require('./router/items/item')
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json())
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.use('/',register);
app.use('/',login);
app.use('/',item);

//pk


app.get('/me',(req,res)=>{
    connection.query('select * from users where id=?',[1],(err,result) => {
        if(err) return res.json(err)

        res.json(result)

    })

})

app.listen(port,() => {
        console.log(`server is running at ${port}...`);
})