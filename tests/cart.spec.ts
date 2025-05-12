import CartPage from "../pom/pages/CartPage"
import LoginPage from "../pom/pages/LoginPage"
import test, { expect } from "@playwright/test"



test.describe('Cart tests with POM', () => {
    let cartPage: CartPage
    let loginPage: LoginPage
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        cartPage = new CartPage(page)
        await loginPage.openPage()
        await loginPage.enterUserName('standard_user')
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page.getByTestId('title')).toHaveText('Products')
    })

    test('Empty cart displaying', async ({ page }) => {
        await cartPage.openCart()       
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        await expect(cartPage.qtyLabel).toBeVisible()
        await expect(cartPage.descriptionLabel).toBeVisible()
    })

    test('Cart with item displaying', async ({ page }) => {
        await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click()
        await expect(page.getByTestId('shopping-cart-badge')).toBeVisible()
        await cartPage.openCart()       
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        await expect(cartPage.qtyLabel).toBeVisible()
        await expect(cartPage.descriptionLabel).toBeVisible()
        await expect(cartPage.itemInCart).toBeVisible()
    })


    test('Remove item from cart', async ({ page }) => {
        await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click()
        await expect(page.getByTestId('shopping-cart-badge')).toBeVisible()
        await cartPage.openCart()       
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        await cartPage.clickRemoveButton()
        await expect(page.locator('div.removed_cart_item')).toHaveCount(1)
    })


    test('Return to shopping from cart', async ({ page }) => {
        await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click()
        await expect(page.getByTestId('shopping-cart-badge')).toBeVisible()
        await cartPage.openCart()       
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        await cartPage.clickcontinueShoppingButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })

    test('Checkout from cart', async ({ page }) => {
        await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click()
        await expect(page.getByTestId('shopping-cart-badge')).toBeVisible()
        await cartPage.openCart()       
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        await cartPage.clickCheckoutButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    })

})