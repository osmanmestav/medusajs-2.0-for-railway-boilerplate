import { Locator, Page } from "@playwright/test"
import { AccountPage } from "./account-page"
import { AdresseModal } from "./modals/address-modal"

export class AdresseesPage extends AccountPage {
  addAdresseModal: AdresseModal
  editAdresseModal: AdresseModal
  addressContainer: Locator
  addressesWrapper: Locator
  newAdresseButton: Locator

  constructor(page: Page) {
    super(page)
    this.addAdresseModal = new AdresseModal(page, "add")
    this.editAdresseModal = new AdresseModal(page, "edit")
    this.addressContainer = this.container.getByTestId("address-container")
    this.addressesWrapper = page.getByTestId("addresses-page-wrapper")
    this.newAdresseButton = this.container.getByTestId("add-address-button")
  }

  getAdresseContainer(text: string) {
    const container = this.page
      .getByTestId("address-container")
      .filter({ hasText: text })
    return {
      container,
      editButton: container.getByTestId('address-edit-button'),
      deleteButton: container.getByTestId("address-delete-button"),
      name: container.getByTestId("address-name"),
      company: container.getByTestId("address-company"),
      address: container.getByTestId("address-address"),
      postalCity: container.getByTestId("address-postal-city"),
      provinceCountry: container.getByTestId("address-province-country"),
    }
  }

  async goto() {
    await super.goto()
    await this.addressesLink.click()
    await this.addressesWrapper.waitFor({ state: "visible" })
  }
}
