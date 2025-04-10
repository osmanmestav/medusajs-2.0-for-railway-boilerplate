import { test as base } from "@playwright/test"
import { AdresseesPage } from "./addresses-page"
import { LoginPage } from "./login-page"
import { OrderPage } from "./order-page"
import { BestellungenPage } from "./orders-page"
import { OverviewPage } from "./overview-page"
import { ProfilePage } from "./profile-page"
import { RegisterPage } from "./register-page"

export const accountFixtures = base.extend<{
  accountAdresseesPage: AdresseesPage
  accountOrderPage: OrderPage
  accountBestellungenPage: BestellungenPage
  accountOverviewPage: OverviewPage
  accountProfilePage: ProfilePage
  loginPage: LoginPage
  registerPage: RegisterPage
}>({
  accountAdresseesPage: async ({ page }, use) => {
    const addressesPage = new AdresseesPage(page)
    await use(addressesPage)
  },
  accountOrderPage: async ({ page }, use) => {
    const orderPage = new OrderPage(page)
    await use(orderPage)
  },
  accountBestellungenPage: async ({ page }, use) => {
    const ordersPage = new BestellungenPage(page)
    await use(ordersPage)
  },
  accountOverviewPage: async ({ page }, use) => {
    const overviewPage = new OverviewPage(page)
    await use(overviewPage)
  },
  accountProfilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page)
    await use(profilePage)
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page)
    await use(registerPage)
  },
})
