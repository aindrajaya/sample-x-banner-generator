export const drawBackgroundUtils = (canvasRef, color) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export const drawImageUtils = (ctx, canvas, image) => {
  const img = new Image();
  img.src = image;
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
};

export const drawTextOccupancyUtils = (ctx, occupation, canvasHeight, cw, ch, type) => {
  ctx.fillStyle = "black";
  ctx.font = "48px Arial";
  if(type === "pro"){
    (canvasHeight < 500) ? ctx.fillText(occupation, cw, ch+5) : ctx.fillText(occupation, cw, ch);
  } else {
    (canvasHeight < 500) ? ctx.fillText(occupation, cw+200, ch) : ctx.fillText(occupation, cw+200, ch+20);
  }
};

export const drawNameUtils = (ctx, name, cw, ch, type) => {
  ctx.fillStyle = "black";
  ctx.font = "64px Arial";
  if(type === "pro"){
    ctx.fillText(name, cw, ch);
  } else {
    ctx.fillText(name, cw+70, ch);
  }
}

// Phone Component
const drawPhone = (ctx, canvas, phoneIconProps, svgString) => {
  const phoneLogo = new Image();
  const dataUriPhone = `data:image/svg+xml;base64,${btoa(svgString)}`;
  phoneLogo.src = dataUriPhone;
  phoneLogo.onload = () => {
    ctx.drawImage(
      phoneLogo,
      canvas.width / 2.5,
      canvas.height / 1.5 - 20,
      phoneIconProps.width,
      phoneIconProps.height
    );
  };
};

// Email Component
const drawEmail = (ctx, canvas, mailIconProps, svgString) => {
  const mailLogo = new Image();
  const dataUriMail = `data:image/svg+xml;base64,${btoa(svgString)}`;
  mailLogo.src = dataUriMail;
  mailLogo.onload = () => {
    ctx.drawImage(
      mailLogo,
      canvas.width / 1.75,
      canvas.height / 1.5 - 20,
      mailIconProps.width,
      mailIconProps.height
    );
  };
};

// Twitter Component
const drawTwitter = (ctx, canvas, twitterIconProps, svgString) => {
  const twitterLogo = new Image();
  const dataUri = `data:image/svg+xml;base64,${btoa(svgString)}`;
  twitterLogo.src = dataUri;
  twitterLogo.onload = () => {
    ctx.drawImage(
      twitterLogo,
      canvas.width / 1.3,
      canvas.height / 1.5 - 20,
      twitterIconProps.width,
      twitterIconProps.height
    );
  };
};

export const drawAdditionalInforUtils = (
  ctx, 
  canvas, 
  phone='+1 000 0000 0000', 
  email='youremail@mail.com', 
  socialhandler='@youraccount',
  size, 
  font, 
  textColor
) => {
  // Example SVG strings, replace these with your actual SVG strings
  const phoneIconProps = {
    width: 30,
    height: 30,
    fill: 'red',
  };

  const mailIconProps = {
    width: 30,
    height: 30,
    fill: 'black',
  };

  const twitterIconProps = {
    width: 30,
    height: 30,
    fill: 'green',
  };

  const phoneSvgString = `
  <svg
    width=${phoneIconProps.width}
    height=${phoneIconProps.height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.00655 7.93309C3.93421 9.84122 4.41713 13.0817 7.6677 16.3323C8.45191 17.1165 9.23553 17.7396 10 18.2327M5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C15.2529 20.0243 14.1963 19.9541 13 19.6111"
      stroke=${phoneIconProps.fill}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
  `;
  const mailSvgString = `
  <svg
    width=${mailIconProps.width}
    height=${mailIconProps.height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 8L17.4392 9.97822C15.454 11.0811 14.4614 11.6326 13.4102 11.8488C12.4798 12.0401 11.5202 12.0401 10.5898 11.8488C9.53864 11.6326 8.54603 11.0811 6.5608 9.97822L3 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill=${mailIconProps.fill}
    />
  </svg>
  `;
  const twitterSvgString = `
  <svg
    fill=${twitterIconProps.fill}
    width=${twitterIconProps.width}
    height=${twitterIconProps.height}
    viewBox="0 0 1920 1920"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1920 311.856c-70.701 33.769-146.598 56.47-226.221 66.86 81.317-52.517 143.774-135.529 173.252-234.691-76.236 48.678-160.716 84.028-250.391 103.002-71.718-82.56-174.268-134.06-287.435-134.06-217.75 0-394.165 189.966-394.165 424.206 0 33.318 3.614 65.619 10.165 96.678C617.9 616.119 327.304 447.385 133.045 190.67c-33.77 62.57-53.309 135.53-53.309 213.233 0 147.162 91.031 276.818 196.744 353.054-64.602-2.26-157.101-21.46-157.101-53.309v5.648c0 205.327 114.41 376.658 294.55 415.849-32.978 9.487-78.38 14.795-114.409 14.795-25.412 0-55.454-2.71-79.624-7.793 50.26 168.509 193.13 291.163 365.478 294.777-134.852 113.506-306.07 181.383-490.616 181.383-31.85 0-64.038-2.033-94.758-5.873 174.494 120.17 381.176 190.532 603.67 190.532 724.97 0 1121.055-646.136 1121.055-1206.55 0-18.41-.452-36.932-1.356-55.116 77.026-59.746 143.887-134.4 196.631-219.444"
      fillRule="evenodd"
    />
  </svg>
  `;

  // Draw phone
  drawPhone(ctx, canvas, phoneIconProps, phoneSvgString);
  ctx.fillStyle = textColor;
  ctx.font = `${size} ${font}`;
  ctx.fillText(phone, canvas.width / 2.38, canvas.height / 1.5);

  // Draw email
  drawEmail(ctx, canvas, mailIconProps, mailSvgString);
  ctx.fillStyle = textColor;
  ctx.font = `${size} ${font}`;
  ctx.fillText(email, canvas.width / 1.68, canvas.height / 1.5);

  // Draw twitter
  drawTwitter(ctx, canvas, twitterIconProps, twitterSvgString);
  ctx.fillStyle = textColor;
  ctx.font = `${size} ${font}`;
  ctx.fillText(socialhandler, canvas.width / 1.26, canvas.height / 1.5);
};

export const drawCircularImage = (ctx, image, x, y, radius) => {
  const centerX = x + radius;
  const centerY = y + radius;

  const imagePhoto = new Image();
  imagePhoto.src = URL.createObjectURL(image);
  imagePhoto.onload = () => {
    ctx.save();  // Save the current canvas state
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.clip();  // Clip the canvas to the circle
    ctx.drawImage(imagePhoto, x, y, 2 * radius, 2 * radius);
    ctx.restore();  // Restore the canvas state
  };
};