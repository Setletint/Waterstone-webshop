const {By} = require('selenium-webdriver')
const Page = require('./basePage')

const baseUrl = 'https://www.waterstones.com/'

const cookieButtonID = By.id('onetrust-accept-btn-handler')
const pageTitleElement = By.css("#main-logos > div >a.logo")
const searchBar = By.css('.mainsearchform > div > .input-search');
const searchTextResult = By.css(".main-page.row.search-results.search-results-books > div > p.breadcrumbs");
const itemCounter = By.className("search-result-tab-all");
const itemTitle = By.css("div.title-wrap > a");
const sortElement = By.css("div.sort > div > div.trigger");
const sortElementsList = By.css("div.sort > div > ul.options.open > li")
const sortItmesByPriceButton = By.xpath("//ul[@class='options open']/li[@data-raw-value='price-asc']");
const allItemsPrice = By.css("div.book-price > span.price");
const languageFilter = By.css("div.filters-array > div:nth-child(8) > div > div > a");
const languageFilterOptions = By.css("div.filters-array > div:nth-child(8) > div > div > ul > li > a");
const hardbackFormat = By.xpath("//a[contains(text(), 'Hardback')]");
const itemsHardbackFormats = By.css("div.book-price > span:nth-child(3)");

const languages = new Array('English', 'French', 'Spanish', 'Italian', 'German', 'Portuguese');


module.exports = class Homepage extends Page {

    async openUrl(){
        await super.openUrl(baseUrl);
    }

    async agreeWithCookie(){
        await super.sleep(2500);
        await super.click(cookieButtonID)
    }

    async verifyPageTitleName(title){
        const titleName = await super.getElementText(pageTitleElement);
        await expect(titleName).toContain(title);
    }

    async sendSearchText(text){
        await super.sendText(searchBar,text)
    }

    async verifySearchText(text){
        const searchResult = await super.getElementText(searchTextResult);
        expect(searchResult).toBe("You searched for: "+text);
    }

    async verifyThatMoreThanOne(){
        const searchCount = await super.getElementText(itemCounter)
        const searchCountNum = parseInt(searchCount.replaceAll(/\D+/g, ""));
        expect(searchCountNum).toBeGreaterThan(1);
    }

    async verifyProductsHasKeyword(text){
        let givenItemTitles = await super.getElements(itemTitle)
        for (let i=0;i<3;i++) {
            let titleHref = await givenItemTitles[i].getAttribute('href')
            expect(titleHref.toLowerCase().replace(/-/g, ' ')).toContain(text);
        }
    }

    async verifyProductsCanBeSorted(len){
        await super.click(sortElement);
        const sortByOptions = await super.getElements(sortElementsList);
        expect(sortByOptions).toHaveLength(len);
    }

    async sortItmesByPrice(){
        await super.click(sortItmesByPriceButton)
    }

    async verifyProductsSortedByPrice(){
        let itemPrices = await super.getElements(allItemsPrice);
        let firstPrice = parseFloat((await itemPrices[0].getText()).replace(/£/g, ""));
        let secondPrice = parseFloat((await itemPrices[1].getText()).replace(/£/g, ""));
        expect(firstPrice).toBeLessThan(secondPrice);
    }

    async verifyThatProductsCanBeFilteredByLang(){
        await super.click(languageFilter)
        let filterByLanguageOptions = await super.getElements(languageFilterOptions)
        expect(filterByLanguageOptions).toHaveLength(6);
    }

    async verifyThatAllLangugaesAvaliable(){
        let filterByLanguageOptions = await super.getElements(languageFilterOptions)
        for (let pageLanguage of filterByLanguageOptions) {
            expect(languages.includes(await pageLanguage.getText()))
        }
    }

    async filterProductsByHardbackFormat(text){
        const format = await super.getElement(hardbackFormat)
        await super.scrollAndChoose(format)
    }

    async verifyCorrectFormat(format){
        let itemsFormat = await super.getElements(itemsHardbackFormats);
        for (let item of itemsFormat) {
            expect(await item.getText()).toContain(format);
        }
    }
}