import { Locator, Page } from "@playwright/test"
import { BasePage } from "../base/base-page"

export class AccountPage extends BasePage {
  container: Locator
  accountNav: Locator

  overviewLink: Locator
  profileLink: Locator
  addressesLink: Locator
  ordersLink: Locator
  logoutLink: Locator

  mobileAccountNav: Locator
  mobileAccountMainLink : Locator
  mobileOverviewLink : Locator
  mobileProfileLink : Locator
  mobileAdresseesLink : Locator
  mobileBestellungenLink : Locator
  mobileLogoutLink : Locator

  constructor(page: Page) {
    super(page)
    this.container = page.getByTestId("account-page")
    this.accountNav = this.container.getByTestId("account-nav")
    this.overviewLink = this.accountNav.getByTestId("overview-link")
    this.profileLink = this.accountNav.getByTestId("profile-link")
    this.addressesLink = this.accountNav.getByTestId("addresses-link")
    this.ordersLink = this.accountNav.getByTestId("orders-link")
    this.logoutLink = this.accountNav.getByTestId("logout-button")

    this.mobileAccountNav = this.container.getByTestId("mobile-account-nav")
    this.mobileAccountMainLink = this.mobileAccountNav.getByTestId("account-main-link")
    this.mobileOverviewLink = this.mobileAccountNav.getByTestId("overview-link")
    this.mobileProfileLink = this.mobileAccountNav.getByTestId("profile-link")
    this.mobileAdresseesLink = this.mobileAccountNav.getByTestId("addresses-link")
    this.mobileBestellungenLink = this.mobileAccountNav.getByTestId("orders-link")
    this.mobileLogoutLink = this.mobileAccountNav.getByTestId("logout-button")
  }

  async goto() {
    await this.navMenü.navAccountLink.click()
    await this.container.waitFor({ state: "visible" })
  }
}
