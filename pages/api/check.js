// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const puppeteer = require('puppeteer')
let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
} else {
  // running locally.
  puppeteer = require('puppeteer');
}

const handler = async (req, res) => {
  // const { number } = req.query;
  const number = "eeb72z"
  // const url ='https://my.service.nsw.gov.au/MyServiceNSW/index#/rms/freeRegoCheck/details';
const url='http://nairaland.com/'
  let browser;
  let finalResult = '';
  try {
    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
      browser = await puppeteer.launch({
        args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      });
    } else {
      browser = await puppeteer.launch({ headless: false });
    }

    const page = await browser.newPage();

    await page.goto(url);
 
    page.on('response', async (response) => {
      response.text().then(function (textBody) {
            finalResult = textBody;
            browser.close();
      })
    })

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
