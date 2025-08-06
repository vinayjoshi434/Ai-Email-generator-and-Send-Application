
import nodemailer from 'nodemailer'



const sendmail = async (req, res) => {
    console.log("send controller hit");

    const { to, subject, body } = req.body;
    const formattedBody = body
        .split("\n")
        .map(line => `<p>${line}</p>`)
        .join("");
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.APP_PASSWORD,
            },
        });


        await transporter.sendMail({
            from: `"AI Mailer" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: formattedBody,
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
}

export { sendmail }