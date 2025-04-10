import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Anmelden",
  description: "Sign in to your HypeMarkt account.",
}

export default function Login() {
  return <LoginTemplate />
}
