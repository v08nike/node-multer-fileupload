// Imports
const express = require("express");
const multer = require("multer");
const cors = require("cors");

// set up multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadedFile/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// create multer instance
var upload = multer({ storage });

// create app
var port = 3000;
const app = express();

// set up cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.listen(port, () => {
  console.log(`Node server started at ${port}...`);
});

// to use this API the user need to upload a single file using field name "filetoupload" when sending post request
// and must send a JSON with "description" filed
app.post(
  "/uploadFile",
  upload.single("filetoupload"),
  function (req, res, next) {
    console.log(req.body.description);
    res.status(200).send({ message: "file uploaded" });
  }
);

app.post(
  "/uploadMultiFile",
  upload.fields([{ name: "files", maxCount: 10 }]),
  function (req, res) {
    res.status(200).send({ message: "files uploaded" });
  }
);
