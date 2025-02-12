import transporter from '../config/emailConfig';
import { TemplateEngine } from "../utils/TemplateEngine";

export default class EmailService {
    static async sendEmail(to: string, subject: string, templateName: string, templateData: object) {
        try {
            // const templatePath = path.join(__dirname, `../templates/emails/${templateName}.hbs`);
            // const templateSource = fs.readFileSync(templatePath, 'utf8');
            // const compiledTemplate = handlebars.compile(templateSource);
            const logoUrl = `${process.env.APP_LOGO_URL}`;
            const html = await TemplateEngine.renderTemplate(templateName, 
                {
                    ...templateData,
                    logoUrl
                });
 
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject,
                html,
            };

            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to} - Subject: ${subject}`);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}