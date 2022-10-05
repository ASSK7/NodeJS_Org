var express = require('express');
var app = express();

app.listen(3001); //3001 is port number , we can give any number here
console.log("Your app was running on url @ http://localhost:3001");

//Adding the middleware "express.json" provided by express
app.use(express.json());  //adding the middleware

//middleware to serve static file content for webapp which is having my fiori app
app.use("/", express.static("webapp/"));

//Implement first microservice at endpoint blank
app.get("/",(req,res) => {
    res.send("We are running our first microservice");
});

this.aVendors = [
    {
        "id": "1",
        "firstName": "Afreed",
        "lastName": "Shaik",
        "companyName": "Google",
        "website": "Google.com",
        "email": "gmail.com",
        "vstatus": "A",
        "gstNumber": "GST_1234"
    },
    {
        "id": "2",
        "firstName": "Hari",
        "lastName": "P",
        "companyName": "IBM",
        "website": "Ibm.com",
        "email": "ibm.com",
        "vstatus": "A",
        "gstNumber": "GST_123=4"
    },
    {
        "id": "3",
        "firstName": "Priya",
        "lastName": "H",
        "companyName": "Infosys",
        "website": "infosys.com",
        "email": "infosys.com",
        "vstatus": "A",
        "gstNumber": "GST_124"
    }
];

//another get request
app.get("/vendor",(req,res) => {
    res.json(this.aVendors);
});

//get request with parameters
app.get("/vendor/:id",(req,res) => {
       var foundVendor = this.aVendors.find(function(element){
            return element.id === req.params.id;
       });
    
       typeof(foundVendor) !== undefined ? res.send(foundVendor) : res.send({
           "message" : "Vendor not found"
       });

});

//get for fiori app i.e.webapp folder
app.get("index.html",(req,res) => {
    res.sendFile(__dirname + '/webapp/index.html');
});



//post request
app.post("/vendor", (req,res) => {
    var postBodyData = req.body;
    
    //genearating the random guid
    function generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    postBodyData.id = generateUUID();
    res.json(postBodyData);
});