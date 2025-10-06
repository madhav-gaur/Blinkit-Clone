import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.RESEND_API) console.log("Provide RESEND_API");

const resend = new Resend(process.env.RESEND_API);

export const sendEmail = async ({ name, sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Blinkit <onboarding@resend.dev>",
      to: sendTo,
      subject,
      html,
    });
    return data
  } catch (error) {
    console.log(error);
  }
};

await resend.emails.send({});
