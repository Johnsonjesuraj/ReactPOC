const express= require('express');
const bodyParser = require('body-parser');

const properties = require('./config/properties');
const db = require('./config/database');

//Employee routes
const employeeRoutes = require('./employee/employee.routes');

const app = express();

//configure bodyparser
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//initialise express router
const router = express.Router();

//calling the database connectivity 
db();

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });
app.use('/employee', router); 
employeeRoutes(router);
app.listen(properties.PORT, () => {
    console.log(`Server is running on ${properties.PORT} port`);
})

app.get('/', (req,res)=>{
res.send("Hello  World");
});
