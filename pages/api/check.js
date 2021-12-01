
const  chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const handler = async (req, res) => {
  const { number } = req.query;
  const url =
    'https://my.service.nsw.gov.au/MyServiceNSW/index#/rms/freeRegoCheck/details';
  let browser;
  let finalResult = '';
  try {
      browser = await puppeteer.launch({
        args: chrome.args, 
        executablePath: await chrome.executablePath,
        headless: true,
      })
    const page = await browser.newPage();

    await page.goto(url);
     finalResult = page.title();
            browser.close();
      
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    // console.log('doneee');
    if (finalResult) {
      res.status(200).json({
        data: finalResult,
      });
    }
  } catch (error) {
    res.status(200).json({ data: finalResult });
  }
};

export default handler;
