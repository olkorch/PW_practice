import { Locator } from "@playwright/test"
import BasePage from "../BasePage"

export default class CartPage extends BasePage {
    readonly qtyLabel: Locator = this.page.getByTestId('cart-quantity-label')
    readonly descriptionLabel: Locator = this.page.getByTestId('cart-desc-label')
    readonly itemInCart: Locator = this.page.getByTestId('inventory-item')
    private readonly removeButton: Locator = this.page.getByTestId('remove-sauce-labs-bolt-t-shirt')
    private readonly continueShoppingButton: Locator = this.page.getByTestId('continue-shopping')
    private readonly checkoutButton: Locator = this.page.getByTestId('checkout')
    private readonly cartButton: Locator = this.page.locator('#shopping_cart_container')
       
    async openCart() {
        await this.cartButton.click()
    }

    async clickRemoveButton() {
        await this.removeButton.click()
    }

     async clickcontinueShoppingButton() {
        await this.continueShoppingButton.click()
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click()
    }

}


