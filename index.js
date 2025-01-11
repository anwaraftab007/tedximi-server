const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
//const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,       // Access from .env
        pass: process.env.EMAIL_PASSWORD, // Access from .env
    },
});

// Route to handle form submission
app.post('/submit', upload.single('screenshot'), async (req, res) => {
    try {
        const { name, email, rollNo } = req.body;

        if (!name || !email || !rollNo || !req.file) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Email options
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `Form Submission with Screenshot`,
            text: `Form submission details are:\nName: ${name}\nEmail: ${email}\nRoll No: ${rollNo}\n\nAttached is your screenshot.`,
            attachments: [
                {
                    filename: req.file.originalname,
                    path: req.file.path,
                },
            ],
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Remove file after sending email
        fs.unlinkSync(req.file.path);

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

// Ensure the uploads directory exists
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
