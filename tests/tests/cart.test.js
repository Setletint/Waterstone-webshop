const { Builder, By, Key, until, Browser } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox');

let Homepage = require('../pageobjects/homePage');
let BookPage = require('../pageobjects/bookPage')
const _TimeOutsTime = 10000;


describe('Add products to shopping cart', () => {
    
    let driver;
    let options = new firefox.Options();
    beforeAll(async()=>{
        driver = new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(options.addArguments()).build()
        driver.manage().window().maximize();
        driver.manage().setTimeouts({implicit: _TimeOutsTime, pageLoad: _TimeOutsTime})

        Homepage = new Homepage(driver);
        await Homepage.openUrl();
        await Homepage.agreeWithCookie();

        BookPage = new BookPage(driver);

    })

    afterAll(async()=>{
        //await driver.quit()
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

    test('Book can be added to basket', async()=>{
        await BookPage.VerifyItemCanBeAdded('ADD TO BASKET')

        await BookPage.AddOneItemsToCart()
    })


})