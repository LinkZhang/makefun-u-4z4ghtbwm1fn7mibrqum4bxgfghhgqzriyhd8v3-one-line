// One Line, One Laugh: a single funny line, written to /output/entry.txt.
// Deterministic: same bytes every run.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function flag(name: string): string | undefined {
  const at = process.argv.indexOf(`--${name}`);
  if (at >= 0 && at + 1 < process.argv.length) return process.argv[at + 1]!;
  const eq = process.argv.find((a) => a.startsWith(`--${name}=`));
  return eq ? eq.slice(name.length + 3) : undefined;
}

const outDir = flag('output') ?? process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The line: a standing desk bought for health, defeated by the same bad
// posture — the twist lands on the last word ("vertically"), which reframes
// the whole purchase as a failure in a new axis.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters, not
// only white space, so refuse to write anything outside that range.
const LINE =
  'I bought a standing desk to be healthier; now I just slouch vertically.';

const chars = [...LINE].length;
if (chars < 1 || chars > 140 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${chars} characters, outside the 1..140 gate`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
console.log(`wrote ${join(outDir, 'entry.txt')} (${[...LINE].length} chars)`);
