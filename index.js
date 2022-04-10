const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUI=require("swagger-ui-express");
const YAML=require('yamljs');
const bodyPrser=require('body-parser');
const swaggerJSDocs=YAML.load("./swagger.yaml");
const logger = require('morgan');
const nodeCron=require('node-cron');
const dotenv=require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use(logger('dev'))


app.use(express.urlencoded({extended:true}));


app.use('/api/swagger-docs',swaggerUI.serve,swaggerUI.setup(swaggerJSDocs));

const db = require("./src/models");

// Routers
const shopRoute = require("./src/routes/Shops");
app.use("/", shopRoute);

const Products=require("./src/routes/Product");
app.use('/',Products);

// Schedule tasks to be run on the server.no
//roles

app.get('/',(req,res)=>{

  res.send("chabot server");
});

app.use((error,req,res,next)=>{
  const statusCode=error.status||500
  res.status(statusCode).json({
    message: error.message,
    stack:error.stack
  });
  next(error);
});
const   PORT=process.env.PORT||3002;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
});
