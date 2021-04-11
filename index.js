var express = require('express');
const connection = require('./db/db')
const register = require('./router/register')
const login = require('./router/login')
const item = require('./router/items/item')
const auction = require('./router/auction/auction')

const port = process.env.PORT || 5000;
const path = require('path')


const app = express();
//app.use(express.static('upload'))
//app.use('/images',express.static('images'))

// app.use(express.static(path.join(__dirname,'./upload')))


app.use('/upload',express.static(path.join("upload")));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json())
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.use('/',register);
app.use('/',login);
app.use('/',item);
app.use('/',auction);

app.get('/me',(req,res)=>{
    connection.query('select * from users where id=?',[1],(err,result) => {
        if(err) return res.json(err)

        res.json(result)

    })

})

app.listen(port,() => {
        console.log(`server is running at ${port}...`);
})