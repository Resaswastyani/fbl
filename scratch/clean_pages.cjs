const fs = require('fs');

function cleanBacktest() {
  const path = 'd:/laragon/www/FBL/app/[locale]/robot-trading/backtest/page.tsx';
  let lines = fs.readFileSync(path, 'utf8').split('\n');

  // Find the start of const robots
  const robotsStartIdx = lines.findIndex(l => l.includes('const robots = ['));
  if (robotsStartIdx !== -1) {
    // Delete from line 41 (idx 40) to robotsStartIdx
    lines.splice(41, robotsStartIdx - 41);
  }

  // Find RobotTradingSection
  const robotTradingIdx = lines.findIndex(l => l.includes('export const RobotTradingSection = () => {'));
  if (robotTradingIdx !== -1) {
    lines.splice(robotTradingIdx);
    lines.push('');
    lines.push('export default function BacktestPage() {');
    lines.push('  return (');
    lines.push('    <main className="min-h-screen bg-white overflow-hidden pt-20 pb-20">');
    lines.push('      <BacktestSection />');
    lines.push('    </main>');
    lines.push('  );');
    lines.push('}');
    lines.push('');
  }

  fs.writeFileSync(path, lines.join('\n'));
  console.log('backtest/page.tsx cleaned!');
}

function cleanGiveaway() {
  const path = 'd:/laragon/www/FBL/app/[locale]/robot-trading/giveaway/page.tsx';
  let lines = fs.readFileSync(path, 'utf8').split('\n');

  // Find the start of the active code "use client"
  const useClientIdx = lines.findLastIndex(l => l.includes('"use client";') && !l.startsWith('//'));
  if (useClientIdx !== -1 && useClientIdx > 0) {
    // Delete commented out block from start
    lines.splice(0, useClientIdx);
  }

  // Find the start of const robots (where we want to cut off for giveaway)
  const robotsStartIdx = lines.findIndex(l => l.includes('const robots = ['));
  if (robotsStartIdx !== -1) {
    // Delete from robots to the end
    lines.splice(robotsStartIdx);
    lines.push('');
    lines.push('export default function GiveawayPage() {');
    lines.push('  return (');
    lines.push('    <main className="min-h-screen bg-gradient-to-b from-[#0a0f2e] to-[#111A4A] overflow-hidden pt-10">');
    lines.push('      <FreeTrialSection />');
    lines.push('    </main>');
    lines.push('  );');
    lines.push('}');
    lines.push('');
  }

  fs.writeFileSync(path, lines.join('\n'));
  console.log('giveaway/page.tsx cleaned!');
}

cleanBacktest();
cleanGiveaway();
