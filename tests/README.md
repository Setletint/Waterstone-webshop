# Selenium & Jest test automation - Webshop (Part I, II, III)
The task is to add tests to Waterstones bookshop following the test cases.

## How to get the project

To solve the task, proceed as follows:
1. Fork this repository on to your account
2. Clone the forked repo to your computer using `git clone URL`
3. Run `npm install` to instal all needed packages
4. Make all necessary changes - write tests according to test case descriptions
5. Confirm all changes with test run: `npm test` or `npx jest`
6. Commit your changes and make a pull request for the original repo on GitHub
7. Grade is awarded to students who made the pull request:
   - with finished tests
   - following the Page Object Pattern
   - and reporting

## Test cases

**Search products by keywords**

| Steps                                                  | Expected result (assertions)                                                                              |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| Open www.waterstones.com webpage                       | Verify that the web page has a Waterstones title.                                                         |
| Search for keyword “harry potter”                      | Verify that there are more than 1 products found.                                                         |
|                                                        | Verify that products presented have searched keyword in it.                                               |
|                                                        | Verify that found products can be sorted.                                                                 |
| Sort searched items by price                           | Verify that the products are sorted correctly.                                                            |
|                                                        | Verify that products can be filtered by 6 languages: English, French, German, Spanish, Italian, Portugese |
| Filter products by Format, select filter as “Hardback” | Verify that products list contains less items now.                                                        |
|                                                        | Verify that items selected have correct format.                                                           |

**Add products to shopping cart**

| Steps                                   | Expected result (assertions)                                         |
|-----------------------------------------|----------------------------------------------------------------------|
| Open www.waterstones.com webpage        | Verify that the web page has a Waterstones title.                    |
| Search for any product keyword          | Verify that there are more than 1 products found.                    |
|                                         | Verify that products can be added to cart.                           |
| Add 1 item to cart.                     | Verify that shopping cart now has 1 item added.                      |
| Select another item, add it to the cart | Verify that shopping cart now has 2 items added.                     |
| Click Basket/Checkout button            | Verify that user is transferred to cart view.                        |
|                                         | Verify that cart has 2 items.                                        |
|                                         | Verify that cart has correct items added.                            |
|                                         | Verify that cart sum is correct.                                     |
| Remove first product from the cart      | Verify that cart has 1 item.                                         |
|                                         | Verify that cart has correct item removed added.                     |
|                                         | Verify that cart sum is correct.                                     |

**Search products by filter menu**

| Steps                                      | Expected result (assertions)                              |
|--------------------------------------------|-----------------------------------------------------------|
| Open www.waterstones.com webpage           | Verify that the web page has a Waterstones title.         |
| Scroll down to "Bestsellers" option        | Verify that "Our Bestsellers" section is visible.         |
| Click on “See More” button                 | Verify that "Bestlessing Books" page is opened.           |
|                                            | Verify that page routing is correct.                      |
|                                            | Verify that page has "Category" filters.                  |
| Click on “Business, Finance & Law” filter  | Verify that Applied filters has correct filter.           |
|                                            | Verify that there are more than 1 products found.         |
| Click on “Accounting” subfilter            | Verify that Applied filters has correct filter.           |
|                                            | Verify  products list now contains less items.            |
| Click on “Cost accounting” subfilter       | Verify that Applied filters has correct filter.           |
|                                            | Verify  products list now contains less items.            |
|                                            | Verify that there are more than 1 products found.         |