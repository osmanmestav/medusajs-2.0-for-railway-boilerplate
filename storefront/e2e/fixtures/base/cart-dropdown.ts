import { Locator, Page } from "@playwright/test"

export class WarenkorbDropdown {
  page: Page
  navWarenkorbLink: Locator
  cartDropdown: Locator
  cartSubtotal: Locator
  goToWarenkorbButton: Locator

  constructor(page: Page) {
    this.page = page
    this.navWarenkorbLink = page.getByTestId("nav-cart-link")
    this.cartDropdown = page.getByTestId("nav-cart-dropdown")
    this.cartSubtotal = this.cartDropdown.getByTestId("cart-subtotal")
    this.goToWarenkorbButton = this.cartDropdown.getByTestId("go-to-cart-button")
  }

  async displayWarenkorb() {
    await this.navWarenkorbLink.hover()
  }

  async close() {
    if (await this.cartDropdown.isVisible()) {
      const box = await this.cartDropdown.boundingBox()
      if (!box) {
        return
      }
      await this.page.mouse.move(box.x + box.width / 4, box.y + box.height / 4)
      await this.page.mouse.move(5, 10)
    }
  }

  async getWarenkorbItem(name: string, variant: string) {
    const cartItem = this.cartDropdown
      .getByTestId("cart-item")
      .filter({
        hasText: name,
      })
      .filter({
        hasText: `Variant: ${variant}`,
      })
    return {
      locator: cartItem,
      productLink: cartItem.getByTestId("product-link"),
      removeButton: cartItem.getByTestId("cart-item-remove-button"),
      name,
      quantity: cartItem.getByTestId("cart-item-quantity"),
      variant: cartItem.getByTestId("cart-item-variant"),
    }
  }
}
