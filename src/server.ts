import app from "./app";
import http from 'http';
import setupWebSocket from './config/socket';
import "./utils/Logger"; // Ensure logger is imported so it listens to process events
import logger from "./utils/Logger";
import { emailQueue } from "./queues/emailQueue";
import {createWorker} from "./workers/emailWorker";

const server = http.createServer(app);
const io = setupWebSocket(server);

const PORT = process.env.PORT || 5000;

// Porcess jon Queue
app.get("/failed-emails", async (req, res) => {
  const failedJobs = await emailQueue?.getFailed();
  res.json({ failedJobs });
});

// Rety failed job manually
app.post("/retry-failed-email/:jobId", async (req, res) => {
    const job = await emailQueue?.getJob(req.params.jobId);
    if (job) {
      await job.retry();
      return res.json({ message: "Email job retried" });
    }
    res.status(404).json({ message: "Job not found" });
  });

  
server.listen(PORT, async () => {
    logger.info(`Server running on port ${PORT}`);
    const worker = await createWorker()
    if (worker) {
      console.log('BullMQ worker initialized');
    } else {
      console.log('BullMQ worker is disabled (Redis is off)');
    }
});

export { io };