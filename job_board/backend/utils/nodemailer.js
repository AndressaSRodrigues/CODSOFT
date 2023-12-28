const nodemailer = require('nodemailer');
const { emailPassword, applicationEmail } = require('../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: applicationEmail,
        pass: emailPassword,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const sendConfirmationEmail = async (userEmail, companyName) => {
    const mailOptions = {
        from: applicationEmail,
        to: userEmail,
        subject: 'Application Confirmation',
        text: `Thank you for submitting your application. We have forwarded your CV to ${companyName}.`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};

const sendCVToCompany = async (companyEmail, resumeBuffer, applicationDetails) => {
    const mailOptions = {
        from: applicationEmail,
        to: companyEmail,
        subject: 'New Job Application',
        text: `${applicationDetails}. Please find the attached CV.`,
        attachments: [
            {
                filename: 'resume.pdf',
                content: resumeBuffer,
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending CV to company:', error);
    }
};

module.exports = {
    sendConfirmationEmail,
    sendCVToCompany,
};
