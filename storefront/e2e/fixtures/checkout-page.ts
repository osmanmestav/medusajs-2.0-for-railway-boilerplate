import { ElementHandle, Locator, Page } from "@playwright/test"
import { BasePage } from "./base/base-page"

export class Zur KassePage extends BasePage {
  backToWarenkorbLink: Locator
  storeLink: Locator
  container: Locator
  editAdresseButton: Locator
  editDeliveryButton: Locator
  editPaymentButton: Locator

  shippingAdresseSelect: Locator
  shippingAdresseOptions: Locator
  shippingAdresseOption: Locator

  billingAdresseCheckbox: Locator
  billingAdresseInput: Locator
  billingCityInput: Locator
  billingCompanyInput: Locator
  billingFirstNameInput: Locator
  billingLastNameInput: Locator
  billingPhoneInput: Locator
  billingPostalInput: Locator
  billingProvinceInput: Locator
  shippingAdresseInput: Locator
  shippingCityInput: Locator
  shippingCompanyInput: Locator
  shippingEmailInput: Locator
  shippingFirstNameInput: Locator
  shippingLastNameInput: Locator
  shippingPhoneInput: Locator
  shippingPostalCodeInput: Locator
  shippingProvinceInput: Locator

  billingCountrySelect: Locator
  shippingCountrySelect: Locator

  shippingAdresseSummary: Locator
  shippingKontaktSummary: Locator
  billingAdresseSummary: Locator

  submitAdresseButton: Locator
  addressErrorMessage: Locator

  deliveryOptionsContainer: Locator
  deliveryOptionRadio: Locator
  deliveryOptionErrorMessage: Locator
  submitDeliveryOptionButton: Locator
  deliveryOptionSummary: Locator

  paymentMethodSummary: Locator
  paymentDetailsSummary: Locator
  paymentMethodErrorMessage: Locator
  stripePaymentErrorMessage: Locator
  paypalPaymentErrorMessage: Locator
  manualPaymentErrorMessage: Locator
  submitPaymentButton: Locator
  submitOrderButton: Locator

  discountButton: Locator
  discountInput: Locator
  discountApplyButton: Locator
  discountErrorMessage: Locator
  discountRow: Locator
  giftCardRow: Locator
  giftCardCode: Locator
  giftCardAmount: Locator
  giftCardRemoveButton: Locator
  cartSubtotal: Locator
  cartRabatt: Locator
  cartGiftCardAmount: Locator
  cartVersand: Locator
  cartTaxes: Locator
  cartGesamt: Locator
  itemsTable: Locator
  itemRow: Locator
  itemTitle: Locator
  itemVariant: Locator
  itemQuantity: Locator
  itemOriginalPrice: Locator
  itemReducedPrice: Locator
  itemUnitOriginalPrice: Locator
  itemUnitReducedPrice: Locator

  constructor(page: Page) {
    super(page)
    this.backToWarenkorbLink = page.getByTestId("back-to-cart-link")
    this.storeLink = page.getByTestId("store-link")
    this.container = page.getByTestId("checkout-container")

    this.editAdresseButton = this.container.getByTestId("edit-address-button")
    this.editDeliveryButton = this.container.getByTestId("edit-delivery-button")
    this.editPaymentButton = this.container.getByTestId("edit-payment-button")

    this.shippingAdresseSelect = this.container.getByTestId(
      "shipping-address-select"
    )
    this.shippingAdresseOptions = this.container.getByTestId(
      "shipping-address-options"
    )
    this.shippingAdresseOption = this.container.getByTestId(
      "shipping-address-option"
    )
    this.billingAdresseCheckbox = this.container.getByTestId(
      "billing-address-checkbox"
    )
    this.billingAdresseInput = this.container.getByTestId(
      "billing-address-input"
    )
    this.billingCityInput = this.container.getByTestId("billing-city-input")
    this.billingCompanyInput = this.container.getByTestId(
      "billing-company-input"
    )
    this.billingFirstNameInput = this.container.getByTestId(
      "billing-first-name-input"
    )
    this.billingLastNameInput = this.container.getByTestId(
      "billing-last-name-input"
    )
    this.billingPhoneInput = this.container.getByTestId("billing-phone-input")
    this.billingPostalInput = this.container.getByTestId("billing-postal-input")
    this.billingProvinceInput = this.container.getByTestId(
      "billing-province-input"
    )
    this.shippingAdresseInput = this.container.getByTestId(
      "shipping-address-input"
    )
    this.shippingCityInput = this.container.getByTestId("shipping-city-input")
    this.shippingCompanyInput = this.container.getByTestId(
      "shipping-company-input"
    )
    this.shippingEmailInput = this.container.getByTestId("shipping-email-input")
    this.shippingFirstNameInput = this.container.getByTestId(
      "shipping-first-name-input"
    )
    this.shippingLastNameInput = this.container.getByTestId(
      "shipping-last-name-input"
    )
    this.shippingPhoneInput = this.container.getByTestId("shipping-phone-input")
    this.shippingPostalCodeInput = this.container.getByTestId(
      "shipping-postal-code-input"
    )
    this.shippingProvinceInput = this.container.getByTestId(
      "shipping-province-input"
    )

    this.billingCountrySelect = this.container.getByTestId(
      "billing-country-select"
    )
    this.shippingCountrySelect = this.container.getByTestId(
      "shipping-country-select"
    )

    this.shippingAdresseSummary = this.container.getByTestId(
      "shipping-address-summary"
    )
    this.shippingKontaktSummary = this.container.getByTestId(
      "shipping-contact-summary"
    )
    this.billingAdresseSummary = this.container.getByTestId(
      "billing-address-summary"
    )

    this.submitAdresseButton = this.container.getByTestId(
      "submit-address-button"
    )
    this.addressErrorMessage = this.container.getByTestId(
      "address-error-message"
    )

    this.deliveryOptionsContainer = this.container.getByTestId(
      "delivery-options-container"
    )
    this.deliveryOptionRadio = this.container.getByTestId(
      "delivery-option-radio"
    )
    this.deliveryOptionErrorMessage = this.container.getByTestId(
      "delivery-option-error-message"
    )
    this.submitDeliveryOptionButton = this.container.getByTestId(
      "submit-delivery-option-button"
    )
    this.deliveryOptionSummary = this.container.getByTestId(
      "delivery-option-summary"
    )

    this.paymentMethodSummary = this.container.getByTestId(
      "payment-method-summary"
    )
    this.paymentDetailsSummary = this.container.getByTestId(
      "payment-details-summary"
    )
    this.paymentMethodErrorMessage = this.container.getByTestId(
      "payment-method-error-message"
    )
    this.submitPaymentButton = this.container.getByTestId(
      "submit-payment-button"
    )
    this.stripePaymentErrorMessage = this.container.getByTestId(
      "stripe-payment-error-message"
    )
    this.paypalPaymentErrorMessage = this.container.getByTestId(
      "paypal-payment-error-message"
    )
    this.manualPaymentErrorMessage = this.container.getByTestId(
      "manual-payment-error-message"
    )
    this.submitOrderButton = this.container.getByTestId("submit-order-button")

    this.discountButton = this.container.getByTestId("add-discount-button")
    this.discountInput = this.container.getByTestId("discount-input")
    this.discountApplyButton = this.container.getByTestId(
      "discount-apply-button"
    )
    this.discountErrorMessage = this.container.getByTestId(
      "discount-error-message"
    )
    this.discountRow = this.container.getByTestId("discount-row")
    this.giftCardRow = this.container.getByTestId("gift-card")
    this.giftCardCode = this.container.getByTestId("gift-card-code")
    this.giftCardAmount = this.container.getByTestId("gift-card-amount")
    this.giftCardRemoveButton = this.container.getByTestId(
      "remove-gift-card-button"
    )
    this.cartSubtotal = this.container.getByTestId("cart-subtotal")
    this.cartRabatt = this.container.getByTestId("cart-discount")
    this.cartGiftCardAmount = this.container.getByTestId(
      "cart-gift-card-amount"
    )
    this.cartVersand = this.container.getByTestId("cart-shipping")
    this.cartTaxes = this.container.getByTestId("cart-taxes")
    this.cartGesamt = this.container.getByTestId("cart-total")
    this.itemsTable = this.container.getByTestId("items-table")
    this.itemRow = this.container.getByTestId("item-row")
    this.itemTitle = this.container.getByTestId("item-title")
    this.itemVariant = this.container.getByTestId("item-variant")
    this.itemQuantity = this.container.getByTestId("item-quantity")
    this.itemOriginalPrice = this.container.getByTestId("item-original-price")
    this.itemReducedPrice = this.container.getByTestId("item-reduced-price")
    this.itemUnitOriginalPrice = this.container.getByTestId(
      "item-unit-original-price"
    )
    this.itemUnitReducedPrice = this.container.getByTestId(
      "item-unit-reduced-price"
    )
  }

  async selectSavedAdresse(address: string) {
    await this.shippingAdresseSelect.click()
    const addressOption = this.shippingAdresseOption.filter({
      hasText: address,
    })
    await addressOption.getByTestId("shipping-address-radio").click()

    const selectHandle = await this.shippingAdresseSelect.elementHandle()
    await this.page.waitForFunction(
      (opts) => {
        const select = opts[0]
        const choice = opts[1]
        return (select.textContent || "").includes(choice)
      },
      [selectHandle, address] as [ElementHandle, string]
    )
  }

  async selectDeliveryOption(option: string) {
    await this.deliveryOptionRadio.filter({ hasText: option }).click()
  }

  async getGiftCard(code: string) {
    const giftCardRow = this.giftCardRow.filter({
      hasText: code,
    })
    const amount = giftCardRow.getByTestId("gift-card-amount")
    return {
      locator: giftCardRow,
      code: giftCardRow.getByTestId("gift-card-code"),
      amount,
      amountValue: await amount.getAttribute("data-value"),
      removeButton: giftCardRow.getByTestId("remove-gift-card-button"),
    }
  }

  async getRabatt(code: string) {
    const discount = this.discountRow
    const amount = discount.getByTestId("discount-amount")
    return {
      locator: discount,
      code: discount.getByTestId("discount-code"),
      amount,
      amountValue: await amount.getAttribute("data-value"),
      removeButton: discount.getByTestId("remove-discount-button"),
    }
  }
}
