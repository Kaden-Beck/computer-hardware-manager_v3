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

  // Cooling (cat00008) — parent-level entries kept for backwards compat
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

  // More GPUs (cat00001)
  {
    id: 'prod0026',
    name: 'GeForce RTX 4080 Super',
    sku: 'NV-RTX4080S',
    manufacturerId: '728ed52f', // NVIDIA
    categoryId: 'cat00001',
    description: 'High-end consumer GPU with 16GB GDDR6X memory.',
    msrp: 999.99,
    quantity: 22,
  },
  {
    id: 'prod0027',
    name: 'Radeon RX 7600',
    sku: 'AMD-RX7600',
    manufacturerId: '489e1d42', // AMD
    categoryId: 'cat00001',
    description: 'Entry-level GPU with 8GB GDDR6 memory and AV1 encode.',
    msrp: 269.99,
    quantity: 65,
  },
  {
    id: 'prod0028',
    name: 'GeForce RTX 4060 Ti',
    sku: 'NV-RTX4060TI',
    manufacturerId: '728ed52f', // NVIDIA
    categoryId: 'cat00001',
    description: 'Mid-range GPU with 16GB GDDR6 and DLSS 3 support.',
    msrp: 499.99,
    quantity: 38,
  },

  // More CPUs (cat00002)
  {
    id: 'prod0029',
    name: 'Core i7-14700K',
    sku: 'INT-I7-14700K',
    manufacturerId: '1a2b3c4d', // Intel
    categoryId: 'cat00002',
    description: '20-core (8P+12E) desktop CPU with 5.6GHz max turbo.',
    msrp: 409.99,
    quantity: 35,
  },
  {
    id: 'prod0030',
    name: 'Ryzen 7 7700X',
    sku: 'AMD-R7-7700X',
    manufacturerId: '489e1d42', // AMD
    categoryId: 'cat00002',
    description: '8-core 16-thread desktop CPU on AM5 with 5.4GHz boost.',
    msrp: 349.99,
    quantity: 42,
  },
  {
    id: 'prod0031',
    name: 'Core i3-14100',
    sku: 'INT-I3-14100',
    manufacturerId: '1a2b3c4d', // Intel
    categoryId: 'cat00002',
    description: '4-core 8-thread budget desktop CPU with 4.7GHz max turbo.',
    msrp: 134.99,
    quantity: 90,
  },
  {
    id: 'prod0032',
    name: 'Ryzen 5 5600',
    sku: 'AMD-R5-5600',
    manufacturerId: '489e1d42', // AMD
    categoryId: 'cat00002',
    description: '6-core 12-thread AM4 desktop CPU, excellent price-to-performance.',
    msrp: 129.99,
    quantity: 85,
  },
  {
    id: 'prod0033',
    name: 'Ryzen 9 9950X',
    sku: 'AMD-R9-9950X',
    manufacturerId: '489e1d42', // AMD
    categoryId: 'cat00002',
    description: '16-core 32-thread Zen 5 desktop CPU on AM5 with 5.7GHz boost.',
    msrp: 649.99,
    quantity: 14,
  },

  // More Motherboards (cat00003)
  {
    id: 'prod0034',
    name: 'ROG Strix B650-E Gaming WiFi',
    sku: 'ASU-B650ESTRIX',
    manufacturerId: '5e6f7a8b', // ASUS
    categoryId: 'cat00003',
    description: 'Mid-range B650E ATX board for AMD AM5 with WiFi 6E.',
    msrp: 299.99,
    quantity: 20,
  },
  {
    id: 'prod0035',
    name: 'MAG B760M Mortar WiFi',
    sku: 'MSI-B760MMORTARW',
    manufacturerId: '9c0d1e2f', // MSI
    categoryId: 'cat00003',
    description: 'mATX B760 board for Intel LGA1700 with WiFi 6E.',
    msrp: 179.99,
    quantity: 30,
  },
  {
    id: 'prod0036',
    name: 'B650M Steel Legend WiFi',
    sku: 'ASR-B650MSLW',
    manufacturerId: 'asrk0001', // ASRock
    categoryId: 'cat00003',
    description: 'mATX B650 board for AMD AM5 with WiFi 6E and 2.5G LAN.',
    msrp: 159.99,
    quantity: 25,
  },
  {
    id: 'prod0037',
    name: 'Z790 Aorus Elite AX',
    sku: 'GIG-Z790AORAX',
    manufacturerId: '3f4a5b6c', // Gigabyte
    categoryId: 'cat00003',
    description: 'ATX Z790 board for Intel LGA1700 with DDR5 and WiFi 6E.',
    msrp: 269.99,
    quantity: 16,
  },

  // More RAM (cat00004)
  {
    id: 'prod0038',
    name: 'Trident Z5 RGB DDR5-6400 32GB',
    sku: 'GSK-TZ5RGB-DDR5-64',
    manufacturerId: 'gskl0001', // G.Skill
    categoryId: 'cat00004',
    description: 'DDR5-6400 CL32 enthusiast RGB kit (2x16GB).',
    msrp: 189.99,
    quantity: 35,
  },
  {
    id: 'prod0039',
    name: 'Pro DDR5-4800 32GB',
    sku: 'CRU-PRO-DDR5-48',
    manufacturerId: 'cru00001', // Crucial
    categoryId: 'cat00004',
    description: 'DDR5-4800 CL40 value kit (2x16GB), great for budget AM5/Z790 builds.',
    msrp: 89.99,
    quantity: 100,
  },
  {
    id: 'prod0040',
    name: 'Ripjaws V DDR4-3600 16GB',
    sku: 'GSK-RJV-DDR4-36',
    manufacturerId: 'gskl0001', // G.Skill
    categoryId: 'cat00004',
    description: 'DDR4-3600 CL16 dual-channel kit (2x8GB), popular for AM4/Z490 builds.',
    msrp: 49.99,
    quantity: 120,
  },

  // NVMe SSDs (cat00101 — sub of Storage)
  {
    id: 'prod0041',
    name: 'Crucial T700 2TB NVMe',
    sku: 'CRU-T700-2TB',
    manufacturerId: 'cru00001', // Crucial
    categoryId: 'cat00101',
    description: 'PCIe 5.0 NVMe SSD with up to 12,400MB/s sequential read.',
    msrp: 219.99,
    quantity: 30,
  },
  {
    id: 'prod0042',
    name: 'Platinum P41 2TB NVMe',
    sku: 'SKH-P41-2TB',
    manufacturerId: 'skhx0001', // SK Hynix
    categoryId: 'cat00101',
    description: 'PCIe 4.0 NVMe SSD with up to 7,000MB/s read, excellent efficiency.',
    msrp: 149.99,
    quantity: 40,
  },
  {
    id: 'prod0043',
    name: 'FireCuda 530 1TB NVMe',
    sku: 'SEA-FC530-1TB',
    manufacturerId: 'd9e0f1a2', // Seagate
    categoryId: 'cat00101',
    description: 'PCIe 4.0 NVMe SSD with up to 7,300MB/s read, heatsink model available.',
    msrp: 109.99,
    quantity: 45,
  },
  {
    id: 'prod0044',
    name: 'WD Blue SN580 1TB NVMe',
    sku: 'WD-SN580-1TB',
    manufacturerId: 'f5a6b7c8', // Western Digital
    categoryId: 'cat00101',
    description: 'PCIe 4.0 NVMe SSD for mainstream builds with up to 4,150MB/s read.',
    msrp: 79.99,
    quantity: 70,
  },

  // SATA SSDs (cat00102 — sub of Storage)
  {
    id: 'prod0045',
    name: '870 EVO 1TB SATA SSD',
    sku: 'SAM-870EVO-1TB',
    manufacturerId: 'b1c2d3e4', // Samsung
    categoryId: 'cat00102',
    description: '2.5" SATA SSD with up to 560MB/s read, ideal for laptop upgrades.',
    msrp: 89.99,
    quantity: 80,
  },
  {
    id: 'prod0046',
    name: 'MX500 1TB SATA SSD',
    sku: 'CRU-MX500-1TB',
    manufacturerId: 'cru00001', // Crucial
    categoryId: 'cat00102',
    description: '2.5" SATA SSD with hardware AES encryption and 560MB/s read.',
    msrp: 74.99,
    quantity: 95,
  },
  {
    id: 'prod0047',
    name: 'Barracuda Q1 960GB SATA SSD',
    sku: 'SEA-BRCQ1-960',
    manufacturerId: 'd9e0f1a2', // Seagate
    categoryId: 'cat00102',
    description: '2.5" SATA SSD, budget-friendly option at 550MB/s read.',
    msrp: 59.99,
    quantity: 60,
  },

  // HDDs (cat00103 — sub of Storage)
  {
    id: 'prod0048',
    name: 'WD Blue 6TB HDD',
    sku: 'WD-BLUE-6TB',
    manufacturerId: 'f5a6b7c8', // Western Digital
    categoryId: 'cat00103',
    description: '3.5" 5400RPM SATA HDD for desktop mass storage.',
    msrp: 109.99,
    quantity: 55,
  },
  {
    id: 'prod0049',
    name: 'IronWolf 4TB NAS HDD',
    sku: 'SEA-IW-4TB',
    manufacturerId: 'd9e0f1a2', // Seagate
    categoryId: 'cat00103',
    description: '3.5" 5400RPM NAS-optimised HDD rated for 24/7 operation.',
    msrp: 94.99,
    quantity: 40,
  },

  // More PSUs (cat00006)
  {
    id: 'prod0050',
    name: 'Focus GX-850 850W',
    sku: 'SEA-FGXA-850',
    manufacturerId: 'seas0001', // Seasonic
    categoryId: 'cat00006',
    description: '850W 80 Plus Gold fully modular PSU with 10-year warranty.',
    msrp: 159.99,
    quantity: 28,
  },
  {
    id: 'prod0051',
    name: 'Toughpower GF3 850W',
    sku: 'TTK-GF3-850',
    manufacturerId: 'ttke0001', // Thermaltake
    categoryId: 'cat00006',
    description: '850W 80 Plus Gold fully modular ATX 3.0 native PSU.',
    msrp: 129.99,
    quantity: 32,
  },

  // More Cases (cat00007)
  {
    id: 'prod0052',
    name: 'Meshify 2 Compact',
    sku: 'FD-M2C',
    manufacturerId: 'frac0001', // Fractal Design
    categoryId: 'cat00007',
    description: 'Compact mid-tower with angular mesh front for maximum airflow.',
    msrp: 109.99,
    quantity: 20,
  },
  {
    id: 'prod0053',
    name: 'Lancool 216',
    sku: 'LL-LC216',
    manufacturerId: 'lian0001', // Lian Li
    categoryId: 'cat00007',
    description: 'Mid-tower ATX case with dual 160mm fans and high airflow.',
    msrp: 104.99,
    quantity: 18,
  },
  {
    id: 'prod0054',
    name: 'H7 Flow',
    sku: 'NZ-H7F',
    manufacturerId: 'nzxt0001', // NZXT
    categoryId: 'cat00007',
    description: 'Mid-tower ATX case with perforated mesh panels and clean aesthetic.',
    msrp: 149.99,
    quantity: 15,
  },

  // Air Cooling (cat00104 — sub of Cooling)
  {
    id: 'prod0055',
    name: 'Dark Rock Pro 5',
    sku: 'BEQ-DRP5',
    manufacturerId: '9f0a1b2c', // be quiet!
    categoryId: 'cat00104',
    description: 'Dual-tower air cooler with two Silent Wings fans, 250W TDP.',
    msrp: 89.99,
    quantity: 25,
  },
  {
    id: 'prod0056',
    name: 'AK620',
    sku: 'DPC-AK620',
    manufacturerId: 'depc0001', // DeepCool
    categoryId: 'cat00104',
    description: 'Dual-tower air cooler with two 120mm fans, 260W TDP.',
    msrp: 59.99,
    quantity: 45,
  },
  {
    id: 'prod0057',
    name: 'NH-U12S Redux',
    sku: 'NOC-NHU12SR',
    manufacturerId: '5b6c7d8e', // Noctua
    categoryId: 'cat00104',
    description: 'Single-tower 120mm air cooler, slim and compatible with RAM.',
    msrp: 49.99,
    quantity: 50,
  },

  // AIO Liquid Cooling (cat00105 — sub of Cooling)
  {
    id: 'prod0058',
    name: 'Kraken 240',
    sku: 'NZ-KR240',
    manufacturerId: 'nzxt0001', // NZXT
    categoryId: 'cat00105',
    description: '240mm AIO with LCD display head and two 120mm fans.',
    msrp: 149.99,
    quantity: 22,
  },
  {
    id: 'prod0059',
    name: 'Galahad II 360',
    sku: 'LL-GA2-360',
    manufacturerId: 'lian0001', // Lian Li
    categoryId: 'cat00105',
    description: '360mm AIO with addressable RGB fans and wide socket support.',
    msrp: 169.99,
    quantity: 18,
  },
  {
    id: 'prod0060',
    name: 'LC240 Mesh',
    sku: 'DPC-LC240M',
    manufacturerId: 'depc0001', // DeepCool
    categoryId: 'cat00105',
    description: '240mm AIO with anti-leak pump and addressable RGB.',
    msrp: 79.99,
    quantity: 30,
  },

  // Workstation GPUs (cat00106 — sub of GPU)
  {
    id: 'prod0061',
    name: 'RTX A4000 16GB',
    sku: 'NV-RTXA4000',
    manufacturerId: '728ed52f', // NVIDIA
    categoryId: 'cat00106',
    description: 'Professional GPU with 16GB ECC GDDR6, quad DisplayPort, single-slot.',
    msrp: 1099.99,
    quantity: 8,
  },
  {
    id: 'prod0062',
    name: 'Radeon Pro W7800 32GB',
    sku: 'AMD-PRW7800',
    manufacturerId: '489e1d42', // AMD
    categoryId: 'cat00106',
    description: 'Workstation GPU with 32GB GDDR6 ECC and four DisplayPort 2.1 outputs.',
    msrp: 2499.99,
    quantity: 5,
  },
];
