const nodemailer = require("nodemailer");

// Tạo một transporter để gửi email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anhldps30633@fpt.edu.vn",
    pass: "kimu vobx rkna mzly",
  },
});

// Hàm để gửi email
async function sendLoginEmail(userEmail) {
  try {
    // Tạo thông điệp email
    const mailOptions = {
      from: "HBD Start send with you",
      to: userEmail,
      subject: "HBD Start send with you",
      text: "Xin chào ! Bạn đã ký thành công vào hệ thống của chúng tôi.",
    };

    // Gửi email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Sử dụng hàm để gửi email khi người dùng đăng nhập
module.exports = { sendLoginEmail };
