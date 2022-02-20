const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https");
const {config} = require("./config.js");
const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname+ "/signup.html");

});
app.post('/', function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data ={
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const config_url = config.MY_API_LIST_URL;
  const config_auth = config.SECRET_API_ID;

  const jsonData= JSON.stringify(data);
  const options={
    method:"POST",
    auth: process.enc.API_ID,
  }
  const request= https.request(process.enc.API_URL, options, function(response){
    if(response.statusCode === 200){

      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data){
    })
  })

  request.write(jsonData);
  request.end();
  console.log(firstName, lastName, email);
})

app.post("/failure", function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3001, function(){
    console.log("Server is running on port 3001");
    console.log(__dirname+ "/signup.html");
});
