const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
const conn = require('./connection');
const { text } = require('body-parser');
const port = 5555


app.post('/userregister', (req, res) => {
    const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };

    const hashedpassword = bcrypt.hashSync(data.password, 10);
    data.password = hashedpassword;

    
    conn.query("INSERT INTO users SET ?", data, (err, result) => {
        if (err) throw err;

       
        const token = jwt.sign({ id: result.insertId }, 'secretkey', { expiresIn: '1h' });

        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kajalmodi001@gmail.com',
                pass: 'orhj kfva mjhi claz'
            }
        });

        
        const mailOptions = {
            from: 'kajalmodi001@gmail.com',
            to: data.email,
            subject: 'Email verification',
            text: `Please verify your email by clicking the following link: http://localhost:5555/verify-email?token=${token}`
        };

        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.send({
                    message: 'Error sending verification email',
                    error
                });
            }
            return res.send({
                message: 'User registered successfully. Please check your email for verification.'
            });
        });
    });
});



app.get('/verify-email', (req, res) => {
    const { token } = req.query;
    try {
      const decoded = jwt.verify(token, 'secretkey');
      conn.query('UPDATE users SET email_verified = ? WHERE id = ?', [true, decoded.id], (err, result) => {
        if (err) throw err;
        res.send('Email verified successfully');
      });
    } catch (err) {
      res.send({ 
        message: 'Invalid or expired token' 
    });
    }
});



app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    conn.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
      if (err) throw err;
      if (result.length === 0) return res.send({ message: 'User not found' });
  
      const user = result[0];
      if (!user.email_verified) {
        return res.send({ message: 'Email not verified' });
      }
  
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) return res.send({ message: 'Invalid password' });
  
        if (user.role !== 'admin') {
          return res.send({ message: 'You are not allowed to login from here' });
        }
  
        const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
        res.send({ message: 'Login successful', token });
      });
    });
  });



app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
