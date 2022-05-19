import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Money from "./pages/Money"
import Wallet from "./pages/Wallet"
import { ADMIN_ROUTE, LOGIN_ROUTE, MONEY_ROUTE, REGISTRATION_ROUTE, WALLET_ROUTE } from "./utils/consts"

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: <Admin />
  },
  {
    path: MONEY_ROUTE,
    Component: <Money />
  },
  {
    path: WALLET_ROUTE,
    Component: <Wallet />
  },
]

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Auth />
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Auth />
  },
]