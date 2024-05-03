// parent page, which has functions that all pages will need/use
const { until } = require('selenium-webdriver')

let driver;
const DEFAULT_TIMEOUT = 5000;

module.exports = class Page {
    constructor(driver) {
        this.driver = driver;
    }

    async openUrl(url) {
        return await this.driver.get(url);
    }

    async sleep(seconds) {
        return await this.driver.sleep(seconds);
    }

    async getElement(locator) {
        return await this.driver.findElement(locator);
    }

    async getElements(locator) {
        return await this.driver.findElements(locator);
    }

    async click(locator) {
        return await this.driver.findElement(locator).click();
    }

    async getElementText(locator) {
        return await this.driver.findElement(locator).getText();
    }

    async sendText(locator, text) {
        const element = await this.driver.findElement(locator);
        element.click();
        return element.sendKeys(text);
    }

    async getElementAttribute(element, attribute) {
        return await element.getAttribute(attribute);
    }

    async scrollTo(element) {
        return await this.driver.actions()
        .scroll(0, 0, 0, 0, element)
        .perform()
    }

    waitForElementVisible(element) {
        this.driver.wait(until.elementLocated(element), DEFAULT_TIMEOUT);
        return this.driver.wait(until.elementIsVisible(this.driver.findElement(element)), DEFAULT_TIMEOUT);
    }
    
}