import { seedRabatt, seedUser } from "../../data/seed"
import { test, expect } from "../../index"

test.describe("Rabatt tests", async () => {
  let discount = {
    id: "",
    code: "",
    rule_id: "",
    amount: 0,
  }
  test.beforeEach(async () => {
    discount = await seedRabatt()
  })

  test("Make sure discount works during transaction", async ({
    cartPage,
    checkoutPage,
    orderPage,
    productPage,
    storePage,
  }) => {
    let cartSubtotal = 0
    await test.step("Go through purchasing process, upto the cart page", async () => {
      await test.step("Navigate to a product page", async () => {
        await storePage.goto()
        const product = await storePage.getProduct("Sweatshirt")
        await product.locator.click()
        await productPage.container.waitFor({ state: "visible" })
      })

      await test.step("Add the product to the cart and goto checkout", async () => {
        await productPage.selectOption("M")
        await productPage.clickAddProduct()
        await productPage.cartDropdown.navWarenkorbLink.click()
        await productPage.cartDropdown.goToWarenkorbButton.click()
        await cartPage.container.waitFor({ state: "visible" })
        await cartPage.cartDropdown.close()
        cartSubtotal = Number(
          (await cartPage.cartGesamt.getAttribute("data-value")) || ""
        )
      })
      await test.step("Navigate to the checkout page", async () => {
        await cartPage.checkoutButton.click()
        await checkoutPage.container.waitFor({ state: "visible" })
      })
    })

    await test.step("Enter in the discount and assert value works", async () => {
      await checkoutPage.discountButton.click()
      await expect(checkoutPage.discountInput).toBeVisible()
      await checkoutPage.discountInput.fill(discount.code)
      await checkoutPage.discountApplyButton.click()
      const paymentRabatt = await checkoutPage.getRabatt(discount.code)
      await expect(paymentRabatt.locator).toBeVisible()
      await expect(paymentRabatt.code).toHaveText(discount.code)
      expect(paymentRabatt.amountValue).toBe(discount.amount.toString())
      expect(await checkoutPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartSubtotal - discount.amount).toString()
      )
    })

    let shippingGesamt = 0
    await test.step("Go through checkout process", async () => {
      await test.step("Enter in the first step of the checkout process", async () => {
        await test.step("Enter in the shipping address info", async () => {
          await checkoutPage.shippingFirstNameInput.fill("First")
          await checkoutPage.shippingLastNameInput.fill("Last")
          await checkoutPage.shippingCompanyInput.fill("MyCorp")
          await checkoutPage.shippingAdresseInput.fill("123 Fake street")
          await checkoutPage.shippingPostalCodeInput.fill("80010")
          await checkoutPage.shippingCityInput.fill("Denver")
          await checkoutPage.shippingProvinceInput.fill("Colorado")
          await checkoutPage.shippingCountrySelect.selectOption("United States")
        })

        await test.step("Enter in the contact info and open the billing info form", async () => {
          await checkoutPage.shippingEmailInput.fill("test@example.com")
          await checkoutPage.shippingPhoneInput.fill("3031112222")
          await checkoutPage.submitAdresseButton.click()
        })
      })

      await test.step("Complete the rest of the payment process", async () => {
        await checkoutPage.selectDeliveryOption("FakeEx Standard")
        await checkoutPage.submitDeliveryOptionButton.click()
        shippingGesamt = Number(
          (await checkoutPage.cartVersand.getAttribute("data-value")) || "0"
        )
        await checkoutPage.submitPaymentButton.click()
      })

      await test.step("Make sure the cart total is the expected value after selecting shipping", async () => {
        expect(await checkoutPage.cartGesamt.getAttribute("data-value")).toBe(
          (cartSubtotal - discount.amount + shippingGesamt).toString()
        )
      })

      await test.step("Finish completing the order", async () => {
        await checkoutPage.submitOrderButton.click()
        await orderPage.container.waitFor({ state: "visible" })
      })
    })
    const cartGesamt = Number(cartSubtotal) + Number(shippingGesamt)

    await test.step("Assert the order page shows the total was 0", async () => {
      expect(await orderPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartGesamt - discount.amount).toString()
      )
      expect(await orderPage.cartSubtotal.getAttribute("data-value")).toBe(
        cartSubtotal.toString()
      )
      expect(await orderPage.cartRabatt.getAttribute("data-value")).toBe(
        discount.amount.toString()
      )
    })
  })

  test("Make sure discount can be used when entered in from cart", async ({
    cartPage,
    checkoutPage,
    orderPage,
    productPage,
    storePage,
  }) => {
    let cartSubtotal = 0
    await test.step("Go through purchasing process, upto the cart page", async () => {
      await test.step("Navigate to a product page", async () => {
        await storePage.goto()
        const product = await storePage.getProduct("Sweatshirt")
        await product.locator.click()
        await productPage.container.waitFor({ state: "visible" })
      })

      await test.step("Add the product to the cart and goto checkout", async () => {
        await productPage.selectOption("M")
        await productPage.clickAddProduct()
        await productPage.cartDropdown.navWarenkorbLink.click()
        await productPage.cartDropdown.goToWarenkorbButton.click()
        await cartPage.container.waitFor({ state: "visible" })
        await cartPage.cartDropdown.close()
        cartSubtotal = Number(
          (await cartPage.cartGesamt.getAttribute("data-value")) || ""
        )
      })
    })

    await test.step("Enter in the discount and assert value works", async () => {
      await cartPage.discountButton.click()
      await expect(cartPage.discountInput).toBeVisible()
      await cartPage.discountInput.fill(discount.code)
      await cartPage.discountApplyButton.click()
      const paymentRabatt = await cartPage.getRabatt(discount.code)
      await expect(paymentRabatt.locator).toBeVisible()
      await expect(paymentRabatt.code).toHaveText(discount.code)
      expect(paymentRabatt.amountValue).toBe(discount.amount.toString())
      expect(await cartPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartSubtotal - discount.amount).toString()
      )
    })

    await test.step("Go to checkout and assert the value is still discounted", async () => {
      await cartPage.checkoutButton.click()
      await checkoutPage.container.waitFor({ state: "visible" })
      expect(await checkoutPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartSubtotal - discount.amount).toString()
      )
    })

    let shippingGesamt = 0
    await test.step("Go through checkout process", async () => {
      await test.step("Enter in the first step of the checkout process", async () => {
        await test.step("Enter in the shipping address info", async () => {
          await checkoutPage.shippingFirstNameInput.fill("First")
          await checkoutPage.shippingLastNameInput.fill("Last")
          await checkoutPage.shippingCompanyInput.fill("MyCorp")
          await checkoutPage.shippingAdresseInput.fill("123 Fake street")
          await checkoutPage.shippingPostalCodeInput.fill("80010")
          await checkoutPage.shippingCityInput.fill("Denver")
          await checkoutPage.shippingProvinceInput.fill("Colorado")
          await checkoutPage.shippingCountrySelect.selectOption("United States")
        })

        await test.step("Enter in the contact info and open the billing info form", async () => {
          await checkoutPage.shippingEmailInput.fill("test@example.com")
          await checkoutPage.shippingPhoneInput.fill("3031112222")
          await checkoutPage.submitAdresseButton.click()
        })
      })

      await test.step("Complete the rest of the payment process", async () => {
        await checkoutPage.selectDeliveryOption("FakeEx Standard")
        await checkoutPage.submitDeliveryOptionButton.click()
        shippingGesamt = Number(
          (await checkoutPage.cartVersand.getAttribute("data-value")) || "0"
        )
        await checkoutPage.submitPaymentButton.click()
        await checkoutPage.submitOrderButton.click()
        await orderPage.container.waitFor({ state: "visible" })
      })
    })
    const cartGesamt = Number(cartSubtotal) + Number(shippingGesamt)

    await test.step("Assert the order page shows the total was 0", async () => {
      expect(await orderPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartGesamt - discount.amount).toString()
      )
      expect(await orderPage.cartSubtotal.getAttribute("data-value")).toBe(
        cartSubtotal.toString()
      )
      expect(await orderPage.cartRabatt.getAttribute("data-value")).toBe(
        discount.amount.toString()
      )
    })
  })

  test("Ensure adding and removing a discout does not impact checkout amount", async ({
    cartPage,
    checkoutPage,
    orderPage,
    productPage,
    storePage,
  }) => {
    let cartSubtotal = 0
    await test.step("Go through purchasing process, upto the cart page", async () => {
      await test.step("Navigate to a product page", async () => {
        await storePage.goto()
        const product = await storePage.getProduct("Sweatshirt")
        await product.locator.click()
        await productPage.container.waitFor({ state: "visible" })
      })

      await test.step("Add the product to the cart and goto checkout", async () => {
        await productPage.selectOption("M")
        await productPage.clickAddProduct()
        await productPage.cartDropdown.navWarenkorbLink.click()
        await productPage.cartDropdown.goToWarenkorbButton.click()
        await cartPage.container.waitFor({ state: "visible" })
        await cartPage.cartDropdown.close()
        cartSubtotal = Number(
          (await cartPage.cartGesamt.getAttribute("data-value")) || ""
        )
      })
    })

    await test.step("Enter in the discount and assert value works", async () => {
      await cartPage.discountButton.click()
      await expect(cartPage.discountInput).toBeVisible()
      await cartPage.discountInput.fill(discount.code)
      await cartPage.discountApplyButton.click()
      const paymentRabatt = await cartPage.getRabatt(discount.code)
      await expect(paymentRabatt.locator).toBeVisible()
      await expect(paymentRabatt.code).toHaveText(discount.code)
      expect(paymentRabatt.amountValue).toBe(discount.amount.toString())
      expect(await cartPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartSubtotal - discount.amount).toString()
      )
    })

    await test.step("Go to checkout and assert the value is still discounted", async () => {
      await cartPage.checkoutButton.click()
      await checkoutPage.container.waitFor({ state: "visible" })
      expect(await checkoutPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartSubtotal - discount.amount).toString()
      )
      const paymentRabatt = await checkoutPage.getRabatt(discount.code)
      await paymentRabatt.removeButton.click()
      await expect(paymentRabatt.locator).not.toBeVisible()
      expect(await checkoutPage.cartGesamt.getAttribute("data-value")).not.toBe(
        (cartSubtotal - discount.amount).toString()
      )
    })

    let shippingGesamt = ""
    await test.step("Go through checkout process", async () => {
      await test.step("Enter in the first step of the checkout process", async () => {
        await test.step("Enter in the shipping address info", async () => {
          await checkoutPage.shippingFirstNameInput.fill("First")
          await checkoutPage.shippingLastNameInput.fill("Last")
          await checkoutPage.shippingCompanyInput.fill("MyCorp")
          await checkoutPage.shippingAdresseInput.fill("123 Fake street")
          await checkoutPage.shippingPostalCodeInput.fill("80010")
          await checkoutPage.shippingCityInput.fill("Denver")
          await checkoutPage.shippingProvinceInput.fill("Colorado")
          await checkoutPage.shippingCountrySelect.selectOption("United States")
        })

        await test.step("Enter in the contact info and open the billing info form", async () => {
          await checkoutPage.shippingEmailInput.fill("test@example.com")
          await checkoutPage.shippingPhoneInput.fill("3031112222")
          await checkoutPage.submitAdresseButton.click()
        })
      })

      await test.step("Complete the rest of the payment process", async () => {
        await checkoutPage.selectDeliveryOption("FakeEx Standard")
        await checkoutPage.submitDeliveryOptionButton.click()
        shippingGesamt =
          (await checkoutPage.cartVersand.getAttribute("data-value")) || ""
        await checkoutPage.submitPaymentButton.click()
        await checkoutPage.submitOrderButton.click()
        await orderPage.container.waitFor({ state: "visible" })
      })
    })
    const cartGesamt = (Number(cartSubtotal) + Number(shippingGesamt)).toString()

    await test.step("Assert the order page shows the total was not discounted", async () => {
      expect(await orderPage.cartGesamt.getAttribute("data-value")).toBe(
        cartGesamt
      )
      expect(await orderPage.cartSubtotal.getAttribute("data-value")).toBe(
        cartSubtotal.toString()
      )
    })
  })

  test("Make sure a fake discount displays an error message on the cart page", async ({
    cartPage,
    productPage,
    storePage,
  }) => {
    await test.step("Go through purchasing process, upto the cart page", async () => {
      await test.step("Navigate to a product page", async () => {
        await storePage.goto()
        const product = await storePage.getProduct("Sweatshirt")
        await product.locator.click()
        await productPage.container.waitFor({ state: "visible" })
      })

      await test.step("Add the product to the cart and goto checkout", async () => {
        await productPage.selectOption("M")
        await productPage.clickAddProduct()
        await productPage.cartDropdown.navWarenkorbLink.click()
        await productPage.cartDropdown.goToWarenkorbButton.click()
        await cartPage.container.waitFor({ state: "visible" })
        await cartPage.cartDropdown.close()
      })
    })
    await test.step("Enter in the fake discount", async () => {
      await cartPage.discountButton.click()
      await expect(cartPage.discountInput).toBeVisible()
      await cartPage.discountInput.fill("__FAKE_DISCOUNT_DNE_1111111")
      await cartPage.discountApplyButton.click()
      await expect(cartPage.discountErrorMessage).toBeVisible()
    })
  })

  test("Make sure a fake discount displays an error message on the checkout page", async ({
    cartPage,
    checkoutPage,
    productPage,
    storePage,
  }) => {
    await test.step("Go through purchasing process, upto the cart page", async () => {
      await test.step("Navigate to a product page", async () => {
        await storePage.goto()
        const product = await storePage.getProduct("Sweatshirt")
        await product.locator.highlight()
        await product.locator.click()
        await productPage.container.waitFor({ state: "visible" })
      })

      await test.step("Add the product to the cart and goto checkout", async () => {
        await productPage.selectOption("M")
        await productPage.clickAddProduct()
        await productPage.cartDropdown.navWarenkorbLink.click()
        await productPage.cartDropdown.goToWarenkorbButton.click()
        await cartPage.container.waitFor({ state: "visible" })
        await cartPage.cartDropdown.close()
        await cartPage.checkoutButton.click()
        await checkoutPage.container.waitFor({ state: "visible" })
      })
    })
    await test.step("Enter in the fake discount", async () => {
      await checkoutPage.discountButton.click()
      await expect(checkoutPage.discountInput).toBeVisible()
      await checkoutPage.discountInput.fill("__FAKE_DISCOUNT_DNE_1111111")
      await checkoutPage.discountApplyButton.click()
      await expect(checkoutPage.discountErrorMessage).toBeVisible()
    })
  })

  test("Adding a discount and then accessing the cart at a later point keeps the discount amount", async ({
    cartPage,
    checkoutPage,
    productPage,
    storePage,
  }) => {
    let cartSubtotal = 0
    await test.step("Go through purchasing process, upto the cart page", async () => {
      await test.step("Navigate to a product page", async () => {
        await storePage.goto()
        const product = await storePage.getProduct("Sweatshirt")
        await product.locator.click()
        await productPage.container.waitFor({ state: "visible" })
      })

      await test.step("Add the product to the cart and goto checkout", async () => {
        await productPage.selectOption("M")
        await productPage.clickAddProduct()
        await productPage.cartDropdown.navWarenkorbLink.click()
        await productPage.cartDropdown.goToWarenkorbButton.click()
        await cartPage.container.waitFor({ state: "visible" })
        await cartPage.cartDropdown.close()
        cartSubtotal = Number(
          (await cartPage.cartGesamt.getAttribute("data-value")) || ""
        )
      })
    })

    await test.step("Enter in the giftcard and assert value works", async () => {
      await cartPage.discountButton.click()
      await cartPage.discountInput.fill(discount.code)
      await cartPage.discountApplyButton.click()
      const paymentRabatt = await cartPage.getRabatt(discount.code)
      expect(paymentRabatt.amountValue).toBe(discount.amount.toString())
      expect(await cartPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartSubtotal - discount.amount).toString()
      )
    })

    await test.step("Navigate away from the cart page and return to it", async () => {
      await storePage.goto()
      const product = await storePage.getProduct("Sweatpants")
      await product.locator.click()
      await productPage.container.waitFor({ state: "visible" })
      await cartPage.goto()
      await cartPage.cartDropdown.close()
    })

    await test.step("Verify the giftcard is still on the cart page", async () => {
      const paymentRabatt = await cartPage.getRabatt(discount.code)
      await expect(paymentRabatt.locator).toBeVisible()
      await expect(paymentRabatt.code).toContainText(discount.code)
      expect(await cartPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartSubtotal - discount.amount).toString()
      )
    })

    await test.step("Verify the giftcard is still on the checkout page", async () => {
      await cartPage.checkoutButton.click()
      await checkoutPage.container.waitFor({ state: "visible" })
      const paymentRabatt = await checkoutPage.getRabatt(discount.code)
      await expect(paymentRabatt.locator).toBeVisible()
      await expect(paymentRabatt.code).toContainText(discount.code)
      expect(await checkoutPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartSubtotal - discount.amount).toString()
      )
      expect(paymentRabatt.amountValue).toBe(discount.amount.toString())
    })
  })

  test("Adding a discount and then adding another item to the cart keeps the discount", async ({
    cartPage,
    checkoutPage,
    productPage,
    storePage,
  }) => {
    let cartSubtotal = 0
    await test.step("Go through purchasing process, upto the cart page", async () => {
      await test.step("Navigate to a product page", async () => {
        await storePage.goto()
        const product = await storePage.getProduct("Sweatshirt")
        await product.locator.click()
        await productPage.container.waitFor({ state: "visible" })
      })

      await test.step("Add the product to the cart and goto checkout", async () => {
        await productPage.selectOption("M")
        await productPage.clickAddProduct()
        await productPage.cartDropdown.navWarenkorbLink.click()
        await productPage.cartDropdown.goToWarenkorbButton.click()
        await cartPage.container.waitFor({ state: "visible" })
        await cartPage.cartDropdown.close()
        cartSubtotal = Number(
          (await cartPage.cartGesamt.getAttribute("data-value")) || ""
        )
      })
    })

    await test.step("Enter in the giftcard and assert value works", async () => {
      await cartPage.discountButton.click()
      await cartPage.discountInput.fill(discount.code)
      await cartPage.discountApplyButton.click()
      const paymentRabatt = await cartPage.getRabatt(discount.code)
      expect(paymentRabatt.amountValue).toBe(discount.amount.toString())
      expect(await cartPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartSubtotal - discount.amount).toString()
      )
    })

    await test.step("Navigate away from the cart page and return to it", async () => {
      await storePage.goto()
      const product = await storePage.getProduct("Sweatpants")
      await product.locator.click()
      await productPage.container.waitFor({ state: "visible" })
      await productPage.selectOption("XL")
      await productPage.clickAddProduct()
      await productPage.cartDropdown.close()
      await cartPage.goto()
      cartSubtotal = Number(
        (await cartPage.cartSubtotal.getAttribute("data-value")) || ""
      )
    })

    await test.step("Verify the giftcard is still on the cart page", async () => {
      const paymentRabatt = await cartPage.getRabatt(discount.code)
      await expect(paymentRabatt.locator).toBeVisible()
      await expect(paymentRabatt.code).toContainText(discount.code)
      expect(await cartPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartSubtotal - discount.amount).toString()
      )
    })

    await test.step("Verify the giftcard is still on the checkout page", async () => {
      await cartPage.checkoutButton.click()
      await checkoutPage.container.waitFor({ state: "visible" })
      const paymentRabatt = await checkoutPage.getRabatt(discount.code)
      await expect(paymentRabatt.locator).toBeVisible()
      await expect(paymentRabatt.code).toContainText(discount.code)
      expect(await checkoutPage.cartGesamt.getAttribute("data-value")).toBe(
        (cartSubtotal - discount.amount).toString()
      )
      expect(paymentRabatt.amountValue).toBe(discount.amount.toString())
    })
  })
})
