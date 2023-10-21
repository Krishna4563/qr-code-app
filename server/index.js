const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const QRCode = require('../server/models/qrcodemodel');
const userModel = require('../server/models/loginmodel')
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// API Endpoints
app.post('/qrcodes', async (req, res) => {
  try {
    const { content } = req.body;
    const newQRCode = new QRCode({ content: content });
    await newQRCode.save();
    res.status(201).json({ message: 'QR code saved successfully' });
  } catch (error) {
    console.error('Error saving QR code:', error);
    res.status(500).json({ error: 'An error occurred while saving the QR code' });
  }
});



app.get('/qrcodes', async (req, res) => {
  try {
    const qrCodes = await QRCode.find();
    res.json(qrCodes);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching QR codes' });
  }
});

app.delete('/qrcode/:id', async (req,res)=> {
  try{
    const deletedItems = await QRCode.findByIdAndDelete(req.params.id)
    res.status(200).json("Item Deleted Successfully")
  }catch(err){
    console.log(err)
  }
})

// // Auth login/register API endpoints
// const secretKeyUser = 'S3cr3tk3ylogin';

// const generateJwtUser = (user) => {
//   const payload = { username: user.username };
//   return jwt.sign(payload, secretKeyUser, { expiresIn: '1h' });
// };

// const authenticateJwtUser = (req, res, next) => {
//   // Extract the token from the request headers
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.sendStatus(403);
//   }

//   jwt.verify(token, secretKeyUser, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   });
// };

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const newQRCode = new userModel({ username: username , password: password});
  await newQRCode.save();
  res.status(200).json({ message: "Logged in Successfully!"});
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
