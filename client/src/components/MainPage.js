import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Axios from 'axios';
import './main.css'

const MainPage = () => {
  const [qrValue, setQrValue] = useState('');
  const [generatedQRCode, setGeneratedQRCode] = useState(null);

  const handleInputChange = (e) => {
    setQrValue(e.target.value);
  };

  const generateQRCode = async () => {
    if (qrValue.trim() !== '') {
      setGeneratedQRCode(qrValue);

      // Send the QR code value to the backend and save it
      await Axios.post('https://qr-code-app-server.vercel.app/qrcodes', { content: qrValue })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error saving QR code:', error);
        });
      
        setQrValue('');
    } else {
      alert('Please enter a valid QR code value.');
    }
  };

  return (
    <div className='main-div'>
      <header className='container'>
        <p className='title'>Scan my QR</p>
        <input
          type="text"
          placeholder="Enter QR code value"
          value={qrValue}
          onChange={handleInputChange}
          className='input-box'
        />
        {generatedQRCode && <QRCodeSVG value={generatedQRCode} size={256} className='qr-code-img'/>}
        <button onClick={generateQRCode}>Generate QR Code</button>
        
      </header>
    </div>
  );
};

export default MainPage;
