// import * as ejs from "ejs";
// import { Injectable } from "@nestjs/common";
// import { MailerOptions } from "@nestjs-modules/mailer";
// import Mail from "nodemailer/lib/mailer";
// // import { MailOptions } from "nodemailer";

// @Injectable()
// export class EjsAdapter {
//   compile(
//     // mail: MailOptions,
//     mail: Mail,
//     callback: any,
//     mailerOptions: MailerOptions,
//   ): void {
//     const templateExt = "ejs"; // You can change the file extension if needed
//     const templateName = mail.template + "." + templateExt;

//     const templatePath = `${mailerOptions.template?.dir}/${templateName}`;

//     ejs.renderFile(templatePath, mail.context, (err, html) => {
//       if (err) {
//         return callback(err);
//       }
//       callback(null, {
//         html,
//         text: html, // Ejs doesn't support plain text, so use the HTML as text
//       });
//     });
//   }
// }
