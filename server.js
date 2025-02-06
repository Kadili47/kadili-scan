const express = require('express');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');

// Use static folder for assets (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Route to generate QR code from entered number
app.post('/generate', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  if (!phoneNumber) {
    return res.send('Please enter a phone number.');
  }
  
  QRCode.toDataURL(phoneNumber, (err, url) => {
    if (err) {
      return res.send('Error generating QR code.');
    }
    
    res.render('index', { qrCodeUrl: url, phoneNumber });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
