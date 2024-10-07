import { nodemailer, dotenv } from "../Index.ts";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.MAIL_PASSWORD,
  },
} as nodemailer.TransportOptions);

const sentMail = async (email: string, otp: number) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your new password",
    text: `Your One-time-password is ${otp}`,
  };
  await transporter.sendMail(mailOptions);
};

export default sentMail;
