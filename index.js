var express = require('express');
var app = express();

app.listen(3001); //3001 is port number , we can give any number here
console.log("Your app was running on url @ http://localhost:3001");


//Implement first microservice at endpoint blank
app.get("/",(req,res) => {
    res.send("We are running our first microservice");
});

//another get request
app.get("/vendor",(req,res) => {
    res.json([{ "name"   : "John Smith",
    "sku"    : "20223",
    "price"  : 23.95,
    "shipTo" : { "name" : "Jane Smith",
                 "address" : "123 Maple Street",
                 "city" : "Pretendville",
                 "state" : "NY",
                 "zip"   : "12345" },
    "billTo" : { "name" : "John Smith",
                 "address" : "123 Maple Street",
                 "city" : "Pretendville",
                 "state" : "NY",
                 "zip"   : "12345" }
  },
  { "name"   : "Alice Brown",
  "sku"    : "54321",
  "price"  : 199.95,
  "shipTo" : { "name" : "Bob Brown",
               "address" : "456 Oak Lane",
               "city" : "Pretendville",
               "state" : "HI",
               "zip"   : "98999" },
  "billTo" : { "name" : "Alice Brown",
               "address" : "456 Oak Lane",
               "city" : "Pretendville",
               "state" : "HI",
               "zip"   : "98999" }
}]);
});