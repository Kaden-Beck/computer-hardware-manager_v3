import type { Product } from '@/schema/Product';

// manufacturerId references src/data/stub/manufacturerData.ts
// categoryId references src/data/stub/categoryData.ts

export const productDetails: Product[] = [
  // GPUs (cat00001)
  {
    id: 'prod0001',
    name: 'GeForce RTX 4090',
    sku: 'NV-RTX4090',
    manufacturerId: '728ed52f', // NVIDIA
    categoryId: 'cat00001',
    description: 'Flagship consumer GPU with 24GB GDDR6X memory.',
    msrp: 1599.99,
    quantity: 15,
  },
  {
    id: 'prod0002',
    name: 'GeForce RTX 4070 Ti Super',
    sku: 'NV-RTX4070TIS',
    manufacturerId: '728ed52f', // NVIDIA
    categoryId: 'cat00001',
    description: 'High-end consumer GPU with 16GB GDDR6X memory.',
    msrp: 799.99,
    quantity: 30,
  },
  {
    id: 'prod0003',
    name: 'Radeon RX 7900 XTX',
    sku: 'AMD-RX7900XTX',
    manufacturerId: '489e1d42', // AMD
    categoryId: 'cat00001',
    description: 'Flagship AMD GPU with 24GB GDDR6 memory.',
    msrp: 999.99,
    quantity: 20,
  },
  {
    id: 'prod0004',
    name: 'Radeon RX 7800 XT',
    sku: 'AMD-RX7800XT',
    manufacturerId: '489e1d42', // AMD
    categoryId: 'cat00001',
    description: 'Mid-range AMD GPU with 16GB GDDR6 memory.',
    msrp: 499.99,
    quantity: 45,
  },

  // CPUs (cat00002)
  {
    id: 'prod0005',
    name: 'Core i9-14900K',
    sku: 'INT-I9-14900K',
    manufacturerId: '1a2b3c4d', // Intel
    categoryId: 'cat00002',
    description: '24-core (8P+16E) flagship desktop CPU with 6.0GHz max turbo.',
    msrp: 549.99,
    quantity: 25,
  },
  {
    id: 'prod0006',
    name: 'Core i5-14600K',
    sku: 'INT-I5-14600K',
    manufacturerId: '1a2b3c4d', // Intel
    categoryId: 'cat00002',
    description: '14-core (6P+8E) mid-range desktop CPU.',
    msrp: 299.99,
    quantity: 50,
  },
  {
    id: 'prod0007',
    name: 'Ryzen 9 7950X',
    sku: 'AMD-R9-7950X',
    manufacturerId: '489e1d42', // AMD
    categoryId: 'cat00002',
    description: '16-core 32-thread flagship desktop CPU on the AM5 platform.',
    msrp: 699.99,
    quantity: 18,
  },
  {
    id: 'prod0008',
    name: 'Ryzen 5 7600X',
    sku: 'AMD-R5-7600X',
    manufacturerId: '489e1d42', // AMD
    categoryId: 'cat00002',
    description: '6-core 12-thread mid-range desktop CPU on the AM5 platform.',
    msrp: 249.99,
    quantity: 60,
  },

  // Motherboards (cat00003)
  {
    id: 'prod0009',
    name: 'ROG Maximus Z790 Apex',
    sku: 'ASU-ROG-Z790A',
    manufacturerId: '5e6f7a8b', // ASUS
    categoryId: 'cat00003',
    description: 'High-end Z790 ATX motherboard for Intel LGA1700.',
    msrp: 699.99,
    quantity: 12,
  },
  {
    id: 'prod0010',
    name: 'MEG X670E ACE',
    sku: 'MSI-MEGX670ACE',
    manufacturerId: '9c0d1e2f', // MSI
    categoryId: 'cat00003',
    description: 'Flagship X670E ATX motherboard for AMD AM5.',
    msrp: 649.99,
    quantity: 10,
  },
  {
    id: 'prod0011',
    name: 'Aorus Master X670E',
    sku: 'GIG-AORX670M',
    manufacturerId: '3f4a5b6c', // Gigabyte
    categoryId: 'cat00003',
    description: 'Premium X670E ATX motherboard for AMD AM5.',
    msrp: 499.99,
    quantity: 14,
  },

  // RAM (cat00004)
  {
    id: 'prod0012',
    name: 'Vengeance DDR5-6000 32GB',
    sku: 'COR-VEN-DDR5-6K',
    manufacturerId: '7d8e9f0a', // Corsair
    categoryId: 'cat00004',
    description: 'DDR5-6000 CL36 dual-channel kit (2x16GB).',
    msrp: 139.99,
    quantity: 75,
  },
  {
    id: 'prod0013',
    name: '990 Pro DDR5-6400 32GB',
    sku: 'SAM-990P-DDR5-64',
    manufacturerId: 'b1c2d3e4', // Samsung
    categoryId: 'cat00004',
    description: 'DDR5-6400 CL32 high-performance dual-channel kit (2x16GB).',
    msrp: 159.99,
    quantity: 40,
  },
  {
    id: 'prod0014',
    name: 'Fury Beast DDR5-5200 32GB',
    sku: 'KIN-FB-DDR5-52',
    manufacturerId: '3b4c5d6e', // Kingston
    categoryId: 'cat00004',
    description: 'DDR5-5200 CL40 value dual-channel kit (2x16GB).',
    msrp: 109.99,
    quantity: 90,
  },

  // Storage (cat00005)
  {
    id: 'prod0015',
    name: '990 Pro 2TB NVMe SSD',
    sku: 'SAM-990P-2TB',
    manufacturerId: 'b1c2d3e4', // Samsung
    categoryId: 'cat00005',
    description: 'PCIe 4.0 NVMe SSD with up to 7450MB/s read speed.',
    msrp: 169.99,
    quantity: 55,
  },
  {
    id: 'prod0016',
    name: 'WD Black SN850X 2TB',
    sku: 'WD-SN850X-2TB',
    manufacturerId: 'f5a6b7c8', // Western Digital
    categoryId: 'cat00005',
    description: 'PCIe 4.0 NVMe SSD with up to 7300MB/s read speed.',
    msrp: 149.99,
    quantity: 48,
  },
  {
    id: 'prod0017',
    name: 'BarraCuda 4TB HDD',
    sku: 'SEA-BRC-4TB',
    manufacturerId: 'd9e0f1a2', // Seagate
    categoryId: 'cat00005',
    description: '3.5" 5400RPM SATA HDD for mass storage.',
    msrp: 79.99,
    quantity: 100,
  },

  // PSUs (cat00006)
  {
    id: 'prod0018',
    name: 'RM1000x 1000W',
    sku: 'COR-RM1000X',
    manufacturerId: '7d8e9f0a', // Corsair
    categoryId: 'cat00006',
    description: '1000W 80 Plus Gold fully modular ATX PSU.',
    msrp: 199.99,
    quantity: 30,
  },
  {
    id: 'prod0019',
    name: 'SuperNOVA 850 G6 850W',
    sku: 'EVG-SN850G6',
    manufacturerId: '7f8a9b0c', // EVGA
    categoryId: 'cat00006',
    description: '850W 80 Plus Gold fully modular ATX PSU.',
    msrp: 149.99,
    quantity: 35,
  },
  {
    id: 'prod0020',
    name: 'Pure Power 12M 750W',
    sku: 'BEQ-PP12M-750',
    manufacturerId: '9f0a1b2c', // be quiet!
    categoryId: 'cat00006',
    description: '750W 80 Plus Gold fully modular ATX PSU.',
    msrp: 129.99,
    quantity: 40,
  },

  // Cases (cat00007)
  {
    id: 'prod0021',
    name: 'H510 Flow',
    sku: 'CM-H510F',
    manufacturerId: '1d2e3f4a', // Cooler Master (using as placeholder — actually NZXT, but using available manufacturer)
    categoryId: 'cat00007',
    description: 'Mid-tower ATX case with mesh front panel for airflow.',
    msrp: 89.99,
    quantity: 22,
  },
  {
    id: 'prod0022',
    name: 'Silent Base 802',
    sku: 'BEQ-SB802',
    manufacturerId: '9f0a1b2c', // be quiet!
    categoryId: 'cat00007',
    description: 'Mid-tower ATX case optimized for silent operation.',
    msrp: 169.99,
    quantity: 18,
  },

  // Cooling (cat00008)
  {
    id: 'prod0023',
    name: 'NH-D15 CPU Cooler',
    sku: 'NOC-NHD15',
    manufacturerId: '5b6c7d8e', // Noctua
    categoryId: 'cat00008',
    description: 'Dual-tower air cooler with two NF-A15 fans.',
    msrp: 99.99,
    quantity: 28,
  },
  {
    id: 'prod0024',
    name: 'Hyper 212 Black Edition',
    sku: 'CM-H212BE',
    manufacturerId: '1d2e3f4a', // Cooler Master
    categoryId: 'cat00008',
    description: 'Single-tower air cooler with 120mm RGB fan.',
    msrp: 39.99,
    quantity: 80,
  },
  {
    id: 'prod0025',
    name: 'H150i Elite Capellix XT',
    sku: 'COR-H150I-ECX',
    manufacturerId: '7d8e9f0a', // Corsair
    categoryId: 'cat00008',
    description: '360mm AIO liquid cooler with three 120mm fans.',
    msrp: 199.99,
    quantity: 20,
  },
];
