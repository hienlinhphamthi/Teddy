const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
// var upload = multer({ dest: "/frontend/static/upload/" });

const app = express();

app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

app.use(
  express.static(path.resolve(__dirname, "upload"))
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
module.exports = app;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'/frontend/static/upload'));
  },
  filename: function (req, file, cb) {
    console.log(1);
    // console.log(file.fieldname);
    let namefile =  Date.now()  + "-" +  file.originalname
    cb(null, namefile);
    req.nameFile = namefile
  },
});

var upload = multer({ storage: storage })

app.post("/upload",upload.single('formFile'), (req, res, next) => {
  return res.json({
    status: "up load file ok",
    nameFile: req.nameFile,
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "client.html"));
});

app.listen(process.env.PORT || 4040, () => console.log("Server running..."));
