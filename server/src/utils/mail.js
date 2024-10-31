import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import CONFIG from '../config/config.js'

// reusable function to send mail with templates
async function sendMail(options) {
    try {

        let mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                // Appears in header & footer of e-mails
                name: 'AIR INNOVATORS',
                link: 'https://www.airinnovators.in/'
                // Optional product logo
                // logo: 'https://mailgen.js/img/logo.png'
            }
        });

        const gmailTransporter = nodemailer.createTransport({
            host: CONFIG.SMTP_HOST,
            port: CONFIG.SMTP_PORT,  // 587 recommended TLS Port
            secure: false,          // if Port is 587, set 'secure' to 'false'
            auth: {
                user: CONFIG.SMTP_USER,
                pass: CONFIG.SMTP_PASS
            }
        });

        // Generate an HTML email with the provided contents
        var emailBody = mailGenerator.generate(options.mailgenContent);

        // Generate the plaintext version of the e-mail (for clients that do not support HTML)
        var emailText = mailGenerator.generatePlaintext(options.mailgenContent);

        const mailOptions = {
            from: 'irfan.i.ahmed@gmail.com',
            to: options.email,
            subject: options.subject,
            html: emailBody,
            text: emailText
        };

        const info = await gmailTransporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);

    } catch (error) {
        console.log(error)
    }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to AIR INNOVATORS! We\'re very excited to have you on board.',
            action: {
                instructions: 'To verify your email, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify your email',
                    link: verificationUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}


const forgotPasswordMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to AIR INNOVATORS! We\'re very excited to have you on board.',
            action: {
                instructions: 'To verify your email, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify your email',
                    link: verificationUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}



export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendMail
}