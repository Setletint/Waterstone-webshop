const {By} = require('selenium-webdriver')
const Page = require('./basePage');

const baseUrl = 'https://www.waterstones.com/'
const itemHref = By.css("div.title-wrap > a");
const AddToBasketButton = By.className('button button-teal button-buy');
const BasketCount = By.className('basket-count plain-basket');
const BookPrice = By.xpath('/html/body/div[1]/div[1]/div[2]/section[1]/div[2]/div[2]/div/div[1]/div/div[1]/div[1]/b');
const BookTitle = By.id('scope_book_title');

module.exports = class BookPage extends Page {
    async VerifyItemCanBeAdded(text){
        let givenItems = await super.getElements(itemHref)
        let firstHref = await givenItems[0].getAttribute('href')
        await super.openUrl(firstHref);
        await super.sleep(1000)
        let AddButton = await super.getElement(AddToBasketButton);
        expect(await AddButton.getText()).toContain(text);
    }

    async AddOneItemsToCart(){
        await super.click(AddToBasketButton);
        let FirstBookName = super.getElementText(BookTitle);
        let FirstBookPrice = super.getElementText(BookPrice);
        await super.sleep(3000)
        expect(await super.getElementText(BasketCount)).toBe("1");
        await super.backToOnePage()

        console.log(FirstBookPrice);

        // Second Book
        let givenItems = await super.getElements(itemHref)
        let firstHref = await givenItems[1].getAttribute('href')
        await super.openUrl(firstHref);    
        await super.sleep(1000)
        let SecondBookName = super.getElementText(BookTitle);
        let SecondBookPrice = super.getElementText(BookPrice);
        await super.click(AddToBasketButton);
        await super.sleep(3000)
        expect(await super.getElementText(BasketCount)).toBe("2");
        await super.backToOnePage()
    }
}