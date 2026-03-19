import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/categories/$catId')({
  component: CategoryComponent,
});

function CategoryComponent() {
  const { catId } = Route.useParams();
  return <div>Category {catId}</div>;
}