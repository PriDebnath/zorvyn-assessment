import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: lazyRouteComponent(() =>
    import('@/page/dashboard/dashboard').then(mod => ({ default: mod.default })),
  ),
})

 
