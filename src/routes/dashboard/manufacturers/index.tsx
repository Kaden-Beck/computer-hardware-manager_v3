import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/manufacturers/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/manufacturers/"!</div>
}
