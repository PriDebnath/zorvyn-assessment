import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useThemeStore } from "@/store/theme.store"
const { theme } = useThemeStore.getState()

const setAppTheme = () => {
  if (theme == "dark") {
    document.body.classList.add("dark")
  } else {
    document.body.classList.remove("dark")
  }
}
setAppTheme()

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
