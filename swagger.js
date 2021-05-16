const swaggerJSDoc = require("swagger-jsdoc");
const router = require("./routes");

const swaggerDefinition  ={
  info:{
    title:'API',
    version:'1.0.0',
    description:'API'
  },
  host:'localhost:3000',
  basePath:'/'
};


const options ={
  swaggerDefinition,
  apis:['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);





router.get('/swagger.json',async function(ctx){
  ctx.set('Content-Type','application/json');
  ctx.body=swaggerSpec;
})

module.exports = router;
