const fs = require('fs');
const path = require('path');

const origPath = path.join('app', '[locale]', 'robot-trading', 'page.tsx');
const orig = fs.readFileSync(origPath, 'utf-8');

fs.mkdirSync(path.join('app', '[locale]', 'robot-trading', 'giveaway'), { recursive: true });
fs.mkdirSync(path.join('app', '[locale]', 'robot-trading', 'backtest'), { recursive: true });

let backtestCode = orig.replace('export default function RobotTrading() {', 'export default function BacktestPage() {');
backtestCode = backtestCode.replace(/return \(\s+<main[\s\S]*?<Footer \/>\s+<\/main>\s+\);/, 
  'return (<main className="min-h-screen bg-gradient-to-b from-[#0a0f2e] to-[#111A4A] overflow-hidden pt-20 pb-16"><BacktestSection /></main>);'
);
fs.writeFileSync(path.join('app', '[locale]', 'robot-trading', 'backtest', 'page.tsx'), backtestCode);

let giveawayCode = orig.replace('export default function RobotTrading() {', 'export default function GiveawayPage() {');
giveawayCode = giveawayCode.replace(/return \(\s+<main[\s\S]*?<Footer \/>\s+<\/main>\s+\);/, 
  'return (<main className="min-h-screen bg-gradient-to-b from-[#0a0f2e] to-[#111A4A] overflow-hidden pt-10"><FreeTrialSection /></main>);'
);
fs.writeFileSync(path.join('app', '[locale]', 'robot-trading', 'giveaway', 'page.tsx'), giveawayCode);

let mainCode = orig.replace(/<div id="giveaway"[\s\S]*?<FreeTrialSection \/>\s+<\/div>/, '');
mainCode = mainCode.replace(/<div id="backtest"[\s\S]*?<BacktestSection \/>\s+<\/div>/, '');
fs.writeFileSync(origPath, mainCode);

console.log('Done!');
