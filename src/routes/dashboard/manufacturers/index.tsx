import ManufacturerPage from '@/components/manufacturer/Manufacturer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/manufacturers/')({
  component: ManufacturerPage,
});

