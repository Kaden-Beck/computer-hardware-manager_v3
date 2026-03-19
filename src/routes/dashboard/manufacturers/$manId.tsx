import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/manufacturers/$manId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/manufacturers/$manId"!</div>
}
