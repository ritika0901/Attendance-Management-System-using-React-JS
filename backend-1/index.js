const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
const { Int32, Long } = require("mongodb");
require("dotenv").config();
const app = express();

app.listen(5000, () => console.log("Server is running"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

var allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "mongodb://127.0.0.1:27017/t1",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
const admSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
FaculSchema = new mongoose.Schema({
  tid: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  courses: {
    type: Array,
    required: true,
  },
  cls: {
    type: Array,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const staccSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rno: {
    type: String,
    required: true,
    unique: true,
  },
});
const stdSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rno: {
    type: String,
    required: true,
    unique: true,
  },
  tids: {
    type: Array,
    required: true,
  },
  courses: {
    type: Array,
    required: true,
  },
  attends: {
    type: Array,
    required: true,
  },
});

mongoose.connect("mongodb://127.0.0.1:27017/t1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Fac = mongoose.model("Faculty", FaculSchema);
const adm = mongoose.model("Admin", admSchema);
const Stud = mongoose.model("std", stdSchema);
const Stacc = mongoose.model("stacc", staccSchema);

//  MAIN Functions

app.get("/", async (req, res) => {
  Fac.find()
    .then((data) => {
      console.log(data);
      res.send(data);
      // res.send("Some error occured!")
    })
    .catch((err) => console.log("Error occured, " + err));
});

app.post("/sign-up", async (req, res) => {
  msg1 = req.body;
  console.log(msg1);
  const var3 = JSON.parse(JSON.stringify(msg1)); // abc = [Object: null prototype] { id: '123' }
  console.log(var2);
  let tid = req.body.tid;
  let nam = req.body.name;
  let courses = req.body.courses;
  let cls = req.body.cls;
  let eml = req.body.email;
  let passw = req.body.password;
  console.log(nam, passw, eml);
  const var1 = new Fac({
    tid: tid,
    name: nam,
    courses: courses,
    cls: cls,
    email: eml,
    password: passw,
  });
  var1.save().then(
    () => console.log("One entry added"),
    (err) => console.log(err)
  );
});

app.post("/ssign-up", async (req, res) => {
  msg1 = req.body;
  console.log(msg1);
  const var2 = JSON.parse(JSON.stringify(msg1)); // abc = [Object: null prototype] { id: '123' }
  console.log(var2);
  let nam = req.body.name;
  let rno = req.body.rno;
  let eml = req.body.email;
  let passw = req.body.password;
  console.log(nam, passw, eml);
  const var1 = new Stacc({
    name: nam,
    rno: rno,
    email: eml,
    password: passw,
  });
  var1.save().then(
    () => console.log("One entry added"),
    (err) => console.log(err)
  );
});

app.post("/lgin", async (req, res) => {
  msg1 = req.body;
  const var2 = JSON.parse(JSON.stringify(msg1)); // abc = [Object: null prototype] { id: '123' }
  let eml = req.body.email;
  let passw = req.body.password;
  console.log(eml, passw);
  let chkusr = await Fac.findOne({ email: eml }).exec();
  console.log("check Complete");

  if (!chkusr) {
    console.log("user not found");
    return res.json({ error: "User Not found" });
  }
  if ((passw = chkusr.password)) {
    console.log(chkusr.email);
    console.log("OK");
    return res.json({ status: "ok", tid: chkusr.tid });
  } else {
    console.log("Incorrect password");
    return res.json({ error: "Incorrect password" });
  }
});
app.post("/algin", async (req, res) => {
  msg1 = req.body;
  const var2 = JSON.parse(JSON.stringify(msg1)); // abc = [Object: null prototype] { id: '123' }
  let eml = req.body.email;
  let passw = req.body.password;
  console.log(eml, passw);
  let chkusr = await adm.findOne({ email: eml }).exec();
  console.log("check Complete");

  if (!chkusr) {
    console.log("user not found");
    return res.json({ error: "User Not found" });
  }
  if ((passw = chkusr.password)) {
    console.log(chkusr.email);
    console.log("OK");
    return res.json({ status: "ok", usr: "A" });
  } else {
    console.log("Incorrect password");
    return res.json({ error: "Incorrect password" });
  }
});
app.post("/slgin", async (req, res) => {
  msg1 = req.body;
  const var2 = JSON.parse(JSON.stringify(msg1)); // abc = [Object: null prototype] { id: '123' }
  let eml = req.body.email;
  let passw = req.body.password;
  console.log(eml, passw);
  let chkusr = await Stacc.findOne({ email: eml }).exec();
  console.log("check Complete");

  if (!chkusr) {
    console.log("user not found");
    return res.json({ error: "User Not found" });
  }
  if ((passw = chkusr.password)) {
    console.log(chkusr.email);
    console.log("OK");
    return res.json({ rno: chkusr.rno, status: "S" });
  } else {
    console.log("Incorrect password");
    return res.json({ error: "Incorrect password" });
  }
});

// Faculty Functions

app.post("/gcourses", async (req, res) => {
  let tid = req.body.tid;
  let chkusr = await Fac.findOne({ tid: tid }).exec();
  console.log("giving courses");
  if (!chkusr) {
    console.log("user not found");
    return res.json({ error: "User Not found" });
  } else {
    console.log(chkusr.courses);
    return res.json({ courses: chkusr.courses });
  }
});
app.post("/addattn", async (req, res) => {
  let rno = req.body.rno;
  let attends = req.body.attends;
  let chkstud = await Stud.findOne({ rno: rno }).exec();
  console.log(chkstud.rno);
  if (!chkstud.rno) {
    console.log("student not found");
    return res.json({ error: "Student Not found" });
  } else {
    if (attends) {
      await Stud.updateOne({ rno: rno }, { $set: { attends: attends } });
      console.log("att", attends);
    }
    return res.json({ status: "ok" });
  }
});

app.post("/addcls", async (req, res) => {
  let tid = req.body.tid;
  let cls = req.body.cls;
  let course = req.body.course;

  let chkfac = await Fac.findOne({ tid: tid }).exec();
  if (!chkfac) {
    console.log("student not found");
    return res.json({ error: "Student Not found" });
  } else {
    if (cls) {
      let pos = chkfac.courses.indexOf(course);
      let cl = chkfac.cls;
      cl[pos] = cls;
      await Fac.updateOne({ tid: tid }, { $set: { cls: cl } });
      console.log("cls", cl);
    }
    return res.json({ status: "ok" });
  }
});
app.post("/getcls", async (req, res) => {
  let course = req.body.course;
  let tid = req.body.tid;
  console.log(course);
  let chkfac = await Fac.findOne({ tid: tid }).exec();

  console.log(chkfac);
  if (!chkfac) {
    console.log("No input");
  } else if (!chkfac.courses) {
    console.log("err");
    return res.json({ error: "Fac Not found" });
  } else {
    let pos = chkfac.courses.indexOf(course);
    console.log(chkfac.cls[pos]);
    return res.json({ classes: chkfac.cls[pos] });
  }
});
app.post("/getstud", async (req, res) => {
  let rno = req.body.rno;
  console.log(rno);
  let chkstd = await Stud.findOne({ rno: rno }).exec();

  console.log(chkstd);
  if (!chkstd.rno) {
    console.log("student not found");
    return res.json({ error: "Student Not found" });
  } else {
    console.log("found");
    return res.json(chkstd);
  }
});
// Admin Functions

app.get("/studs", async (req, res) => {
  Stud.find()
    .then((data) => {
      // console.log(data);
      res.send(data);
      // res.send("Some error occured!")
    })
    .catch((err) => console.log("Error occured, " + err));
});

app.post("/addstud", async (req, res) => {
  msg1 = req.body;
  console.log(msg1);
  const var2 = JSON.parse(JSON.stringify(msg1)); // abc = [Object: null prototype] { id: '123' }
  console.log(var2);
  let rno = req.body.rno;
  let nam = req.body.name;
  let tids = req.body.tids;
  let courses = req.body.courses;
  let attends = req.body.attends;

  console.log(rno, nam, tids, courses, attends);
  const var1 = new Stud({
    rno: rno,
    name: nam,
    tids: tids,
    courses: courses,
    attends: attends,
  });
  var1.save().then(
    () => console.log("One entry added"),
    (err) => console.log(err)
  );
});

app.post("/modifystud", async (req, res) => {
  Stud.find()
    .then((data) => {
      console.log(data);
      res.send(data);
      // res.send("Some error occured!")
    })
    .catch((err) => console.log("Error occured, " + err));

  msg1 = req.body;
  const var2 = JSON.parse(JSON.stringify(msg1)); // abc = [Object: null prototype] { id: '123' }
  let rno = req.body.rno;
  if (req.body.name) {
    name1 = req.body.name;
  }
  if (req.body.course1) {
    course1 = req.body.course1;
  }
  if (req.body.attend1) {
    attend1 = req.body.attend1;
  }
  if (req.body.course2) {
    course2 = req.body.course2;
  }
  if (req.body.attend1) {
    attend2 = req.body.attend2;
  }
  if (req.body.course3) {
    course3 = req.body.course3;
  }
  if (req.body.attend3) {
    attend3 = req.body.attend3;
  }

  let chkstud = await Stud.findOne({ rno: rno }).exec();
  console.log("check Complete");
  console.log(chkstud.rno);
  if (!chkstud.rno) {
    console.log("student not found");
    return res.json({ error: "Student Not found" });
  } else {
    if (name1) {
      Stud.updateOne({ rno: rno }, { name: name1 });
    }
    if (course1) {
      Stud.updateOne({ rno: rno }, { courses: course1 });
    }
    if (attend1) {
      Stud.updateOne({ rno: rno }, { attend: attend1 });
    }
    if (course2) {
      Stud.updateOne({ rno: rno }, { courses: course2 });
    }
    if (attend2) {
      Stud.updateOne({ rno: rno }, { attend: attend2 });
    }
    if (course3) {
      Stud.updateOne({ rno: rno }, { courses: course3 });
    }
    if (attend3) {
      Stud.updateOne({ rno: rno }, { attend: attend3 });
    }
    console.log("OK");
    return res.json({ status: "ok" });
  }
});

app.post("/addclass", async (req, res) => {
  msg1 = req.body;
  const var2 = JSON.parse(JSON.stringify(msg1)); // abc = [Object: null prototype] { id: '123' }
  let rno = req.body.rno;

  let chkstud = await Stud.findOne({ rno: rno }).exec();
  console.log("check Complete");
  console.log(chkstud.rno);
  if (!chkstud.rno) {
    console.log("student not found");
    return res.json({ error: "Student Not found" });
  } else {
    if (attend1) {
      Stud.updateOne({ rno: rno }, { attend: attend1 });
    }
    if (attend2) {
      Stud.updateOne({ rno: rno }, { attend: attend2 });
    }
    if (attend3) {
      Stud.updateOne({ rno: rno }, { attend: attend3 });
    }
    console.log("OK");
    return res.json({ status: "ok" });
  }
});

