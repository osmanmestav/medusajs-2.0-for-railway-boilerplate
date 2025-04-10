import { WarenkorbDropdown } from "./cart-dropdown"
import { NavMenü } from "./nav-menu"
import { Page, Locator } from "@playwright/test"
import { SearchModal } from "./search-modal"

export class BasePage {
  page: Page
  navMenü: NavMenü
  cartDropdown: WarenkorbDropdown
  searchModal: SearchModal
  accountLink: Locator
  cartLink: Locator
  searchLink: Locator
  storeLink: Locator
  categoriesList: Locator

  constructor(page: Page) {
    this.page = page
    this.navMenü = new NavMenü(page)
    this.cartDropdown = new WarenkorbDropdown(page)
    this.searchModal = new SearchModal(page)
    this.accountLink = page.getByTestId("nav-account-link")
    this.cartLink = page.getByTestId("nav-cart-link")
    this.storeLink = page.getByTestId("nav-store-link")
    this.searchLink = page.getByTestId("nav-search-link")
    this.categoriesList = page.getByTestId("footer-categories")
  }

  async clickCategoryLink(category: string) {
    const link = this.categoriesList.getByTestId("category-link")
    await link.click()
  }
}
