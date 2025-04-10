import { Locator, Page } from "@playwright/test"

export class NavMenü {
  page: Page
  navMenüButton: Locator
  navMenü: Locator
  navAccountLink: Locator
  homeLink: Locator
  storeLink: Locator
  searchLink: Locator
  accountLink: Locator
  cartLink: Locator
  closeButton: Locator
  shippingToLink: Locator
  shippingToMenü: Locator

  constructor(page: Page) {
    this.page = page
    this.navMenüButton = page.getByTestId("nav-menu-button")
    this.navMenü = page.getByTestId("nav-menu-popup")
    this.navAccountLink = page.getByTestId("nav-account-link")
    this.homeLink = this.navMenü.getByTestId("home-link")
    this.storeLink = this.navMenü.getByTestId("store-link")
    this.searchLink = this.navMenü.getByTestId("search-link")
    this.accountLink = this.navMenü.getByTestId("account-link")
    this.cartLink = this.navMenü.getByTestId("nav-cart-link")
    this.closeButton = this.navMenü.getByTestId("close-menu-button")
    this.shippingToLink = this.navMenü.getByTestId("shipping-to-button")
    this.shippingToMenü = this.navMenü.getByTestId("shipping-to-choices")
  }

  async selectVersandCountry(country: string) {
    if (!(await this.navMenü.isVisible())) {
      throw {
        error:
          `You cannot call ` +
          `NavMenü.selectVersandCountry("${country}") without having the ` +
          `navMenü visible first!`,
      }
    }
    const countryLink = this.navMenü.getByTestId(
      `select-${country.toLowerCase()}-choice`
    )
    await this.shippingToLink.hover()
    await this.shippingToMenü.waitFor({
      state: "visible",
    })
    await countryLink.click()
  }

  async open() {
    await this.navMenüButton.click()
    await this.navMenü.waitFor({ state: "visible" })
  }
}
