import { Worker, Job } from "bullmq";
import { useRedis, redisConnection } from "../config/redisConfig";
import EmailService from "../services/EmailService";

export async function createWorker(): Promise<Worker | null> {
  if (!useRedis || redisConnection == undefined) {
    console.log("Workers are disabled");
    return null;
  }
  const emailWorker = new Worker(
    "emailQueue",
    async (job: Job) => {
      try {
        const { to, subject, template, data } = job.data;
        await EmailService.sendEmail(to, subject, template, data);
      } catch (error) {
        console.error(`❌ Error sending email to ${job.data.to}:`, error);
        throw error; // BullMQ will handle retries
      }
    },
    {
      connection: redisConnection,
    }
  );

  // Log successful jobs
  emailWorker.on("completed", (job) => {
    console.log(`✅ Successfully sent email to ${job.data.to}`);
  });

  // Log failed jobs after max attempts
  emailWorker.on("failed", async (job, err) => {
    if (!job) {
      console.error("Job failed, but job details are unavailable:", err);
      return;
    }
    console.error(
      `❌ Failed to send email to ${job?.data?.to} after retries:`,
      err
    );

    // Move job to a Dead Letter Queue (DLQ) for further investigation
    if (job.attemptsMade >= 3) {
      await job.moveToFailed(
        new Error("Max retries reached"),
        job.token ?? "default-token"
      );
    }
  });
  return emailWorker;
}
