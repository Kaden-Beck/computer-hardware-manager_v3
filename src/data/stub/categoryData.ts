import type { Category } from '@/schema/Category';

export const categoryDetails: Category[] = [
  {
    id: 'cat00001',
    name: 'GPU',
    description:
      'Graphics processing units for rendering and compute workloads.',
    isParent: true,
  },
  {
    id: 'cat00002',
    name: 'CPU',
    description:
      'Central processing units, the primary compute component of a system.',
    isParent: true,
  },
  {
    id: 'cat00003',
    name: 'Motherboard',
    description: 'Main circuit boards that connect all components in a system.',
    isParent: true,
  },
  {
    id: 'cat00004',
    name: 'RAM',
    description: 'Random access memory modules for system memory.',
    isParent: true,
  },
  {
    id: 'cat00005',
    name: 'Storage',
    description: 'HDDs, SSDs, and NVMe drives for data storage.',
    isParent: true,
  },
  {
    id: 'cat00006',
    name: 'PSU',
    description:
      'Power supply units that provide regulated power to system components.',
    isParent: true,
  },
  {
    id: 'cat00007',
    name: 'Case',
    description: 'PC chassis and enclosures that house system components.',
    isParent: true,
  },
  {
    id: 'cat00008',
    name: 'Cooling',
    description: 'CPU coolers, case fans, and liquid cooling solutions.',
    isParent: true,
  },

  // Sub-categories
  {
    id: 'cat00101',
    name: 'NVMe SSD',
    description: 'PCIe NVMe solid-state drives for high-speed storage.',
    isParent: false,
    parentId: 'cat00005', // Storage
  },
  {
    id: 'cat00102',
    name: 'SATA SSD',
    description: 'SATA-interface solid-state drives for general-purpose storage.',
    isParent: false,
    parentId: 'cat00005', // Storage
  },
  {
    id: 'cat00103',
    name: 'HDD',
    description: 'Mechanical hard disk drives for high-capacity mass storage.',
    isParent: false,
    parentId: 'cat00005', // Storage
  },
  {
    id: 'cat00104',
    name: 'Air Cooling',
    description: 'Heatsink and fan CPU coolers for air-based thermal management.',
    isParent: false,
    parentId: 'cat00008', // Cooling
  },
  {
    id: 'cat00105',
    name: 'AIO Liquid Cooling',
    description: 'All-in-one closed-loop liquid coolers for CPUs.',
    isParent: false,
    parentId: 'cat00008', // Cooling
  },
  {
    id: 'cat00106',
    name: 'Workstation GPU',
    description: 'Professional-grade GPUs for CAD, rendering, and ML workloads.',
    isParent: false,
    parentId: 'cat00001', // GPU
  },
];
