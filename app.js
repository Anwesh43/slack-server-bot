var express = require('express')
var app = express()
const request = require('request')
const config = require('./config.json')
console.log(config)
console.log(Object.assign({},{name:"Bn"},config))
app.get('/',(req,res)=>{
    console.log(req.url)
    console.log(req)
    console.log(res)
    res.send("first bot")
})
app.get('/oauth',(req,res)=>{
    if(req.query.code) {
        request({url:'https://slack.com/api/oauth.access',qs:Object.assign({},{code:req.query.code},config),method:'GET'},(err,response,body)=>{
            if(err == null) {
                res.json(body)
            }
        })
    }
    else {
        res.send("error in authenticating")
    }
})
app.post('/hello',(req,res)=>{
    console.log(req)
    console.log(res)
    res.send("hello")
})
app.post('/looping',(req,res)=>{
    var i = 0

    const interval = setInterval(()=>{
        const newRes = Object.assign({},res)
        newRes.send(`Loop ${i}`)
        i++
        if(i == 20) {
            clearInterval(interval)
        }
    },1000)
})
app.listen(8000,()=>{
    console.log("started the server")
})
