/*
Test List
- login from the sign in page redirects you page to the cart
*/
import { test, expect } from "../../index"
import { compareFloats, getFloatValue } from "../../utils"

test.describe("Warenkorb tests", async () => {
  test("Ensure adding multiple items from a product page adjusts the cart accordingly", async ({
    page,
    cartPage,
    productPage,
    storePage,
  }) => {
    // Assuming we have access to our page objects here
    const cartDropdown = cartPage.cartDropdown

    await test.step("Navigate to the product page", async () => {
      await storePage.goto()
      const product = await storePage.getProduct("Sweatshirt")
      await product.locator.click()
      await productPage.container.waitFor({ state: "visible" })
    })

    await test.step("Add the small size to the cart and verify the data", async () => {
      await productPage.selectOption("S")
      await productPage.addProductButton.click()
      await expect(cartDropdown.navWarenkorbLink).toContainText("(1)")
      const cartItem = await cartDropdown.getWarenkorbItem("Sweatshirt", "S")
      await expect(cartItem.locator).toBeVisible()
      await expect(cartItem.variant).toContainText("S")
      await expect(cartItem.quantity).toContainText("1")
      await cartDropdown.goToWarenkorbButton.click()
      await cartDropdown.close()
      await cartPage.container.waitFor({ state: "visible" })
      const productInWarenkorb = await cartPage.getProduct("Sweatshirt", "S")
      await expect(productInWarenkorb.productRow).toBeVisible()
      await expect(productInWarenkorb.quantitySelect).toHaveValue("1")
      await page.goBack()
      await productPage.container.waitFor({ state: "visible" })
    })

    await test.step("Add the small size to the cart again and verify the data", async () => {
      await productPage.selectOption("S")
      await productPage.addProductButton.click()
      await expect(cartDropdown.navWarenkorbLink).toContainText("(2)")
      const cartItem = await cartDropdown.getWarenkorbItem("Sweatshirt", "S")
      await expect(cartItem.locator).toBeVisible()
      await expect(cartItem.variant).toContainText("S")
      await expect(cartItem.quantity).toContainText("2")
      await cartDropdown.goToWarenkorbButton.click()
      await cartDropdown.close()
      await cartPage.container.waitFor({ state: "visible" })
      const productInWarenkorb = await cartPage.getProduct("Sweatshirt", "S")
      await expect(productInWarenkorb.productRow).toBeVisible()
      await expect(productInWarenkorb.quantitySelect).toHaveValue("2")
      await page.goBack()
      await productPage.container.waitFor({ state: "visible" })
    })

    await test.step("Add the medium size to the cart and verify the data", async () => {
      await productPage.selectOption("M")
      await productPage.addProductButton.click()
      await expect(cartDropdown.navWarenkorbLink).toContainText("(3)")
      const mediumWarenkorbItem = await cartDropdown.getWarenkorbItem("Sweatshirt", "M")
      await expect(mediumWarenkorbItem.locator).toBeVisible()
      await expect(mediumWarenkorbItem.variant).toContainText("M")
      await expect(mediumWarenkorbItem.quantity).toContainText("1")
      await cartDropdown.goToWarenkorbButton.click()
      await cartDropdown.close()
      await cartPage.container.waitFor({ state: "visible" })
      const mediumProductInWarenkorb = await cartPage.getProduct("Sweatshirt", "M")
      await expect(mediumProductInWarenkorb.productRow).toBeVisible()
      await expect(mediumProductInWarenkorb.quantitySelect).toHaveValue("1")
      const smallProductInWarenkorb = await cartPage.getProduct("Sweatshirt", "S")
      await expect(smallProductInWarenkorb.productRow).toBeVisible()
      await expect(smallProductInWarenkorb.quantitySelect).toHaveValue("2")
    })
  })

  test("Ensure adding two products into the cart and verify the quantities", async ({
    cartPage,
    productPage,
    storePage,
  }) => {
    const cartDropdown = cartPage.cartDropdown

    await test.step("Navigate to the product page - go to the store page and click on the Sweatshirt product", async () => {
      await storePage.goto()
      const product = await storePage.getProduct("Sweatshirt")
      await product.locator.click()
      await productPage.container.waitFor({ state: "visible" })
    })

    await test.step("Add the small sweatshirt to the cart", async () => {
      await productPage.selectOption("S")
      await productPage.addProductButton.click()
      await expect(cartDropdown.navWarenkorbLink).toContainText("(1)")
      const sweatshirtItem = await cartDropdown.getWarenkorbItem("Sweatshirt", "S")
      await expect(sweatshirtItem.locator).toBeVisible()
      await expect(sweatshirtItem.variant).toHaveText("Variant: S")
      await expect(sweatshirtItem.quantity).toContainText("1")
      await cartDropdown.close()
    })

    await test.step("Navigate to another product - Sweatpants", async () => {
      await storePage.goto()
      const product = await storePage.getProduct("Sweatpants")
      await product.locator.click()
      await productPage.container.waitFor({ state: "visible" })
    })

    await test.step("Add the small sweatpants to the cart", async () => {
      await productPage.selectOption("S")
      await productPage.addProductButton.click()
      await expect(cartDropdown.navWarenkorbLink).toContainText("(2)")
      const sweatpantsItem = await cartDropdown.getWarenkorbItem("Sweatpants", "S")
      await expect(sweatpantsItem.locator).toBeVisible()
      await expect(sweatpantsItem.variant).toHaveText("Variant: S")
      await expect(sweatpantsItem.quantity).toContainText("1")
      const sweatshirtItem = await cartDropdown.getWarenkorbItem("Sweatshirt", "S")
      await expect(sweatshirtItem.locator).toBeVisible()
      await expect(sweatshirtItem.quantity).toContainText("1")
      await cartDropdown.goToWarenkorbButton.click()
      await cartDropdown.close()
      await cartPage.container.waitFor({ state: "visible" })
    })

    await test.step("Verify the quantities in the cart", async () => {
      const sweatpantsProduct = await cartPage.getProduct("Sweatpants", "S")
      await expect(sweatpantsProduct.productRow).toBeVisible()
      await expect(sweatpantsProduct.quantitySelect).toHaveValue("1")
      const sweatshirtProduct = await cartPage.getProduct("Sweatshirt", "S")
      await expect(sweatshirtProduct.productRow).toBeVisible()
      await expect(sweatshirtProduct.quantitySelect).toHaveValue("1")
    })
  })

  test("Verify the prices carries over to checkout", async ({
    cartPage,
    productPage,
    storePage,
  }) => {
    await test.step("Navigate to the product page - go to the store page and click on the Hoodie product", async () => {
      await storePage.goto()
      const product = await storePage.getProduct("Hoodie")
      await product.locator.click()
      await productPage.container.waitFor({ state: "visible" })
    })

    let hoodieSmallPrice = 0
    let hoodieMediumPrice = 0
    await test.step("Add the hoodie to the cart", async () => {
      await productPage.selectOption("S")
      hoodieSmallPrice = getFloatValue(
        (await productPage.productPrice.getAttribute("data-value")) || "0"
      )
      await productPage.clickAddProduct()
      await productPage.cartDropdown.close()
      await productPage.selectOption("M")
      hoodieMediumPrice = getFloatValue(
        (await productPage.productPrice.getAttribute("data-value")) || "0"
      )
      await productPage.clickAddProduct()

      await productPage.cartDropdown.close()
    })

    await test.step("Navigate to another product - Longsleeve", async () => {
      await storePage.goto()
      const product = await storePage.getProduct("Longsleeve")
      await product.locator.click()
      await productPage.container.waitFor({ state: "visible" })
    })

    let longsleeveSmallPrice = 0
    await test.step("Add the small longsleeve to the cart", async () => {
      await productPage.selectOption("S")
      longsleeveSmallPrice = getFloatValue(
        (await productPage.productPrice.getAttribute("data-value")) || "0"
      )
      await productPage.clickAddProduct()
      await productPage.cartDropdown.close()
      await productPage.selectOption("S")
      await productPage.clickAddProduct()
      await productPage.selectOption("S")
      await productPage.clickAddProduct()
      await productPage.cartDropdown.goToWarenkorbButton.click()
      await productPage.cartDropdown.close()
      await cartPage.container.waitFor({ state: "visible" })
    })

    await test.step("Verify the price in the cart is the expected value", async () => {
      const total = getFloatValue(
        (await cartPage.cartSubtotal.getAttribute("data-value")) || "0"
      )
      const calculatedGesamt =
        3 * longsleeveSmallPrice + hoodieSmallPrice + hoodieMediumPrice
      expect(compareFloats(total, calculatedGesamt)).toBe(0)
    })
  })
})
