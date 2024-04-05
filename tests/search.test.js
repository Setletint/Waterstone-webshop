const { Builder, By, Key, until, Browser } = require('selenium-webdriver')
require('')
const firefox = require('selenium-webdriver/firefox')
const _TimeOutsTime = 10000;

describe('Search products by keywords', () => {

    let driver;
    let options = new firefox.Options();
    beforeAll(async()=>{
        driver = new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(options.addArguments()).build()
        driver.manage().window().maximize();
        driver.manage().setTimeouts({implicit: _TimeOutsTime, pageLoad: _TimeOutsTime})
        await driver.get('https://www.waterstones.com/')
    })

    afterAll(async()=>{
        await driver.quit()
    })
    test('Site have logo with name', async () => {
        let acceptCookieButton = await driver.findElement(By.id("onetrust-accept-btn-handler"));
        let titleName = await driver.findElement(By.css("#main-logos > div >a.logo")).getAttribute("innerHTML");
        expect(titleName).toBe("Waterstones");
    })
    test('Search for keyword “harry potter” more than one product found', async () => {
        await sleep(3000);
        await driver.findElement(By.id('onetrust-accept-btn-handler')).click();
        await driver.findElement(By.css(".mainsearchform > div > .input-search")).sendKeys('harry potter',Key.ENTER);
        await sleep(2000);
        let harryPotters = await driver.findElements(By.css("div .title-wrap > .title"))
        for(item in harryPotters){
            await expect(harryPotters[item].getText()).match(/.*/i).toContain("harry potter")
        }
    })

})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }