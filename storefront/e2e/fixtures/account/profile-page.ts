import { Locator, Page } from "@playwright/test"
import { AccountPage } from "./account-page"
import { camelCase } from "lodash"

export class ProfilePage extends AccountPage {
  profileWrapper: Locator
  accountNameEditor: Locator
  accountEmailEditor: Locator
  accountPhoneEditor: Locator
  accountPasswordEditor: Locator
  accountBillingAdresseEditor: Locator

  nameEditButton: Locator
  emailEditButton: Locator
  phoneEditButton: Locator
  passwordEditButton: Locator
  billingAdresseEditButton: Locator

  nameSaveButton: Locator
  emailSaveButton: Locator
  phoneSaveButton: Locator
  passwordSaveButton: Locator
  billingAdresseSaveButton: Locator

  savedName: Locator
  savedEmail: Locator
  savedPhone: Locator
  savedPassword: Locator
  savedBillingAdresse: Locator

  nameSuccessMessage: Locator
  emailSuccessMessage: Locator
  phoneSuccessMessage: Locator
  passwordSuccessMessage: Locator
  billingAdresseSuccessMessage: Locator

  nameErrorMessage: Locator
  emailErrorMessage: Locator
  phoneErrorMessage: Locator
  passwordErrorMessage: Locator
  billingAdresseErrorMessage: Locator

  emailInput: Locator
  firstNameInput: Locator
  lastNameInput: Locator

  phoneInput: Locator

  oldPasswordInput: Locator
  newPasswordInput: Locator
  confirmPasswordInput: Locator

  billingAdresse1Input: Locator
  billingAdresse2Input: Locator
  billingCityInput: Locator
  billingCompanyInput: Locator
  billingFirstNameInput: Locator
  billingLastNameInput: Locator
  billingPostcalCodeInput: Locator
  billingProvinceInput: Locator
  billingCountryCodeSelect: Locator

  constructor(page: Page) {
    super(page)
    this.profileWrapper = page.getByTestId("profile-page-wrapper")
    this.accountNameEditor = this.container.getByTestId("account-name-editor")
    this.accountEmailEditor = this.container.getByTestId("account-email-editor")
    this.accountPhoneEditor = this.container.getByTestId("account-phone-editor")
    this.accountPasswordEditor = this.container.getByTestId(
      "account-password-editor"
    )
    this.accountBillingAdresseEditor = this.container.getByTestId(
      "account-billing-address-editor"
    )

    this.nameEditButton = this.accountNameEditor.getByTestId("edit-button")
    this.emailEditButton = this.accountEmailEditor.getByTestId("edit-button")
    this.phoneEditButton = this.accountPhoneEditor.getByTestId("edit-button")
    this.passwordEditButton =
      this.accountPasswordEditor.getByTestId("edit-button")
    this.billingAdresseEditButton =
      this.accountBillingAdresseEditor.getByTestId("edit-button")

    this.nameSaveButton = this.accountNameEditor.getByTestId("save-button")
    this.emailSaveButton = this.accountEmailEditor.getByTestId("save-button")
    this.phoneSaveButton = this.accountPhoneEditor.getByTestId("save-button")
    this.passwordSaveButton =
      this.accountPasswordEditor.getByTestId("save-button")
    this.billingAdresseSaveButton =
      this.accountBillingAdresseEditor.getByTestId("save-button")

    this.savedName = this.accountNameEditor.getByTestId("current-info")
    this.savedEmail = this.accountEmailEditor.getByTestId("current-info")
    this.savedPhone = this.accountPhoneEditor.getByTestId("current-info")
    this.savedPassword = this.accountPasswordEditor.getByTestId("current-info")
    this.savedBillingAdresse =
      this.accountBillingAdresseEditor.getByTestId("current-info")
    this.nameSuccessMessage =
      this.accountNameEditor.getByTestId("success-message")
    this.emailSuccessMessage =
      this.accountEmailEditor.getByTestId("success-message")
    this.phoneSuccessMessage =
      this.accountPhoneEditor.getByTestId("success-message")
    this.passwordSuccessMessage =
      this.accountPasswordEditor.getByTestId("success-message")
    this.billingAdresseSuccessMessage =
      this.accountBillingAdresseEditor.getByTestId("success-message")
    this.nameErrorMessage = this.accountNameEditor.getByTestId("error-message")
    this.emailErrorMessage =
      this.accountEmailEditor.getByTestId("error-message")
    this.phoneErrorMessage =
      this.accountPhoneEditor.getByTestId("error-message")
    this.passwordErrorMessage =
      this.accountPasswordEditor.getByTestId("error-message")
    this.billingAdresseErrorMessage =
      this.accountBillingAdresseEditor.getByTestId("error-message")

    this.firstNameInput = page.getByTestId("first-name-input")
    this.lastNameInput = page.getByTestId("last-name-input")
    this.emailInput = page.getByTestId("email-input")
    this.phoneInput = page.getByTestId("phone-input")
    this.oldPasswordInput = page.getByTestId("old-password-input")
    this.newPasswordInput = page.getByTestId("new-password-input")
    this.confirmPasswordInput = page.getByTestId("confirm-password-input")

    this.billingAdresse1Input = page.getByTestId("billing-address-1-input")
    this.billingAdresse2Input = page.getByTestId("billing-address-2-input")
    this.billingCityInput = page.getByTestId("billing-city-input")
    this.billingCompanyInput = page.getByTestId("billing-company-input")
    this.billingFirstNameInput = page.getByTestId("billing-first-name-input")
    this.billingLastNameInput = page.getByTestId("billing-last-name-input")
    this.billingPostcalCodeInput = page.getByTestId(
      "billing-postcal-code-input"
    )
    this.billingProvinceInput = page.getByTestId("billing-province-input")
    this.billingCountryCodeSelect = page.getByTestId(
      "billing-country-code-select"
    )
  }

  async getEditorInputs(editor: Locator) {
    const editButton = editor.getByTestId("edit-button")
    if ((await editButton.getAttribute("active")) !== "true") {
      await editButton.click()
    }
    // get all the inputs
    const inputs = editor.locator(
      '[data-testid]:not([data-testid="edit-button"])'
    )
    const o = {
      editButton,
    } as { [k: string]: Locator }
    for (const input of await inputs.all()) {
      const testId = (await input.getAttribute("data-testid")) as string
      const key = camelCase(testId)
      o[key] = input
    }
    return o
  }

  async goto() {
    super.goto()
    await this.profileLink.click()
    await this.profileWrapper.waitFor({ state: "visible" })
  }
}
