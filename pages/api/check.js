
const  puppeteer = require('puppeteer');

const handler = async (req, res) => {
  // const { number } = req.query;
  const number = "eeb72z"
  const url ='https://my.service.nsw.gov.au/MyServiceNSW/index#/rms/freeRegoCheck/details';
  try{
      let finalResult="dsds"
   const browser = await puppeteer.launch({ headless: false});
   const page = await browser.newPage();

   await page.goto(url);
await browser.close()
   

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
