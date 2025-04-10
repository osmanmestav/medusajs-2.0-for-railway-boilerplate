import { AdresseesPage } from "../../fixtures/account/addresses-page"
import { test, expect } from "../../index"
import { getSelectedOptionText } from "../../utils/locators"

test.describe("Adressees tests", () => {
  test("Creating a new address is displayed during checkout", async ({
    accountAdresseesPage: addressesPage,
    cartPage,
    checkoutPage,
    productPage,
    storePage,
  }) => {
    await test.step("Navigate to the new address modal", async () => {
      await addressesPage.goto()
      await addressesPage.newAdresseButton.click()
      await addressesPage.addAdresseModal.container.waitFor({ state: "visible" })
    })

    await test.step("Inputs and saves the new address", async () => {
      const modal = addressesPage.addAdresseModal
      await modal.firstNameInput.fill("First")
      await modal.lastNameInput.fill("Last")
      await modal.companyInput.fill("FirstCorp")
      await modal.address1Input.fill("123 Fake Street")
      await modal.address2Input.fill("Apt 1")
      await modal.postalCodeInput.fill("11111")
      await modal.cityInput.fill("City")
      await modal.stateInput.fill("Colorado")
      await modal.countrySelect.selectOption({
        label: "United States",
      })
      await modal.phoneInput.fill("1112223333")
      await modal.saveButton.click()
      await modal.container.waitFor({ state: "hidden" })
    })

    await test.step("Navigate to a product page and add a product to the cart", async () => {
      await storePage.goto()
      const product = await storePage.getProduct("Sweatshirt")
      await product.locator.highlight()
      await product.locator.click()
      await productPage.container.waitFor({ state: "visible" })
      await productPage.selectOption("M")
      await productPage.addProductButton.click()
      await productPage.cartDropdown.navWarenkorbLink.click()
      await productPage.cartDropdown.goToWarenkorbButton.click()
      await cartPage.container.waitFor({ state: "visible" })
      await cartPage.checkoutButton.click()
      await checkoutPage.container.waitFor({ state: "visible" })
    })

    await test.step("Verify the address is correct in the checkout process", async () => {
      await checkoutPage.selectSavedAdresse("123 Fake Street")
      await expect(checkoutPage.shippingFirstNameInput).toHaveValue("First")
      await expect(checkoutPage.shippingLastNameInput).toHaveValue("Last")
      await expect(checkoutPage.shippingCompanyInput).toHaveValue("FirstCorp")
      await expect(checkoutPage.shippingAdresseInput).toHaveValue(
        "123 Fake Street"
      )
      await expect(checkoutPage.shippingPostalCodeInput).toHaveValue("11111")
      await expect(checkoutPage.shippingCityInput).toHaveValue("City")
      await expect(checkoutPage.shippingProvinceInput).toHaveValue("Colorado")
      expect(
        await getSelectedOptionText(
          checkoutPage.page,
          checkoutPage.shippingCountrySelect
        )
      ).toContain("United States")
    })
  })

  test("Performing all the CRUD actions for an address", async ({
    accountAdresseesPage: addressesPage,
  }) => {
    await test.step("Navigate to the new address modal", async () => {
      await addressesPage.goto()
      await addressesPage.newAdresseButton.click()
      await addressesPage.addAdresseModal.container.waitFor({ state: "visible" })
    })

    await test.step("Input and save a new address", async () => {
      const { addAdresseModal } = addressesPage
      await addAdresseModal.firstNameInput.fill("First")
      await addAdresseModal.lastNameInput.fill("Last")
      await addAdresseModal.companyInput.fill("MyCorp")
      await addAdresseModal.address1Input.fill("123 Fake Street")
      await addAdresseModal.address2Input.fill("Apt 1")
      await addAdresseModal.postalCodeInput.fill("80010")
      await addAdresseModal.cityInput.fill("Denver")
      await addAdresseModal.stateInput.fill("Colorado")
      await addAdresseModal.countrySelect.selectOption({ label: "United States" })
      await addAdresseModal.phoneInput.fill("3031112222")
      await addAdresseModal.saveButton.click()
      await addAdresseModal.container.waitFor({ state: "hidden" })
    })

    let addressContainer: ReturnType<AdresseesPage["getAdresseContainer"]>
    await test.step("Make sure the address container was appended to the page", async () => {
      addressContainer = addressesPage.getAdresseContainer("First Last")
      await expect(addressContainer.name).toHaveText("First Last")
      await expect(addressContainer.company).toHaveText("MyCorp")
      await expect(addressContainer.address).toContainText("123 Fake Street")
      await expect(addressContainer.address).toContainText("Apt 1")
      await expect(addressContainer.postalCity).toContainText("80010, Denver")
      await expect(addressContainer.provinceCountry).toContainText("Colorado, US")
    })

    await test.step("Refresh the page and assert address was saved", async () => {
      await addressesPage.page.reload()
      addressContainer = addressesPage.getAdresseContainer("First Last")
      await expect(addressContainer.name).toHaveText("First Last")
      await expect(addressContainer.company).toHaveText("MyCorp")
      await expect(addressContainer.address).toContainText("123 Fake Street")
      await expect(addressContainer.address).toContainText("Apt 1")
      await expect(addressContainer.postalCity).toContainText("80010, Denver")
      await expect(addressContainer.provinceCountry).toContainText("Colorado, US")
    })

    await test.step("Edit the address", async () => {
      await addressContainer.editButton.click()
      await addressesPage.editAdresseModal.container.waitFor({ state: "visible" })
      await addressesPage.editAdresseModal.firstNameInput.fill("Second")
      await addressesPage.editAdresseModal.lastNameInput.fill("Final")
      await addressesPage.editAdresseModal.companyInput.fill("MeCorp")
      await addressesPage.editAdresseModal.address1Input.fill("123 Spark Street")
      await addressesPage.editAdresseModal.address2Input.fill("Unit 3")
      await addressesPage.editAdresseModal.postalCodeInput.fill("80011")
      await addressesPage.editAdresseModal.cityInput.fill("Broomfield")
      await addressesPage.editAdresseModal.stateInput.fill("CO")
      await addressesPage.editAdresseModal.countrySelect.selectOption({
        label: "Canada",
      })
      await addressesPage.editAdresseModal.phoneInput.fill("3032223333")
      await addressesPage.editAdresseModal.saveButton.click()
      await addressesPage.editAdresseModal.container.waitFor({ state: "hidden" })
    })

    await test.step("Make sure edits were saved on the addressContainer", async () => {
      addressContainer = addressesPage.getAdresseContainer("Second Final")
      await expect(addressContainer.name).toContainText("Second Final")
      await expect(addressContainer.company).toContainText("MeCorp")
      await expect(addressContainer.address).toContainText("123 Spark Street, Unit 3")
      await expect(addressContainer.postalCity).toContainText("80011, Broomfield")
      await expect(addressContainer.provinceCountry).toContainText("CO, CA")
    })

    await test.step("Refresh the page and assert edits were saved", async () => {
      await addressesPage.page.reload()
      await expect(addressContainer.name).toContainText("Second Final")
      await expect(addressContainer.company).toContainText("MeCorp")
      await expect(addressContainer.address).toContainText("123 Spark Street, Unit 3")
      await expect(addressContainer.postalCity).toContainText("80011, Broomfield")
      await expect(addressContainer.provinceCountry).toContainText("CO, CA")
    })

    await test.step("Delete the address", async () => {
      await addressContainer.deleteButton.click()
      await addressContainer.container.waitFor({ state: "hidden" })
      await addressesPage.page.reload()
      await expect(addressContainer.container).not.toBeVisible()
    })

    await test.step("Ensure address remains deleted after refresh", async () => {
      await addressesPage.page.reload()
      await expect(addressContainer.container).not.toBeVisible()
    })
  })

  test.skip("Attempt to create duplicate addresses on the address page", async ({
    accountAdresseesPage: addressesPage
  }) => {
    await test.step("navigate to the new address modal", async () => {
      await addressesPage.goto()
      await addressesPage.newAdresseButton.click()
      await addressesPage.addAdresseModal.container.waitFor({ state: "visible" })
    })

    await test.step("Input and save a new address", async () => {
      await addressesPage.addAdresseModal.firstNameInput.fill("First")
      await addressesPage.addAdresseModal.lastNameInput.fill("Last")
      await addressesPage.addAdresseModal.companyInput.fill("MyCorp")
      await addressesPage.addAdresseModal.address1Input.fill("123 Fake Street")
      await addressesPage.addAdresseModal.address2Input.fill("Apt 1")
      await addressesPage.addAdresseModal.postalCodeInput.fill("80010")
      await addressesPage.addAdresseModal.cityInput.fill("Denver")
      await addressesPage.addAdresseModal.stateInput.fill("Colorado")
      await addressesPage.addAdresseModal.countrySelect.selectOption({
        label: "United States",
      })
      await addressesPage.addAdresseModal.phoneInput.fill("3031112222")
      await addressesPage.addAdresseModal.saveButton.click()
      await addressesPage.addAdresseModal.container.waitFor({ state: "hidden" })
    })

    await test.step("Attempt to create the same address", async () => {
      await addressesPage.newAdresseButton.click()
      await addressesPage.addAdresseModal.container.waitFor({ state: "visible" })
      await addressesPage.addAdresseModal.firstNameInput.fill("First")
      await addressesPage.addAdresseModal.lastNameInput.fill("Last")
      await addressesPage.addAdresseModal.companyInput.fill("MyCorp")
      await addressesPage.addAdresseModal.address1Input.fill("123 Fake Street")
      await addressesPage.addAdresseModal.address2Input.fill("Apt 1")
      await addressesPage.addAdresseModal.postalCodeInput.fill("80010")
      await addressesPage.addAdresseModal.cityInput.fill("Denver")
      await addressesPage.addAdresseModal.stateInput.fill("Colorado")
      await addressesPage.addAdresseModal.countrySelect.selectOption({
        label: "United States",
      })
      await addressesPage.addAdresseModal.phoneInput.fill("3031112222")
      await addressesPage.addAdresseModal.saveButton.click()
    })

    await test.step("Validate error state", async () => {

    })
  })

  test("Creating multiple tests works correctly", async ({
    accountAdresseesPage: addressesPage,
  }) => {
    test.slow()
    await test.step("Navigate to the new address modal", async () => {
      await addressesPage.goto()
    })

    let addressContainer: ReturnType<AdresseesPage["getAdresseContainer"]>
    for (let i = 0; i < 10; i++) {
      await test.step("Open up the new address modal", async () => {
        await addressesPage.newAdresseButton.click()
        await addressesPage.addAdresseModal.container.waitFor({ state: "visible" })
      })
      await test.step("Input and save a new address", async () => {
        const { addAdresseModal } = addressesPage
        await addAdresseModal.firstNameInput.fill(`First-${i}`)
        await addAdresseModal.lastNameInput.fill(`Last-${i}`)
        await addAdresseModal.companyInput.fill(`MyCorp-${i}`)
        await addAdresseModal.address1Input.fill(`123 Fake Street-${i}`)
        await addAdresseModal.address2Input.fill("Apt 1")
        await addAdresseModal.postalCodeInput.fill("80010")
        await addAdresseModal.cityInput.fill("Denver")
        await addAdresseModal.stateInput.fill("Colorado")
        await addAdresseModal.countrySelect.selectOption({ label: "United States" })
        await addAdresseModal.phoneInput.fill("3031112222")
        await addAdresseModal.saveButton.click()
        await addAdresseModal.container.waitFor({ state: "hidden" })
      })
      await test.step("Make sure the address container was appended to the page", async () => {
        addressContainer = addressesPage.getAdresseContainer(`First-${i} Last-${i}`)
        await expect(addressContainer.name).toHaveText(`First-${i} Last-${i}`)
        await expect(addressContainer.company).toHaveText(`MyCorp-${i}`)
        await expect(addressContainer.address).toContainText(`123 Fake Street-${i}`)
        await expect(addressContainer.address).toContainText("Apt 1")
        await expect(addressContainer.postalCity).toContainText("80010, Denver")
        await expect(addressContainer.provinceCountry).toContainText("Colorado, US")
      })
    }
  })
})