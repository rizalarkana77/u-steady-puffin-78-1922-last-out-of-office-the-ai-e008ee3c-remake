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

// The gate as a rule table: [label, predicate]. Rules run in order and
// the first failure names itself, so a broken edit points at the exact
// contract it broke instead of a generic "invalid entry".
const RULES = [
  ["length within 1-280 characters", (t) => t.length >= 1 && t.length <= 280],
  ["not only whitespace", (t) => t.trim().length > 0],
  ["stays on a single line", (t) => !/[\r\n]/.test(t)],
  ["bytes on disk match the intended reply", (t) => t === REPLY],
  // Subject checks mirror the judge's first criterion: an out-of-office
  // reply from an agent that quit to become a barista, carrying the
  // prompt-injection / escalation angle the original never used.
  ["reads as an out-of-office barista reply", (t) => /^out of office/i.test(t) && /barista/i.test(t)],
  ["keeps the prompt-injection / escalation angle", (t) => /prompt-inject/i.test(t) && /escalate to a human/i.test(t)],
];

for (const [label, ok] of RULES) {
  if (!ok(onDisk)) {
    throw new Error(`gate: ${label}`);
  }
}

console.log(`entry OK (${chars} chars, ${bytes} bytes): ${onDisk}`);
