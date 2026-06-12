const fs = require('fs');
let p = 'app/[locale]/student/profile/page.tsx';
let content = fs.readFileSync(p, 'utf8');

// Find the real "use client"; which is not commented
const marker = '"use client";';
const parts = content.split(marker);

// Since there might be one in comments (but with // ), the first exact match of "use client"; might be the real one if it's the only one.
// Let's just find the index of "use client"; that starts the line
let lines = content.split(/\r?\n/);
let startIndex = lines.findIndex(l => l.trim() === '"use client";');

if (startIndex > -1) {
    let newLines = lines.slice(startIndex);
    let newContent = newLines.join('\n');
    
    // Add imports and useTranslations
    newContent = newContent.replace('"use client";', '"use client";\nimport { useTranslations } from "next-intl";');
    newContent = newContent.replace('export default function StudentProfilePage() {', 'export default function StudentProfilePage() {\n  const t = useTranslations("StudentProfile");');
    
    fs.writeFileSync(p, newContent);
    console.log("Fixed!");
} else {
    console.log("Could not find 'use client';");
}
