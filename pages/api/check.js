
import puppeteer from 'puppeteer-serverless'
let finalResult

const handler = async (req, res) => {
  // const { number } = req.query;
  const number = "eeb72z"
  const url ='https://my.service.nsw.gov.au/MyServiceNSW/index#/rms/freeRegoCheck/details';
  try{
    const browser = await puppeteer.launch()
  
  const page = await browser.newPage();

   
   await page.goto(url);
   await page.waitForSelector('#formly_2_input_plateNumber_0');
   await page.type('#formly_2_input_plateNumber_0', number);
   await page.click(
     '#formly_2_checkbox-label-with-action_termsAndConditions_1'
   );
   page.on('response', async (response) => {
     response.text().then(function (textBody) {
       if (textBody.startsWith('[')) {
         const json = JSON.parse(textBody);
         const body = json[0];
         if (body.method == 'postVehicleListForFreeRegoCheck') {
           finalResult = body.result;
           browser.close();
         }
       }
     });
   });
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
