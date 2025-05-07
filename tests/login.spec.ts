import test, { expect } from "@playwright/test"
import LoginPage from "../pom/pages/LoginPage"
import { log } from "console"

test.describe('Login tests with POM', () => {
    let loginPage: LoginPage
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.openPage()
    })

    test('Successful Login', async ({ page }) => {
        await loginPage.enterUserName('standard_user')
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page.getByTestId('title')).toHaveText('Products')
    })

     test('Login with empty username', async ({ page }) => {
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLoginButton()
        await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username is required')
     })
    
    test('Login with empty password', async ({ page }) => {
        await loginPage.enterUserName('standard_user')
        await loginPage.clickLoginButton()
        await expect(page.getByTestId('error')).toHaveText('Epic sadface: Password is required')
    })
    
    test('Login with invalid login/password', async ({ page }) => {
        await loginPage.enterUserName('123')
        await loginPage.enterPassword('123')
        await loginPage.clickLoginButton()
        await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })

    test('locked_out_user login', async ({ page }) => {
        await loginPage.enterUserName('locked_out_user')
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLoginButton()
        await expect(page.getByTestId('error')).toHaveText('Epic sadface: Sorry, this user has been locked out.')
    })

    test('problem_user Login', async ({ page }) => {
        await loginPage.enterUserName('problem_user')
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page.getByTestId('title')).toHaveText('Products')
    })

    test('performance_glitch_user Login', async ({ page }) => {
        await loginPage.enterUserName('performance_glitch_user')
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page.getByTestId('title')).toHaveText('Products')
    })

    test('error_user Login', async ({ page }) => {
        await loginPage.enterUserName('error_user')
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page.getByTestId('title')).toHaveText('Products')
    })

    test('visual_user Login', async ({ page }) => {
        await loginPage.enterUserName('visual_user')
        await loginPage.enterPassword('secret_sauce')
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page.getByTestId('title')).toHaveText('Products')
    })

})


// test.describe('Login tests',() => {
    
//     test.beforeEach(async ({ page }) => {
//         await page.goto('https://www.saucedemo.com/')        
//      })   



//     test('Successful Login', async ({ page }) => {
//         const userNameField = page.locator('input[data-test="username"]')
//         const passwordField = page.locator('//input[@name="password"]')
        
//         await userNameField.fill('standard_user')
//         await passwordField.fill('secret_sauce')

//         await page.locator('#login-button').click()
//         await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
//         await expect(page.getByTestId('title')).toHaveText('Products')
//     })

//     test('Login with empty username', async ({ page }) => {
//         const passwordField = page.locator('//input[@name="password"]')
        
//         await passwordField.fill('secret_sauce')

//         await page.locator('#login-button').click()
//         await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username is required')
//     })

//     test('Login with empty password', async ({ page }) => {
//         const userNameField = page.locator('input[data-test="username"]')
                
//         await userNameField.fill('standard_user')

//         await page.locator('#login-button').click()
//         await expect(page.getByTestId('error')).toHaveText('Epic sadface: Password is required')
//     })

//     test('Invalid login/password', async ({ page }) => {
//         const userNameField = page.locator('input[data-test="username"]')
//         const passwordField = page.locator('//input[@name="password"]')
        
//         await userNameField.fill('123')
//         await passwordField.fill('123')

//         await page.locator('#login-button').click()
//         await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username and password do not match any user in this service')

//     })


//     test('locked_out_user login', async ({ page }) => {
//         const userNameField = page.locator('input[data-test="username"]')
//         const passwordField = page.locator('//input[@name="password"]')
        
//         await userNameField.fill('locked_out_user')
//         await passwordField.fill('secret_sauce')

//         await page.locator('#login-button').click()
//         await expect(page.getByTestId('error')).toHaveText('Epic sadface: Sorry, this user has been locked out.')

//     })


//     test('problem_user login', async ({ page }) => {
//         const userNameField = page.locator('input[data-test="username"]')
//         const passwordField = page.locator('//input[@name="password"]')
        
//         await userNameField.fill('problem_user')
//         await passwordField.fill('secret_sauce')

//         await page.locator('#login-button').click()
//         await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
//         await expect(page.getByTestId('title')).toHaveText('Products')
//     })


    
//     test('performance_glitch_user login', async ({ page }) => {
//         const userNameField = page.locator('input[data-test="username"]')
//         const passwordField = page.locator('//input[@name="password"]')
        
//         await userNameField.fill('performance_glitch_user')
//         await passwordField.fill('secret_sauce')

//         await page.locator('#login-button').click()
//         await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
//         await expect(page.getByTestId('title')).toHaveText('Products')
//     })


    
//     test('error_user login', async ({ page }) => {
//         const userNameField = page.locator('input[data-test="username"]')
//         const passwordField = page.locator('//input[@name="password"]')
        
//         await userNameField.fill('error_user')
//         await passwordField.fill('secret_sauce')

//         await page.locator('#login-button').click()
//         await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
//         await expect(page.getByTestId('title')).toHaveText('Products')
//     })


    
//     test('visual_user login', async ({ page }) => {
//         const userNameField = page.locator('input[data-test="username"]')
//         const passwordField = page.locator('//input[@name="password"]')
        
//         await userNameField.fill('visual_user')
//         await passwordField.fill('secret_sauce')

//         await page.locator('#login-button').click()
//         await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
//         await expect(page.getByTestId('title')).toHaveText('Products')
//     })


// })



