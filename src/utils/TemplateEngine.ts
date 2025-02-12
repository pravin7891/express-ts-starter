import fs from "fs-extra";
import handlebars from "handlebars";
import path from "path";

export class TemplateEngine {
  static async renderTemplate(templateName: string, data: Record<string, any>): Promise<string> {
    const templatePath = path.join(__dirname, "../templates/emails/", `${templateName}.hbs`);
    const templateSource = await fs.readFile(templatePath, "utf8");
    const template = handlebars.compile(templateSource);
    return template(data);
  }
}
