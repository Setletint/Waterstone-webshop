const Page = require('./basePage');
const { By } = require('selenium-webdriver')

const baseUrl = "https://www.waterstones.com/";
const languages = new Array('English', 'French', 'Spanish', 'Italian', 'German', 'Portuguese');

// home page element locators
const cookieButton = By.css("#onetrust-button-group > #onetrust-accept-btn-handler");
const pageTitleElement = By.css("#main-logos > div > a.logo");

const searchField = By.css("input.input-search");
const searchButton = By.className("input-search-button icon");
const searchResultKeyword = By.css("div.main-page.row.search-results.search-results-books > div > p.breadcrumbs");
const searchResultCount = By.className("search-result-tab-all");
const searchResultTitle = By.css("div.title-wrap > a");
const searchResultPrice = By.css("div.book-price > span.price");
const searchResultFormat = By.css("div.book-price > span:nth-child(3)");

const sortOptionsToggle = By.css("div.sort > div > div.trigger");
const sortOptions = By.css("div.sort > div > ul.options.open > li")
const sortByPriceAscButton = By.xpath("//ul[@class='options open']/li[@data-raw-value='price-asc']");

const filterOptionToggle = By.css("div.filters-array > div:nth-child(8) > div > div > a");
const filterByLanguageOptions = By.css("div.filters-array > div:nth-child(8) > div > div > ul > li > a");

module.exports = class Homepage extends Page {

    async openUrl() {
        await super.openUrl(baseUrl);
    }

    async agreeWithCookies() {
        await super.sleep(1000)
        await super.click(cookieButton);
    }

    async verifyPageTitleContains(title) {
        const pageTitle = await super.getElementText(pageTitleElement);
        expect(pageTitle).toContain(title);
    }

    async searchForText(text) {
        await super.sendText(searchField, text);
        await super.click(searchButton)
    }

    async verifySearchResultsText(text) {
        const searchResult = await super.getElementText(searchResultKeyword);
        expect(searchResult).toContain("You searched for: " + text);
    }

    async verifySearchResultsCount(number) {
        const searchCount = await super.getElementText(searchResultCount);
        const searchCountNum = parseInt(searchCount.replaceAll(/\D+/g, ""));
        expect(searchCountNum).toBeGreaterThan(number);
    }

    async verifyAllSearchItemsContainText(text) {
        let itemTitles = await super.getElements(searchResultTitle);

        for (let title of itemTitles) {
            let titleHref = await super.getElementAttribute(title, "href");
            expect(titleHref.toLowerCase().replace(/-/g, ' ')).toContain(text.toLowerCase());
        }
    }

    async verifyProductsSortOptions(number) {
        await super.click(sortOptionsToggle);
        const sortByOptions = await super.getElements(sortOptions);
        expect(sortByOptions).toHaveLength(number);
    }

    async sortResultsByPrice() {
        await super.click(sortByPriceAscButton);
    }

    async verifyResultsAreSortedByPrice() {
        let itemPrices = await super.getElements(searchResultPrice);
        let firstPrice = parseFloat((await itemPrices[0].getText()).replace(/£/g, ""));
        let secondPrice = parseFloat((await itemPrices[1].getText()).replace(/£/g, ""));
        expect(firstPrice).toBeLessThan(secondPrice);
    }

    async verifyProductsLanguageFilterOptions() {
        await super.click(filterOptionToggle);
        let filterOptions = await super.getElements(filterByLanguageOptions);
        expect(filterOptions).toHaveLength(languages.length);
    }

    async verifyProductLanguageFilter() {
        let filterOptions = await super.getElements(filterByLanguageOptions);
        for (let pageLanguage of filterOptions) {
            expect(languages.includes(await pageLanguage.getText()))
        }

    }

    async filterResultsByFormat(text) {
        const format = await super.getElement(By.xpath("//a[contains(text(), '" + text + "')]"));
        await super.scrollTo(format);
        format.click();
    }
    
    async verifyResultsAreFiltered(text) {
        let itemsFormat = await super.getElements(searchResultFormat);
        for (let item of itemsFormat) {
            expect(await item.getText()).toContain(text);
        }
    }
}