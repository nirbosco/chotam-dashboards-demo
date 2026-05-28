import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OUT_DIR = resolve(__dirname, '../../../../O-output/מכרז-מישרים/_dashboards/screenshots');
const BASE_URL = 'http://localhost:5173';

const VIEWPORT = { width: 1480, height: 1080, deviceScaleFactor: 2 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: VIEWPORT
  });
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  // Set RTL and Hebrew locale
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'he-IL,he;q=0.9' });

  // --- AUTHORITY VIEW ---
  console.log('Authority: תמונת מצב');
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  await sleep(2000);

  // Full page screenshot of overview tab
  await page.screenshot({
    path: `${OUT_DIR}/01-authority-overview-full.png`,
    fullPage: true
  });

  // Just the top portion (hero + KPIs + tab + first part of table)
  await page.screenshot({
    path: `${OUT_DIR}/02-authority-overview-top.png`,
    clip: { x: 0, y: 0, width: 1480, height: 1080 }
  });

  // Click "דופק רשותי" tab
  console.log('Authority: דופק רשותי');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const target = buttons.find((b) => b.textContent.trim() === 'דופק רשותי');
    if (target) target.click();
  });
  await sleep(1500);
  await page.screenshot({
    path: `${OUT_DIR}/03-authority-pulse-full.png`,
    fullPage: true
  });

  // Click "מגמות והשוואה"
  console.log('Authority: מגמות והשוואה');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const target = buttons.find((b) => b.textContent.trim() === 'מגמות והשוואה');
    if (target) target.click();
  });
  await sleep(1500);
  await page.screenshot({
    path: `${OUT_DIR}/04-authority-compare-full.png`,
    fullPage: true
  });

  // --- PRINCIPAL VIEW ---
  console.log('Principal: full');
  // Back to overview, then click on Ben Zvi row
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const target = buttons.find((b) => b.textContent.trim().includes('מבט מנהלת'));
    if (target) target.click();
  });
  await sleep(2000);

  await page.screenshot({
    path: `${OUT_DIR}/05-principal-full.png`,
    fullPage: true
  });

  // Top of principal view (hero + today + week)
  await page.screenshot({
    path: `${OUT_DIR}/06-principal-top.png`,
    clip: { x: 0, y: 0, width: 1480, height: 1080 }
  });

  // Scroll to leading team section
  await page.evaluate(() => window.scrollTo(0, 800));
  await sleep(600);
  await page.screenshot({
    path: `${OUT_DIR}/07-principal-team.png`,
    clip: { x: 0, y: 0, width: 1480, height: 1080 }
  });

  // Scroll to dimensions
  await page.evaluate(() => window.scrollTo(0, 1900));
  await sleep(600);
  await page.screenshot({
    path: `${OUT_DIR}/08-principal-dimensions.png`,
    clip: { x: 0, y: 0, width: 1480, height: 1080 }
  });

  // --- AGENT placeholder ---
  console.log('Agent placeholder');
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(300);
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const target = buttons.find((b) => b.textContent.trim() === 'סוכן חכם');
    if (target) target.click();
  });
  await sleep(1000);
  await page.screenshot({
    path: `${OUT_DIR}/09-agent-placeholder.png`,
    clip: { x: 0, y: 0, width: 1480, height: 800 }
  });

  await browser.close();
  console.log(`\n✓ Done. Screenshots saved to:\n  ${OUT_DIR}`);
}

run().catch((e) => {
  console.error('FAILED:', e);
  process.exit(1);
});
