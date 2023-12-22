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

const sendConfirmationEmail = async (userEmail) => {
    const mailOptions = {
        from: applicationEmail,
        to: userEmail,
        subject: 'Application Confirmation',
        text: 'Thank you for submitting your application. We have forwarded your CV to the company.',
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};

const sendCVToCompany = async (companyEmail, resumeBuffer) => {
    const mailOptions = {
        from: applicationEmail,
        to: companyEmail,
        subject: 'New Job Application',
        text: 'A new job application has been received. Please find the attached CV.',
        attachments: [
            {
                filename: 'resume.pdf',
                content: resumeBuffer,
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('CV sent to company successfully');
    } catch (error) {
        console.error('Error sending CV to company:', error);
    }
};

module.exports = {
    sendConfirmationEmail,
    sendCVToCompany,
};
