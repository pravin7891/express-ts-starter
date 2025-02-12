import { Queue } from "bullmq";
import { redisConnection } from "../config/redisConfig";
import EmailService from "../services/EmailService";

export const emailQueue = redisConnection ? new Queue("emailQueue", redisConnection) : null;

export const addEmailToQueue = async (to: string, subject: string, template: string, data: any) => {
  if(emailQueue && redisConnection){
    await emailQueue.add("sendEmail", { to, subject, template, data }, { attempts: 3, backoff: { type: "exponential", delay: 5000 }});
  } else {
    console.log('Redis disabled: Sending email synchronously...');
    await EmailService.sendEmail(to, subject, template, data);
  };
};
