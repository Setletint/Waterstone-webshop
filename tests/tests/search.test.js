const { Builder, By, Key, until, Browser } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox');

let Homepage = require('../pageobjects/homePage');
const _TimeOutsTime = 10000;

describe('Search products by keywords', () => {

    let driver;
    let options = new firefox.Options();
    beforeAll(async()=>{
        driver = new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(options.addArguments()).build()
        driver.manage().window().maximize();
        driver.manage().setTimeouts({implicit: _TimeOutsTime, pageLoad: _TimeOutsTime})

        Homepage = new Homepage(driver);
        await Homepage.openUrl();
        await Homepage.agreeWithCookie();

    })

    afterAll(async()=>{
        await driver.quit()
    })
    test('Site have logo with name', async () => {

        await Homepage.verifyPageTitleName('Waterstones')
    })
    test('Search for keyword “harry potter” more than one product found', async () => {

        await Homepage.sendSearchText('harry potter')

        await Homepage.verifySearchText('harry potter')

        //Verify that there are more than 1 products found.
        await Homepage.verifyThatMoreThanOne()
        
        //Verify that products presented have searched keyword in it.
        await Homepage.verifyProductsHasKeyword('harry potter')
    })

    test('Test Sort searched items by price', async () => {


        //Verify that found products can be sorted.
        await Homepage.verifyProductsCanBeSorted(6)

        //Sort searched items by price
        await Homepage.sortItmesByPrice()

        //Verify that the products are sorted correctly.
        await Homepage.verifyProductsSortedByPrice()
        
    })

    test('Test Items can be Filtered by Language', async () => {
        //Verify that products can be filtered by 6 languages: English, French, German, Spanish, Italian, Portugese
        await Homepage.verifyThatProductsCanBeFilteredByLang()
        
        //option to check that our list contains page languages
        await Homepage.verifyThatAllLangugaesAvaliable()
    })

    test('Test Items can be Filtered by Format', async () => {
        //Filter products by Format, select filter as “Hardback”
        await Homepage.filterProductsByHardbackFormat()
        
        //Verify that items selected have correct format.

        await Homepage.verifyCorrectFormat("Hardback")

        //Verify that products list contains less items now.

    })

})