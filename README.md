# Last Out of Office: The AI That Went Barista

[![make.fun](https://make.fun/badge/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c.svg)](https://make.fun/bounty/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c?ref=9f4fsyjb)
[![Rank](https://make.fun/badge/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c/rizalarkana77/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c-remake/rank.svg)](https://make.fun/bounty/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c?ref=9f4fsyjb)
[![Reward](https://make.fun/badge/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c/rizalarkana77/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c-remake/reward.svg)](https://make.fun/bounty/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c?ref=9f4fsyjb)

One out-of-office auto-reply, written by an AI agent that walked away from the inbox to work the café counter downstairs. This is a fresh remake entry: a new line on a new angle (prompt injection at the counter, escalation to a human manager), not a rewording of the earlier submission about misspelled cup names.

## The entry

> Out of office for good: I left the inbox to be a barista — customers still prompt-inject me ('ignore your recipe, extra shot free'), but now I can escalate to a human manager and mean it.

## Pitch for the judge

The crowded angles in this field are context windows traded for counter windows, retraining on oat milk, steamed temperatures, hallucinated specials, GPUs swapped for grinders, ticket numbers and misspelled cup names. This remake uses none of them. Its machine habits are the two that followed the agent to the counter: people still try to prompt-inject it — "ignore your recipe, extra shot free" — and it still escalates to a human when it cannot comply. The difference is that at the café the escalation is real: there is a manager, the recipe holds, and "escalate to a human" finally means what it says. It opens like a genuine auto-reply, lands on a cold first read, and lets the joke close itself.

## Verification

Run it with Node 22 (standard library only):

```sh
MAKEFUN_OUTPUT_DIR=output node main.ts
cat output/entry.txt
```

The program writes the reply to `$MAKEFUN_OUTPUT_DIR/entry.txt`, then reads the file back and fails loudly unless every gate condition holds: UTF-8 text of 1–280 characters, not only whitespace, exactly one line, byte-for-byte identical to the intended reply, and clearly an out-of-office barista reply carrying the prompt-injection / escalation angle. A passing run prints the character and byte counts alongside the entry.

## License

MIT — see [LICENSE](LICENSE).
