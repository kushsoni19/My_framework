import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import randomUseragent from 'random-useragent';
import { promises as fs } from 'fs';
import { Builder, By, Key, until } from 'selenium-webdriver';
import cypress from 'cypress';

puppeteer.use(stealthPlugin());

const randomItem = (array) => array[Math.floor(Math.random() * array.length)];
const randomUserAgent = () => randomUseragent.getRandom();
const randomViewport = () => ({
  width: Math.floor(Math.random() * 1280) + 800,
  height: Math.floor(Math.random() * 800) + 600,
});

let hwFingerprint = null;

const spoofHardware = async (page) => {
  if (!hwFingerprint) {
    hwFingerprint = {
      concurrency: Math.floor(Math.random() * 8) + 1,
      memory: Math.floor(Math.random() * 8) + 1,
      cpuClass: 'undefined',
      platform: 'Win32',
      plugins: [1, 2, 3, 4, 5],
      maxTouchPoints: 0,
      appVersion: '5.0 (Windows)',
      vendor: '',
      deviceMemory: Math.floor(Math.random() * 8) + 1,
    };
  }

  await page.evaluateOnNewDocument((hwFingerprint) => {
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => hwFingerprint.concurrency });
    Object.defineProperty(navigator, 'deviceMemory', { get: () => hwFingerprint.deviceMemory });
    Object.defineProperty(navigator, 'cpuClass', { get: () => hwFingerprint.cpuClass });
    Object.defineProperty(navigator, 'platform', { get: () => hwFingerprint.platform });
    Object.defineProperty(navigator, 'plugins', { get: () => hwFingerprint.plugins });
    Object.defineProperty(navigator, 'maxTouchPoints', { get: () => hwFingerprint.maxTouchPoints });
    Object.defineProperty(navigator, 'appVersion', { get: () => hwFingerprint.appVersion });
    Object.defineProperty(navigator, 'vendor', { get: () => hwFingerprint.vendor });
  }, hwFingerprint);
};

const launchBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false, // for visibility
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--window-size=${randomViewport().width},${randomViewport().height}`
    ]
  });

  const page = await browser.newPage();

  await page.setUserAgent(randomUserAgent());
  await page.setViewport(randomViewport());

  await spoofHardware(page);

  // Your automation code here

  // Example: Navigate to a page
  await page.goto('https://example.com');

  // Close the browser when done
  // await browser.close();
};

const launchSelenium = async () => {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://example.com');
    // Your Selenium automation code here
  } finally {
    await driver.quit();
  }
};

const launchCypress = () => {
  cypress.run({
    spec: './cypress/integration/test_spec.js'
  });
};

// Main function to launch different browsers
const main = async () => {
  await launchBrowser();
  await launchSelenium();
  launchCypress();
};

main();
