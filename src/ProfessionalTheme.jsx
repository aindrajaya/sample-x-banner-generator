import React, { useState } from 'react';

const LinkedInBannerGenerator = () => {
  const [userName, setUserName] = useState('');
  const [userHeadline, setUserHeadline] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const handleGenerateBanner = () => {
    // Validate input
    if (!userName || !userHeadline) {
      alert('Please enter both Name and Headline.');
      return;
    }

    // Call the banner generation function with the uploaded image file
    generateLinkedInBanner(userName, userHeadline, bannerImage);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Update banner preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBannerPreview(null);
    }

    setBannerImage(file);
  };

  const generateLinkedInBanner = (name, headline, bannerImage) => {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 1584; // LinkedIn banner width
    canvas.height = 396; // LinkedIn banner height
    const ctx = canvas.getContext('2d');
  
    // Draw uploaded image on the canvas
    if (bannerImage) {
      const img = new Image();
      img.onload = function () {
        // Draw the image first
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
        // Customize text styling
        ctx.fillStyle = '#ffffff'; // White text color
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
  
        // Draw user's name on the canvas
        ctx.fillText(name, canvas.width / 2, canvas.height / 2 - 30);
  
        // Customize text styling for headline
        ctx.font = '24px Arial';
  
        // Draw user's headline on the canvas
        ctx.fillText(headline, canvas.width / 2, canvas.height / 2 + 30);
  
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL('image/png');
  
        // Update banner preview
        setBannerPreview(dataURL);
      };
      img.src = URL.createObjectURL(bannerImage);
    } else {
      alert('Please upload a banner image.');
    }
  };

  return (
    <div>
      <label htmlFor="userName">Name:</label>
      <input
        type="text"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />

      <label htmlFor="userHeadline">Headline:</label>
      <input
        type="text"
        id="userHeadline"
        value={userHeadline}
        onChange={(e) => setUserHeadline(e.target.value)}
        required
      />

      <label htmlFor="bannerImage">Upload Banner Image:</label>
      <input type="file" id="bannerImage" onChange={handleImageChange} />

      <button type="button" onClick={handleGenerateBanner}>
        Generate LinkedIn Banner
      </button>

      {/* Display banner preview */}
      {bannerPreview && (
        <div>
          <h2>Banner Preview</h2>
          <img src={bannerPreview} alt="LinkedIn Banner Preview" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default LinkedInBannerGenerator;
