const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // User-Agent Spoofing
    await page.setUserAgent('Your User Agent');
    await page.goto('http://localhost:8080');
    const userAgent = await page.evaluate(() => navigator.userAgent);
    console.log('User-Agent:', userAgent);

    // Screen Resolution Spoofing
    await page.setViewport({ width: 1280, height: 720 });
    const screenWidth = await page.evaluate(() => screen.width);
    const screenHeight = await page.evaluate(() => screen.height);
    console.log('Screen Width:', screenWidth, 'Height:', screenHeight);

    // Navigator Properties Spoofing
    const language = await page.evaluate(() => navigator.language);
    console.log('Language:', language);

    // Plugins and MimeTypes Spoofing
    const plugins = await page.evaluate(() => navigator.plugins.length);
    const mimeTypes = await page.evaluate(() => navigator.mimeTypes.length);
    console.log('Plugins:', plugins, 'MimeTypes:', mimeTypes);

    // Timezone Spoofing
    const timeZone = await page.evaluate(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
    console.log('Timezone:', timeZone);

    // WebGL and WebRTC Spoofing
    const webgl = await page.evaluate(() => window.WebGLRenderingContext);
    const webrtc = await page.evaluate(() => window.RTCPeerConnection);
    console.log('WebGL:', webgl, 'WebRTC:', webrtc);

    await browser.close();
})();
