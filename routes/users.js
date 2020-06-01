
var express = require('express');//Express is the framework of node
var router = express.Router();
const signUp_moduel = require('../model/signUp_model')//calling model where we have defined the repositery for signup

/* GET users listing. */
// router.get('/', function(req, res, next) {
 
//   res.json([{
//   	id: 1,
//   	username: "Anuj"
//   }, {
//   	id: 2,
//   	username: "Anuj katoch"
//   }]);
// });
router.post('/signUp', function (req, res) {
  // var query = { Useremail: req.body.Useremail };
  // LoginModel.findOne(query, function (error, datavalue) {
  //   if (error) { throw error }
  //   if (datavalue === null) {
      console.log(req.body)
      signUp_moduel.create(req.body).then(function (data) {
        { 
          res.send(JSON.stringify(true, null, 3)); }
      })
    // } else {
    //   console.log("Already Exit")

    // }
  //})
});
router.post('/checkusername', function (req, res) {
 
  var query = { user_name: req.body.user_name };
    signUp_moduel.findOne(query, function (error, datavalue) {
    if (error) { throw error }
    if (datavalue === null) {
      res.send(JSON.stringify("", null, 3));
    } else {
      res.send(JSON.stringify("User already exit !", null, 3));
    

    }
  })
});
router.post('/login', function (req, res) {
  console.log( req.body)
  const { user_name, Password } = req.body;
  var query = { user_name: user_name,Password: Password};
  
  signUp_moduel.findOne(query, function (err, user) {
    if (err) {
      console.error(err);

      res.send("1");
    } else if (!user) {
      res.send("1");
    }
    else {
      console.log(user)

      res.json(user);
      // res.send(JSON.stringify(user.Fname + " " + user.LName+"-"+user._id+"-"+user.UserAdmin))
    }
  })
})
router.post('/', function(req,res){
  // const { spawn } = require('child_process');
  // const bat = spawn('cmd.exe', ['/c', 'C:\\Users\\Administrator\\Desktop\\MAAP_Net_Files\\ReleaseExcelObject\\ReleaseExcelObject\\bin\\Debug\\ReleaseExcelObject.exe']);
  
  // bat.stdout.on('data', (data) => {
  //   console.log("dd : " + data.toString());
  // });
  
  // bat.stderr.on('data', (data) => {
  //   console.error(data.toString());
  // });
  
  // bat.on('exit', (code) => {
  //   console.log(`Child exited with code ${code}`);
  // });
  var fs = require('fs')
  if (fs.existsSync('C:\\WindIntegration\\WindIntegration\\bin\\Debug\\WindIntegration.exe')) {
    const exec = require('child_process');
    //const child = exec.execFile('D:\\MAAP_Net_Files\\ReleaseExcelObject\\ReleaseExcelObject\\bin\\Debug\\ReleaseExcelObject.exe', [30.50,18.5330,12.5330,7.95,85,'M',1,J,1], function (error, stdout, stderr) {
    const child = exec.execFile('C:\\WindIntegration\\WindIntegration\\bin\\Debug\\WindIntegration.exe', [46.367,-79.417,60.53131529322,-79.417,85,'S',5,'J',1], function (error, stdout, stderr) {    child.stdout.on('data', (data) => {    
          console.log("dd : " + data.toString());});
          child.stderr.on('data', (data) => {
          console.error(data.toString()); });
          child.on('exit', (code) => {
          console.log(`Child exited with code ${code}`);});
        if (error) { throw error;}
        //console.log({'returnvalue':''+ stdout.toString().trim() +'' });
        res.json({'Wind Output ':''+ stdout.toString().trim() +'' });
         });  
  }
    else{
      console.log('EXE file not Found');
    }
  
       
})
module.exports = router;
