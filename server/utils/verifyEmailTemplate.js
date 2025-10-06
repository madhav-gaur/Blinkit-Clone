export const verifyEmailTemplate = (name, url) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email - Blinkit Clone</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #121212;
        color: #f1f1f1;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 80%;
        margin: auto;
        background-color: #1e1e1e;
        padding: 20px;
        border: 1px solid #333;
        border-radius: 8px;
      }
      .header {
        background-color: #ffe600;
        color: #000;
        padding: 15px 20px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        border-radius: 4px;
      }
      .content {
        padding: 20px;
        font-size: 16px;
        color: #e0e0e0;
      }
      .btn {
        display: inline-block;
        padding: 12px 24px;
        margin-top: 20px;
        background-color: #00c853;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Welcome to Blinkit</div>
      <div class="content">
        <p>Hi ${name},</p>
        <p>Thank you for registering with <strong>Blinkit</strong> (Clone).</p>
        <p>Please verify your email address to activate your account:</p>
        <a class="btn" href="${url}" target="_blank">Verify Email</a>
        <p>If you did not create this account, you can safely ignore this email.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Blinkit Clone. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};
