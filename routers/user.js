const express = require('express')
const router = express.Router()

const app = express()
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

var sib = require('sib-api-v3-sdk');

var client = sib.ApiClient.instance;

var apiKey = client.authentications['api-key'];
apiKey.apiKey = "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"

const tranEmailApi = new sib.TransactionalEmailsApi()

const sender = {
    email: 'moondst14@gmail.com',
    name: 'Neosaturn 🏦'
    
}


  

// const storage = multer.diskStorage({
//     destination: "./public/uploads/",

//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   });

//   const upload = multer({ storage: storage })
//   
    // const upload = multer({ storage: storage }).fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }])


const storage = multer.diskStorage({
    destination: "./public/uploads/",

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

  const upload = multer({ storage: storage }).fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }])

  router.post('/upload', upload,  async(req, res, next) => {
    try{
        console.log(req.body)

        const kyc = new Kyc({
            fullName : req.body.fullName,
            aadhaarNo : req.body.aadhaarNo,
            front : req.files.front[0].filename,
            back : req.files.back[0].filename
        })
        console.log(kyc)
        // await kyc.save()
        res.status(201).send({message: "Kyc added"})
    }
    catch(err){
        res.status(404).send({message: "Kyc not added"})
    }

  })

//   router.post('/kyc', upload, async(req, res, next) => {
//     console.log("ok")
//     // console.log(req.body)
//     // console.log(req.file)

//     try{
//         console.log(req.body)

//         const kyc = new Kyc({
//             fullName : req.body.fullName,
//             aadhaarNo : req.body.aadhaarNo,
//             front : req.files.front[0].filename,
//             back : req.files.back[0].filename
//         })
//         console.log(kyc)
//         // await kyc.save()
//         res.status(201).send({message: "Kyc added"})
//     }
//     catch(err){
//         res.status(404).send({message: "Kyc not added"})
//     }


// })

// router.post('/single', upload.single('image'), async(req, res , next) => {
    
//    console.log(req.body)
//     console.log("2",req.file)
//    res.status(201).send({statusId:200})


// })

router.get('/',async (req, res) => {
    res.status(200).send({message: "Working fine"})
})

//Save IMEI : Step 1
router.post('/saveImei', async (req, res) => {
    console.log(req.body)
    ImeiRecord.countDocuments().then(async(count_documents) =>{
        try{
            const count = (count_documents).toLocaleString('en-US', {minimumIntegerDigits: 9, useGrouping:false})
            const imeiRecord = new ImeiRecord({
                tempId: `NS-TEMP-${count}${Math.floor(10 + Math.random() * 90)}`,
                imei: Math.floor(100000000000000 + Math.random() * 900000000000000),
                createdOn:new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})

             })
             console.log(imeiRecord)
            await imeiRecord.save()
        
            res.status(201).send({userId: imeiRecord._id, tempId:imeiRecord.tempId, statusId:201, imei: imeiRecord.imei })
        }
        catch(err){
            res.status(404).send({userId: "null", tempId:"null", statusId:404, imei:"null" })
        }
	}).catch((err) => {
        res.status(404).send({message: err})
	  console.log(err.Message);
	})

})




router.post('/updatePP', async (req, res) => {
    console.log(req.body)
    try{
		const result = await Permissions.updateOne({tempId: req.body.tempId},{
        $set: {
           PP:req.body.PP
        }
    });
        res.status(201).send({message: "PP updated"})
    }
    catch(err){
        res.status(404).send({message: error})
    }
})

router.post('/updateTNC', async (req, res) => {
    console.log(req.body)
    try{
		const result = await Permissions.updateOne({tempId: req.body.tempId},{
        $set: {
           TNC:req.body.TNC
        }
    });
        res.status(201).send({message: "TNC updated"})
    }
    catch(err){
        res.status(404).send({message: error})
    }
})








//Save Permissions
router.post('/savePermissions', async (req, res) => {
    console.log(req.body)
    Permissions.countDocuments().then(async(count_documents) =>{
        try{
            console.log("object");
            const count = (count_documents).toLocaleString('en-US', {minimumIntegerDigits: 9, useGrouping:false})
            const permissions = new Permissions({
        
                tempId: req.body.tempId,
                imei:req.body.imei,
                isLocationGranted : req.body.isLocationGranted,
                isReadSmsGranted : req.body.isReadSmsGranted,
                isContactsGranted : req.body.isContactsGranted,
                isCameraGranted : req.body.isCameraGranted,
                isAudioGranted : req.body.isAudioGranted,
                PP : req.body.PP,
                TNC : req.body.TNC,
                createdOn:new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
             })
             console.log(permissions)
            await permissions.save()
            res.status(201).send({message: "Record added"})
        }
        catch(err){
            res.status(404).send({message: error})
        }
        }).catch((err) => {
        res.status(404).send({message: err})
          console.log(err.Message);
        })


})




//Get all users
router.get('/users', async (req, res) => {
            const user = await User.find().select({tokens: 0})
            if (!user) {      
                res.status(400).send({error: "No users"})
            }else{
                
                res.status(200).send(user)
            }
        })

        router.post('/checkPhone', async (req, res) => {  
            console.log(req.body.phone);
            const phone = req.body.phone;
            try{
       
                 const user = await User.findOne({
                     phone: phone,
                 })
                 if (!user) {
                     res.status(200).send({ message: "Phone not registered. Available for registeration", phone: phone, statusId: 200})
                 }else{
                     res.status(200).send({ message: "Phone is already registered",  phone: phone, statusId: 401 })
                 }
            }
            catch(error){
                          res.status(404).send({statusId: 404, message: error, phone:phone})
            }
 })



 router.post('/checkEmail', async (req, res) => {  
    console.log(req.body.email);
    const email = req.body.email;
    try{

         const user = await User.findOne({
            email: email,
         })
         if (!user) {
            const otp =(Math.floor(100000 + Math.random() * 900000)+1);
            const receivers = [
                {
                    email: email,
                }
            ]
            try{
            tranEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject:"Authenticate your email address",
                textContent:"Your email OTP is {{params.otp}}",
                params:{
                    otp:otp
                }
            }).then(console.log)
            .catch(console.log)

        }
        catch(err){
            console.log(err)
        }
             res.status(200).send({ message: "Email not registered. Available for registeration", email: email, statusId: 200, otp:otp})
         }else{
             res.status(200).send({ message: "Email is already registered",  email: email, statusId: 401})
         }
    }
    catch(error){
                  res.status(404).send({statusId: 404, message: error, email:email})
    }
})










router.post('/createUser', async (req, res) => {
   

   

    console.log(req.body)
    const code =Math.floor((Math.random()*1000000000)+1);
            const custId =`NS-${code}`;
            const text =`Your registeration details are: Customer Id: ${custId}, Full Name: ${req.body.firstName} ${req.body.middleName} ${req.body.lastName}, Phone: ${req.body.phone}, Email: ${req.body.email}`;
    const email = req.body.email
    const phone = req.body.phone
    const name = req.body.firstName
    const fatherName = req.body.fatherName
    const dob = req.body.dob
    const fullName = req.body.firstName+' '+req.body.middleName+' '+req.body.lastName
            console.log(custId)  
            
            User.countDocuments().then(async(count_documents) =>{
                try{
            
                    const user = new User({
                        customerId: custId,
                        firstName: req.body.firstName,
                        middleName: req.body.middleName,
                        lastName: req.body.lastName,
                        phone:phone,
                        email: email,
                        fatherName:fatherName,
                        dob: dob,    
                        createdOn:new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}),
                        location: req.body.location,
                        imei:req.body.imei,
                        tempId:req.body.tempId
                     })
                    await user.save()
                    try{
                    const receivers = [
                        {
                            email: email,
                        }]
              
                        tranEmailApi.sendTransacEmail({
                            sender,
                            to: receivers,
                            subject : "Congrats, {{params.name}}! You are successfully registered on Neosaturn!",
                            htmlContent: "<html><body ><p style='background:#8D32A7; font-size:14px; padding:20px;color:#fff'>Your registeration information is:</p> <br> <p>Customer Id:{{params.custId}} </p><p>Name:{{params.name}} </p><p>Email:{{params.email}} </p> <p>Phone:{{params.phone}} </p> <p>Father's Name:{{params.fatherName}} </p><p>DOB:{{params.dob}} </p></body></html>",
                            params:{
                           "name":name, "fullName": fullName, "custId":custId, "dob": dob, "fatherName": fatherName, "phone":phone, "email": email
                            }
                        }).then(console.log)
            
                    }
                    catch(err){
                        console.log(err)
                    }
                    
                    res.status(201).send({statusId:201, regId: user.customerId})
                }
                catch(error){
                    res.status(400).send({statusId:400, message: "Something went wrong. Please try again."})
                
                }
            })
    
})


router.post('/userLogin', async (req, res) => {
            const user = await User.findOne({
                phone:req.body.phone,
                email: req.body.email,
            })
            if(!user){
                res.status(401).send({ message: "Login failed"})
            }
            else{
                res.status(200).send({ message: "Login successful!"})     
            }
})


router.post('/loginPhone', async (req, res) => {
    try{
        const user = await User.findOne({
             phone: req.body.phone})
        if(!user){
        res.status(401).send({error: "Login failed! Phone not registered."})
        }
        else{
         res.status(200).send({ message: "Great! Phone is registered.!"})
        }
    }
    catch(error){
        res.status(400).send({error})
    }
})




const User = require("../models/User");
const ImeiRecord = require("../models/ImeiRecord");
const Permissions = require("../models/Permissions");
const Kyc = require("../models/Kyc");
const { send } = require('process');

module.exports = router
