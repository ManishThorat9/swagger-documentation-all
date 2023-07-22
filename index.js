const express = require('express');

const app = express();

// swaggerdocs related
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yamljs');
const file  = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);
const fileUpload = require('express-fileupload');
const { log } = require('console');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use -is middleware 
app.use(express.json());
app.use(fileUpload());
let courses = [
  {
      id: "11",
      name:"Learn Reactjs",
      price:299
  },
    {
      id: "22",
      name:"Learn Angular",
      price:399
  },
  {
      id: "33",
      name:"Learn Django",
      price:499
  }
]

app.get("/", (req, res) => {
  res.send("<h1>hello from backend</h1>");
});

app.get("/api/v1/lco", (req, res) => {
  res.send("<h1>hello from LOC doc</h1>");
});

app.get("/api/v1/lcoobject", (req, res) => {
  res.send({id:"55", name:"Learn Backend" , price:999});
});
app.get("/api/v1/courses", (req, res) => {
  res.send({courses});
});

app.get("/api/v1/mycourse/:courseId", (req, res) => {
  const myCourse = courses.find(course=> course.id === req.params.courseId)
  res.send(myCourse);
});


// managing request body
app.post("/api/v1/addCourse",(req, res) => {
    console.log(req.body);
    courses.push(req.body);
    res.send(true);
})

// handeling url query
app.get("/api/v1/coursequery",(req, res) => {
    let location = req.query.location
    let device = req.query.device

    res.send({location, device })
})

app.post("/api/v1/courseupload",(req, res) => {
    console.log(req.headers);
    const file = req.files.file
    let path = __dirname + "/images/" + Date.now() + ".jpg"

    file.mv(path, (err) =>{
        res.send(true);
    })
});




app.listen(4000,()=>{
  console.log('Server is listening on port 4000');
});