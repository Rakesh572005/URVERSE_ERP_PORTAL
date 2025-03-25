var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { default: mongoose } = require('mongoose');
const user = require('./models/stulogin');
const sdetails = require('./models/studentdetails');
const faculty = require('./models/tlogin');
const attendance = require('./models/attendance');
const getdet = require('./models/getdetails');
const getpermissions = require('./models/permissions')
const studentrollnos = require('./models/getstudrollnos')
const stumarks = require('./models/studentmarks.js');
const studentremarks = require('./models/studentremarks.js')
const mentordetails=require('./models/mentordetails.js')

var app = express();
var cors = require('cors');
app.use(cors());
var period = require('./models/student');
const { error } = require('console');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://localhost:27017/erplbrce').then(res => {
  console.log("connected")
}).catch(err => {
  console.log("Not connected")

})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/create', function (req, res) {
  let json = {
    username: req.body.username,
    password: req.body.password
  }
  let u = new user(json);
  u.save().then(() => {
    res.send("success");
  }).catch(err => {
    res.send(err);
  })
})
app.post('/tcreate', function (req, res) {
  let json = {
    username: req.body.username,
    password: req.body.password
  }
  let u = new faculty(json);
  u.save().then(() => {
    res.send("success");
  }).catch(err => {
    res.send(err);
  })
})
app.post('/studentlogin', function (req, res) {
  user.find({
    "username": req.body.username,
    "password": req.body.password
  }).then(result => {
    var result1 = ""
    if (result.length === 0) {
      result1 = "Login Failed"
    } else {
      result1 = "Login Success"
    }
    console.log(req.body.username)
    console.log(result1)
    res.send(result1)

  }).catch(err => { console.log(err) })
})
//creating student details
app.post('/student/screate', function (req, res) {
  let json = {
    rollno: req.body.rollno,
    sname: req.body.sname,
    dob: req.body.dob,
    fathername: req.body.fathername,
    cgpa: req.body.cgpa,
    mothername: req.body.mothername
  }
  let u = new sdetails(json);
  u.save().then(() => {
    res.send("success");
  }).catch(err => {
    res.send(err);
  })
})
app.post('/student/gettid', function (req, res) {
  let json = {
    year: req.body.year,
    sem: req.body.sem,
    branch: req.body.branch,
    section: req.body.section,
  }
  studentrollnos.find(json).then(result => {
   const rollnos1 = Array.isArray(req.body.srollno) ? req.body.srollno : [req.body.srollno];
    const orgrollnos = result[0].rollnos;
    console.log("Original roll numbers:", orgrollnos);
    const allRollNosValid = rollnos1.every(rollno => orgrollnos.includes(rollno));
    const output = allRollNosValid ? "Success" : "Not Success";
    var res1=''
    if(output==="Success"){
      res1=result[0].classteacherid
    }
    else{
      res1='None'
    }
    res.send(res1)
  }).catch(err => {
    console.log(err)
  })
})
app.post('/student/addmentordetails',function(req,res){
  let json={
    mname:req.body.mname,
    mdesg:req.body.mdesg,
    mphoneno:req.body.mphoneno,
    branch:req.body.branch,
    rollnos:req.body.rollnos
  }
  let u = new mentordetails(json);
  u.save().then(() => {
    res.send("success");
  }).catch(err => {
    res.send(err);
  })

})
app.post('/student/getmentordetails', async (req, res) => {
  const { rollno } = req.body;

  try {
    console.log("Received roll number:", rollno);
    const mentorDetail = await mentordetails.findOne({ rollnos: { $in: [rollno] } });
    console.log("Mentor detail found:", mentorDetail);

    if (mentorDetail) {
      res.status(200).json({
        mname: mentorDetail.mname,
        mdesg: mentorDetail.mdesg,
        mphoneno: mentorDetail.mphoneno,
        branch: mentorDetail.branch,
      });
    } else {
      console.log("No mentor details found for this roll number.");
      res.status(404).json({ message: 'No mentor details found for this roll number.' });
    }
  } catch (err) {
    console.error("Error fetching mentor details:", err);
    res.status(500).json({ message: 'An error occurred while fetching mentor details.' });
  }
});


app.post('/student/fetchremarks',function(req,res){
  let json={
    srollno:req.body.srollno,
    date:req.body.date
  }
  studentremarks.find(json).then(result => {
    res.send(result)
  }).catch(err=>{
    console.log(err)
  })

})
app.post('/student/addremarks', function (req, res) {
  let json = {
    year: req.body.year,
    sem: req.body.sem,
    branch: req.body.branch,
    section: req.body.section,
    date: req.body.date,
    srollno: req.body.srollno,
    sname: req.body.sname,
    teacherid: req.body.teacherid,
    remarks: req.body.remarks
  }
  let u = studentremarks(json);
  u.save().then(() => {
    res.send("Success");
  }).catch(err => {
    res.send(err);
  })
})
//get student details
app.post('/student/getstuddet', function (req, res) {
  sdetails.findOne({
    "rollno": req.body.rollno
  }).then(result => {
    console.log(result)
    res.send(result)

  }).catch(err => { console.log(err) })

})
app.post('/student/attendance', async (req, res) => {
  const { sroll, date } = req.body;
  try {
    // Fetch all attendance records for the specified date
    const attendanceRecords = await attendance.find({ date: date });
    res.json(attendanceRecords);
    console.log(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving attendance data");
  }
});
app.post('/student/marks', function (req, res) {
  let json = {
    "year": req.body.year,
    "sem": req.body.sem,
    "sname": req.body.sname,
    "sroll": req.body.sroll,
    "marks": req.body.marks
  }
  let u = new stumarks(json);
  u.save().then(() => {
    res.send("success");
  }).catch(err => {
    res.send(err);
  })
});
app.post('/student/getmarks', function (req, res) {
  stumarks.find({
    "year": req.body.year,
    "sem": req.body.sem,
    "sroll": req.body.sroll,
    "branch":req.body.branch
  }).then(result => {
    var result1 = ""
    if (result.length === 0) {
      result1 = "No data found"
    } else {
      result1 = "Data found"
    }
    console.log(req.body.marks)
    console.log(result[0])
    res.send(result[0])

  }).catch(err => { console.log(err) })
});
app.post('/period', function (req, res) {
  let json = {
    date: req.body.date,
    dayOrder: req.body.dayOrder,
    hour: req.body.hour,
    subject: req.body.subject,
    status: req.body.status

  }
  let u = new period(json);
  u.save().then(() => {
    res.send("success");
  }).catch(err => {
    res.send(err);
  })
})



app.post('/facultylogin', function (req, res) {
  faculty.find({
    "username": req.body.username,
    "password": req.body.password
  }).then(result => {
    var result1 = ""
    if (result.length === 0) {
      result1 = "Login Failed"
    } else {
      result1 = result[0].tname
    }
    console.log(req.body.username)
    console.log(result1)
    res.send(result1)

  }).catch(err => { console.log(err) })
})

app.post('/faculty/getData', function (req, res) {
  const sem = req.body.sem;
  const year = req.body.year
  getdet.find({
    sem: parseInt(sem),
    year: parseInt(year),
    branch:req.body.branch
  }).then(result => res.json(result)).catch(err => { })

})
app.post('/faculty/createData', function (req, res) {
  let json = {
    sem: req.body.sem,
    year: req.body.year,
    students: req.body.students
  }
  let u = new getdet(json);
  u.save().then(() => {
    res.send("success");
  }).catch(err => {
    res.send(err);
  })
});
app.post('/faculty/getnos', function (req, res) {
  const sem = req.body.sem;
  const year = req.body.year
  getdet.find({
    sem: parseInt(sem),
    year: parseInt(year)
  }).then(result => res.json(result)).catch(err => { })
});
app.post('/faculty/attendance', function (req, res) {
  let json = {
    sem: req.body.sem,
    year: req.body.year,
    period: req.body.period,
    subject: req.body.subject,
    date: req.body.date,
    absentees: req.body.absentees,
    presentees: req.body.presentees
  }
  let u = new attendance(json);
  u.save().then(() => {
    res.send("success");
  }).catch(err => {
    res.send(err);
  })
});


app.post('/faculty/attendance/getstudents', function (req, res) {
  let json = {
    sem: req.body.sem,
    year: req.body.year,
    branch:req.body.branch
  }
  studentrollnos.findOne(json).then(result => res.send(result.rollnos)).catch(err => { })
});

app.post('/faculty/attendance/create/getstudents', function (req, res) {
  let json = {
    sem: req.body.sem,
    year: req.body.year,
    branch: req.body.branch,
    section: req.body.section,
    classteacherid: req.body.classteacherid,
    classteacher: req.body.classteacher,
    rollnos: req.body.rollnos
  }
  let u = new studentrollnos(json);
  u.save().then(result => {
    res.send(result.rollnos);
  }).catch(err => {
    res.send(err);
  })
});
app.post('/faculty/checkrollnos', function (req, res) {
  const rollnos1 = Array.isArray(req.body.rollnos) ? req.body.rollnos : [req.body.rollnos]; // Ensure it's an array
  console.log("Submitted roll numbers:", rollnos1);
  studentrollnos.find({
    year: req.body.year,
    sem: req.body.sem,
    branch:req.body.branch
  })
    .then(result => {
      if (result.length === 0) {
        return res.send("No matching year/semester found");
      }
      const orgrollnos = result[0].rollnos;
      console.log("Original roll numbers:", orgrollnos);
      const allRollNosValid = rollnos1.every(rollno => orgrollnos.includes(rollno));
      const output = allRollNosValid ? "Success" : "Not Success";
      res.send(output);
    })
    .catch(err => {
      console.error("Error fetching roll numbers:", err);
      res.status(500).send("An error occurred");
    });
});
app.post('/faculty/getpermissions', function (req, res) {
  getpermissions.find({
    year: req.body.year,
    sem: req.body.sem,
    date: req.body.date,
    branch:req.body.branch
  }).then(result => {
    if(result.length===0){
      console.log("none");
    }
    const permissions = Array.isArray(result[0].permissions) ? result[0].permissions : [result[0].permissions];
    res.send(permissions)
  }).catch(err => {
    console.log(err)
  })
})
app.post('/faculty/addpermissions', function (req, res) {
  let json = {
    year: req.body.year,
    sem: req.body.sem,
    branch:req.body.branch,
    date: req.body.date,
    permissions: req.body.permissions
    
  }
  let u = new getpermissions(json);
  u.save().then(() => {
    res.send("Success");
  }).catch(err => {
    res.send(err);
  })
})


app.post('/faculty/getremarks', async (req, res) => {
  const { teacherid, sem, year, branch, section } = req.body;
  if (!teacherid || !sem || !year || !branch || !section) {
    return res.status(400).json({ error: 'Teacher ID, semester, year, branch, and section are required' });
  }

  try {
    const remarks = await studentremarks.find({ teacherid, sem, year, branch, section });
    res.status(200).json(remarks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/absentees', (req, res) => {
  const { sem, year, period, subject, date } = req.query;
  Absentee.findOne({ sem, year, period, subject, date }, (err, absentees) => {
    if (err || !absentees) {
      return res.status(404).send({ message: 'No absentees found' });
    }
    Permission.findOne({ date }, (err, permissions) => {
      if (err || !permissions) {
        return res.status(404).send({ message: 'No permissions found' });
      }
      const finalAbsentees = absentees.absentees.filter(absentee => {
        const hasPermi = permissions.permissions.includes(absentee);
        return !hasPermi;
      });

      res.send({ finalAbsentees });
    });
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
