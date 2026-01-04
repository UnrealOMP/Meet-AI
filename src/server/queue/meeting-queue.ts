type Job = {
  type: "transcribe";
  meetingId: string;
  userId: string;
};

const queue: Job[] = [];
let running = false;

export function enqueue(job: Job) {
  // Prevent duplicate jobs for the same meeting
  const existingJob = queue.find(
    (j) => j.type === job.type && j.meetingId === job.meetingId
  );
  if (existingJob) return;
  
  queue.push(job);
  runQueue();
}

async function runQueue() {
  if (running) return;
  running = true;

  while (queue.length) {
    const job = queue.shift()!;

    try {
      console.log("...", job);
      const { transcribeMeeting } = await import(
        "@/server/actions/transcribe-meeting"
      );

      await transcribeMeeting(job.meetingId);
      console.log("✅ Queue job completed successfully");
    } catch (err) {
      console.error("❌ Queue job failed:", err);
    }
  }

  running = false;
}
