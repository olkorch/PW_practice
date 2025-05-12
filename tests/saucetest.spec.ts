import test, { expect } from "@playwright/test"


//tests without POM

test.describe('saucetest', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        const userNameField = page.locator('input[data-test="username"]')
        const passwordField = page.locator('//input[@name="password"]')
        
        await userNameField.fill('standard_user')
        await passwordField.fill('secret_sauce')

        await page.locator('#login-button').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page.getByTestId('title')).toHaveText('Products')
    })



    test('Successful Logout', async ({ page }) => {
        const burgerMenuBtn = page.locator('#react-burger-menu-btn')
        const logoutBtn = page.locator('#logout_sidebar_link')
        
        await burgerMenuBtn.click()
        await expect(burgerMenuBtn).toBeVisible
        await logoutBtn.click()
        await expect(page).toHaveURL('https://www.saucedemo.com/')        
    })

    test('Add to cart', async ({ page }) => {
        await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click()
        await expect(page.getByTestId('shopping-cart-badge')).toBeVisible()
        await page.locator('#shopping_cart_container').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        await expect(page.locator('item-4-title-link')).toBeVisible()
    })


    test('Remove from cart', async ({ page }) => {
        await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click()
        await expect(page.getByTestId('shopping-cart-badge')).toBeVisible()
        await page.locator('#shopping_cart_container').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        await expect(page.locator('item-4-title-link')).toBeVisible
        await page.locator('#remove-sauce-labs-bolt-t-shirt').click()
        await expect(page.locator('item-4-title-link')).not.toBeVisible()
        await expect(page.locator('div.removed_cart_item')).toBeVisible()
        await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible()
    })

    test('Place order', async ({ page }) => {
        await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click()
        await page.locator('#shopping_cart_container').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        await expect(page.locator('item-4-title-link')).toBeVisible
        await page.locator('#checkout').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        await page.getByTestId('firstName').fill('TestFName')
        await page.getByTestId('lastName').fill('TestLName')
        await page.getByTestId('postalCode').fill('00011')
        await page.locator('#continue').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await expect(page.locator('item-4-title-link')).toBeVisible()
        await page.locator('#finish').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
        await expect(page.locator('#checkout_complete_container')).toBeVisible()
    })
    
    
})
