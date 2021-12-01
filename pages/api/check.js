
const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const handler = async (req, res) => {

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto('https://spacejelly.dev/');

  await page.focus('#search-query')
  await page.keyboard.type('api');

  const results = await page.$$eval('#search-query + div a', (links) => {
    return links.map(link => {
      return {
        text: link.innerText,
        href: link.href
      }
    });
  });

  await browser.close();

    // console.log('doneee');
      res.status(200).json({
        data: results,
    })
  
};

export default handler;
