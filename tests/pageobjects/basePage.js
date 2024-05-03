const { Key, until } = require('selenium-webdriver')
let driver;

const DEFAULT_TIMEOUT = 5000;

module.exports = class Page{
    constructor(driver){
        this.driver = driver;
    }

    async openUrl(url){
        await this.driver.get(url)
    }

    async getElements(obj){
        return await this.driver.findElements(obj)
    }

    async getElement(obj){
        return await this.driver.findElement(obj)
    }

    async getElementText(obj){
        return await this.driver.findElement(obj).getText();
    }

    async click(obj){
        await this.driver.findElement(obj).click();
    }

    async sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async sendText(searchBar, text){
        await this.driver.findElement(searchBar).sendKeys(text,Key.ENTER);
    }

    async scrollAndChoose(obj){
        await this.driver.actions().scroll(0, 0, 0, 0, obj).perform();
        await obj.click();
    }

    waitForElementVisible(obj){
        this.driver.wait(until.elementLocated(obj), DEFAULT_TIMEOUT);
        return this.driver.wait(until.elementIsVisible(obj))
    }
}