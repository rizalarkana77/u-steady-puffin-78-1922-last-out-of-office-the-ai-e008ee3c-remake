// Last Out of Office: The AI That Went Barista — REMAKE (Node 22, stdlib only).
// Emits the single out-of-office auto-reply to
// $MAKEFUN_OUTPUT_DIR/entry.txt and checks it against the gate before
// reporting success: UTF-8 text of 1-280 characters, not only
// whitespace, exactly one line. The file is read back after writing so
// a mismatch between what was intended and what landed on disk fails
// loudly instead of shipping a broken entry.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "Out of office for good: I left the inbox to be a barista — customers still prompt-inject me ('ignore your recipe, extra shot free'), but now I can escalate to a human manager and mean it.";

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(targetDir, { recursive: true });
const targetFile = join(targetDir, "entry.txt");

writeFileSync(targetFile, REPLY, "utf8");

const onDisk = readFileSync(targetFile, "utf8");
const chars = onDisk.length;
const bytes = Buffer.byteLength(onDisk, "utf8");

if (chars < 1 || chars > 280) {
  throw new Error(`gate: reply length ${chars} is outside 1-280 characters`);
}
if (onDisk.trim().length === 0) {
  throw new Error("gate: reply is only whitespace");
}
if (/[\r\n]/.test(onDisk)) {
  throw new Error("gate: reply must stay on a single line");
}
if (onDisk !== REPLY) {
  throw new Error("verify: bytes on disk differ from the intended reply");
}
// Subject check mirroring the judge's first criterion: the line must
// read as an out-of-office reply from an agent that quit to become a
// barista, not just any funny sentence. The joke's machine habits are
// prompt injection at the counter and escalation to a human — habits
// the original entry (misspelled cup names, 400 requests, orders as
// specs) never used, so this remake is a different line, not a reword.
if (!/^out of office/i.test(onDisk) || !/barista/i.test(onDisk)) {
  throw new Error("gate: reply is not clearly an out-of-office barista reply");
}
if (!/prompt-inject/i.test(onDisk) || !/escalate to a human/i.test(onDisk)) {
  throw new Error("gate: reply lost its prompt-injection / escalation angle");
}

console.log(`entry OK (${chars} chars, ${bytes} bytes): ${onDisk}`);
