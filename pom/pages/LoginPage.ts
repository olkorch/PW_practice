import { Locator, Page } from "@playwright/test"
import BasePage from "../BasePage"

export default class LoginPage extends BasePage {
    // private page: Page
    private readonly usernameField: Locator = this.page.locator('input[data-test="username"]')
    private readonly passwordField: Locator = this.page.locator('//input[@name="password"]')
    private readonly loginButton: Locator = this.page.locator('#login-button')

    // constructor(page: Page) {
    //     this.page = page
    //     this.usernameField = page.locator('input[data-test="username"]')
    //     this.passwordField = page.locator('//input[@name="password"]')
    //     this.loginButton = page.locator('#login-button')
    // }


    async openPage() {
        await this.page.goto('')
    }

    async enterUserName(username: string) {
        await this.usernameField.fill(username)
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password)
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }

}



