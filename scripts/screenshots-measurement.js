import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OUT_DIR = resolve(__dirname, '../../../../O-output/מכרז-מישרים/_dashboards/screenshots');
const BASE_URL = 'http://localhost:5173/chotam-dashboards-demo/';

const VIEWPORT = { width: 1480, height: 1080, deviceScaleFactor: 2 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: VIEWPORT });
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  console.log('Navigate to Measurement view');
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  await sleep(2000);
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const target = buttons.find((b) => b.textContent.trim() === 'מדידה והערכה');
    if (target) target.click();
  });
  await sleep(2000);

  // Full
  await page.screenshot({ path: `${OUT_DIR}/10-measurement-school.png`, fullPage: true });
  console.log('Saved 10-measurement-school.png');

  // Click "שילוב מדדים"
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const target = buttons.find((b) => b.textContent.trim() === 'שילוב מדדים');
    if (target) target.click();
  });
  await sleep(1500);
  await page.screenshot({ path: `${OUT_DIR}/11-measurement-integration.png`, fullPage: true });
  console.log('Saved 11-measurement-integration.png');

  // Click "השוואה במחזור"
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const target = buttons.find((b) => b.textContent.trim() === 'השוואה במחזור');
    if (target) target.click();
  });
  await sleep(1500);
  await page.screenshot({ path: `${OUT_DIR}/12-measurement-cohort.png`, fullPage: true });
  console.log('Saved 12-measurement-cohort.png');

  await browser.close();
  console.log('Done');
}

run().catch((e) => { console.error('FAILED:', e); process.exit(1); });
