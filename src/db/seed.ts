import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Category } from '@/schema/Category';
import type { Manufacturer } from '@/schema/Manufacturer';
import type { Product } from '@/schema/Product';
import type { AppUser } from '@/schema/AppUser';

// Categories keep fixed IDs — productFormMap.ts references them by these exact values
const categories: Category[] = [
  { id: 'cat00001', name: 'GPU', description: 'Graphics processing units for rendering and compute workloads.', isParent: true },
  { id: 'cat00002', name: 'CPU', description: 'Central processing units, the primary compute component of a system.', isParent: true },
  { id: 'cat00003', name: 'Motherboard', description: 'Main circuit boards that connect all components in a system.', isParent: true },
  { id: 'cat00004', name: 'RAM', description: 'Random access memory modules for system memory.', isParent: true },
  { id: 'cat00005', name: 'Storage', description: 'HDDs, SSDs, and NVMe drives for data storage.', isParent: true },
  { id: 'cat00006', name: 'PSU', description: 'Power supply units that provide regulated power to system components.', isParent: true },
  { id: 'cat00007', name: 'Case', description: 'PC chassis and enclosures that house system components.', isParent: true },
  { id: 'cat00008', name: 'Cooling', description: 'CPU coolers, case fans, and liquid cooling solutions.', isParent: true },
  { id: 'cat00101', name: 'NVMe SSD', description: 'PCIe NVMe solid-state drives for high-speed storage.', isParent: false, parentId: 'cat00005' },
  { id: 'cat00102', name: 'SATA SSD', description: 'SATA-interface solid-state drives for general-purpose storage.', isParent: false, parentId: 'cat00005' },
  { id: 'cat00103', name: 'HDD', description: 'Mechanical hard disk drives for high-capacity mass storage.', isParent: false, parentId: 'cat00005' },
  { id: 'cat00104', name: 'Air Cooling', description: 'Heatsink and fan CPU coolers for air-based thermal management.', isParent: false, parentId: 'cat00008' },
  { id: 'cat00105', name: 'AIO Liquid Cooling', description: 'All-in-one closed-loop liquid coolers for CPUs.', isParent: false, parentId: 'cat00008' },
  { id: 'cat00106', name: 'Workstation GPU', description: 'Professional-grade GPUs for CAD, rendering, and ML workloads.', isParent: false, parentId: 'cat00001' },
];

// Manufacturers use a seedKey (used to map product references) — Firestore generates the real ID
type ManufacturerSeed = Omit<Manufacturer, 'id'> & { seedKey: string };

const manufacturers: ManufacturerSeed[] = [
  { seedKey: 'nvidia',    name: 'NVIDIA',          description: 'Produces GPUs, graphics cards, and AI computing hardware.' },
  { seedKey: 'amd',       name: 'AMD',              description: 'Produces CPUs, GPUs, and APUs for consumer and enterprise markets.' },
  { seedKey: 'intel',     name: 'Intel',            description: 'Produces CPUs, motherboard chipsets, and integrated graphics.' },
  { seedKey: 'asus',      name: 'ASUS',             description: 'Produces motherboards, GPUs, laptops, and peripherals.' },
  { seedKey: 'msi',       name: 'MSI',              description: 'Produces motherboards, GPUs, laptops, and gaming peripherals.' },
  { seedKey: 'gigabyte',  name: 'Gigabyte',         description: 'Produces motherboards, GPUs, and PC components.' },
  { seedKey: 'corsair',   name: 'Corsair',          description: 'Produces RAM, PSUs, cases, cooling, and gaming peripherals.' },
  { seedKey: 'samsung',   name: 'Samsung',          description: 'Produces SSDs, RAM, displays, and consumer electronics.' },
  { seedKey: 'wd',        name: 'Western Digital',  description: 'Produces HDDs, SSDs, and storage solutions.' },
  { seedKey: 'seagate',   name: 'Seagate',          description: 'Produces HDDs, SSDs, and external storage drives.' },
  { seedKey: 'kingston',  name: 'Kingston',         description: 'Produces RAM, SSDs, and flash memory products.' },
  { seedKey: 'evga',      name: 'EVGA',             description: 'Produces GPUs, PSUs, and motherboards for enthusiast builds.' },
  { seedKey: 'cm',        name: 'Cooler Master',    description: 'Produces PC cases, CPU coolers, PSUs, and peripherals.' },
  { seedKey: 'noctua',    name: 'Noctua',           description: 'Produces premium CPU coolers and case fans.' },
  { seedKey: 'bequiet',   name: 'be quiet!',        description: 'Produces silent PC cases, PSUs, and cooling solutions.' },
  { seedKey: 'nzxt',      name: 'NZXT',             description: 'Produces PC cases, AIO coolers, and smart home accessories.' },
  { seedKey: 'fractal',   name: 'Fractal Design',   description: 'Produces PC cases and cooling solutions with a minimalist aesthetic.' },
  { seedKey: 'lianli',    name: 'Lian Li',          description: 'Produces aluminum PC cases and AIO liquid coolers.' },
  { seedKey: 'crucial',   name: 'Crucial',          description: 'Produces RAM and SSDs; a Micron Technology brand.' },
  { seedKey: 'gskill',    name: 'G.Skill',          description: 'Produces high-performance RAM kits for enthusiast and gaming builds.' },
  { seedKey: 'seasonic',  name: 'Seasonic',         description: 'Produces high-efficiency PSUs renowned for build quality and reliability.' },
  { seedKey: 'tt',        name: 'Thermaltake',      description: 'Produces PC cases, PSUs, cooling, and gaming peripherals.' },
  { seedKey: 'deepcool',  name: 'DeepCool',         description: 'Produces CPU air coolers, AIO coolers, and PC cases.' },
  { seedKey: 'asrock',    name: 'ASRock',           description: 'Produces motherboards, mini PCs, and graphics cards.' },
  { seedKey: 'skhynix',   name: 'SK Hynix',         description: 'Produces NAND flash, DRAM, and NVMe SSDs.' },
];

// Products reference manufacturer seedKeys — resolved to Firestore IDs at seed time
type ProductSeed = Omit<Product, 'id' | 'manufacturerId'> & { mfrKey: string };

const products: ProductSeed[] = [
  // ── GPUs (cat00001) ──────────────────────────────────────────────────────────
  {
    name: 'GeForce RTX 4090', sku: 'NV-RTX4090', mfrKey: 'nvidia', categoryId: 'cat00001',
    description: 'Flagship consumer GPU with 24GB GDDR6X memory.', msrp: 1599.99, quantity: 15,
    specs: { type: 'gpu', chipset: 'AD102', vramGB: 24, vramType: 'GDDR6X', tdp: 450, coreCount: 16384, baseClockMHz: 2235, boostClockMHz: 2520, lengthMM: 336, powerConnectors: '1x 16-pin' },
  },
  {
    name: 'GeForce RTX 4080 Super', sku: 'NV-RTX4080S', mfrKey: 'nvidia', categoryId: 'cat00001',
    description: 'High-end consumer GPU with 16GB GDDR6X memory.', msrp: 999.99, quantity: 22,
    specs: { type: 'gpu', chipset: 'AD103', vramGB: 16, vramType: 'GDDR6X', tdp: 320, coreCount: 10240, baseClockMHz: 2295, boostClockMHz: 2550, lengthMM: 310, powerConnectors: '1x 16-pin' },
  },
  {
    name: 'GeForce RTX 4070 Ti Super', sku: 'NV-RTX4070TIS', mfrKey: 'nvidia', categoryId: 'cat00001',
    description: 'High-end consumer GPU with 16GB GDDR6X memory.', msrp: 799.99, quantity: 30,
    specs: { type: 'gpu', chipset: 'AD103', vramGB: 16, vramType: 'GDDR6X', tdp: 285, coreCount: 8448, baseClockMHz: 2340, boostClockMHz: 2610, lengthMM: 285, powerConnectors: '1x 16-pin' },
  },
  {
    name: 'GeForce RTX 4060 Ti', sku: 'NV-RTX4060TI', mfrKey: 'nvidia', categoryId: 'cat00001',
    description: 'Mid-range GPU with 16GB GDDR6 and DLSS 3 support.', msrp: 499.99, quantity: 38,
    specs: { type: 'gpu', chipset: 'AD106', vramGB: 16, vramType: 'GDDR6', tdp: 165, coreCount: 4352, baseClockMHz: 2310, boostClockMHz: 2535, lengthMM: 240, powerConnectors: '1x 16-pin' },
  },
  {
    name: 'Radeon RX 7900 XTX', sku: 'AMD-RX7900XTX', mfrKey: 'amd', categoryId: 'cat00001',
    description: 'Flagship AMD GPU with 24GB GDDR6 memory.', msrp: 999.99, quantity: 20,
    specs: { type: 'gpu', chipset: 'Navi 31', vramGB: 24, vramType: 'GDDR6', tdp: 355, coreCount: 6144, baseClockMHz: 1855, boostClockMHz: 2499, lengthMM: 287, powerConnectors: '2x 8-pin' },
  },
  {
    name: 'Radeon RX 7800 XT', sku: 'AMD-RX7800XT', mfrKey: 'amd', categoryId: 'cat00001',
    description: 'Mid-range AMD GPU with 16GB GDDR6 memory.', msrp: 499.99, quantity: 45,
    specs: { type: 'gpu', chipset: 'Navi 32', vramGB: 16, vramType: 'GDDR6', tdp: 263, coreCount: 3840, baseClockMHz: 1624, boostClockMHz: 2430, lengthMM: 267, powerConnectors: '2x 8-pin' },
  },
  {
    name: 'Radeon RX 7600', sku: 'AMD-RX7600', mfrKey: 'amd', categoryId: 'cat00001',
    description: 'Entry-level GPU with 8GB GDDR6 memory and AV1 encode.', msrp: 269.99, quantity: 65,
    specs: { type: 'gpu', chipset: 'Navi 33', vramGB: 8, vramType: 'GDDR6', tdp: 165, coreCount: 2048, baseClockMHz: 1720, boostClockMHz: 2655, lengthMM: 204, powerConnectors: '1x 8-pin' },
  },

  // ── CPUs (cat00002) ──────────────────────────────────────────────────────────
  {
    name: 'Core i9-14900K', sku: 'INT-I9-14900K', mfrKey: 'intel', categoryId: 'cat00002',
    description: '24-core (8P+16E) flagship desktop CPU with 6.0GHz max turbo.', msrp: 549.99, quantity: 25,
    specs: { type: 'cpu', cores: 24, threads: 32, baseClockGHz: 3.2, boostClockGHz: 6.0, tdp: 125, socketType: 'LGA1700', integratedGraphics: true, cacheMB: 36 },
  },
  {
    name: 'Core i7-14700K', sku: 'INT-I7-14700K', mfrKey: 'intel', categoryId: 'cat00002',
    description: '20-core (8P+12E) desktop CPU with 5.6GHz max turbo.', msrp: 409.99, quantity: 35,
    specs: { type: 'cpu', cores: 20, threads: 28, baseClockGHz: 3.4, boostClockGHz: 5.6, tdp: 125, socketType: 'LGA1700', integratedGraphics: true, cacheMB: 33 },
  },
  {
    name: 'Core i5-14600K', sku: 'INT-I5-14600K', mfrKey: 'intel', categoryId: 'cat00002',
    description: '14-core (6P+8E) mid-range desktop CPU.', msrp: 299.99, quantity: 50,
    specs: { type: 'cpu', cores: 14, threads: 20, baseClockGHz: 3.5, boostClockGHz: 5.3, tdp: 125, socketType: 'LGA1700', integratedGraphics: true, cacheMB: 24 },
  },
  {
    name: 'Core i3-14100', sku: 'INT-I3-14100', mfrKey: 'intel', categoryId: 'cat00002',
    description: '4-core 8-thread budget desktop CPU with 4.7GHz max turbo.', msrp: 134.99, quantity: 90,
    specs: { type: 'cpu', cores: 4, threads: 8, baseClockGHz: 3.5, boostClockGHz: 4.7, tdp: 60, socketType: 'LGA1700', integratedGraphics: true, cacheMB: 12 },
  },
  {
    name: 'Ryzen 9 9950X', sku: 'AMD-R9-9950X', mfrKey: 'amd', categoryId: 'cat00002',
    description: '16-core 32-thread Zen 5 desktop CPU on AM5 with 5.7GHz boost.', msrp: 649.99, quantity: 14,
    specs: { type: 'cpu', cores: 16, threads: 32, baseClockGHz: 4.3, boostClockGHz: 5.7, tdp: 170, socketType: 'AM5', integratedGraphics: false, cacheMB: 64 },
  },
  {
    name: 'Ryzen 9 7950X', sku: 'AMD-R9-7950X', mfrKey: 'amd', categoryId: 'cat00002',
    description: '16-core 32-thread flagship desktop CPU on the AM5 platform.', msrp: 699.99, quantity: 18,
    specs: { type: 'cpu', cores: 16, threads: 32, baseClockGHz: 4.5, boostClockGHz: 5.7, tdp: 170, socketType: 'AM5', integratedGraphics: false, cacheMB: 64 },
  },
  {
    name: 'Ryzen 7 7700X', sku: 'AMD-R7-7700X', mfrKey: 'amd', categoryId: 'cat00002',
    description: '8-core 16-thread desktop CPU on AM5 with 5.4GHz boost.', msrp: 349.99, quantity: 42,
    specs: { type: 'cpu', cores: 8, threads: 16, baseClockGHz: 4.5, boostClockGHz: 5.4, tdp: 105, socketType: 'AM5', integratedGraphics: false, cacheMB: 32 },
  },
  {
    name: 'Ryzen 5 7600X', sku: 'AMD-R5-7600X', mfrKey: 'amd', categoryId: 'cat00002',
    description: '6-core 12-thread mid-range desktop CPU on the AM5 platform.', msrp: 249.99, quantity: 60,
    specs: { type: 'cpu', cores: 6, threads: 12, baseClockGHz: 4.7, boostClockGHz: 5.3, tdp: 105, socketType: 'AM5', integratedGraphics: false, cacheMB: 32 },
  },
  {
    name: 'Ryzen 5 5600', sku: 'AMD-R5-5600', mfrKey: 'amd', categoryId: 'cat00002',
    description: '6-core 12-thread AM4 desktop CPU, excellent price-to-performance.', msrp: 129.99, quantity: 85,
    specs: { type: 'cpu', cores: 6, threads: 12, baseClockGHz: 3.5, boostClockGHz: 4.4, tdp: 65, socketType: 'AM4', integratedGraphics: false, cacheMB: 32 },
  },

  // ── Motherboards (cat00003) ───────────────────────────────────────────────────
  {
    name: 'ROG Maximus Z790 Apex', sku: 'ASU-ROG-Z790A', mfrKey: 'asus', categoryId: 'cat00003',
    description: 'High-end Z790 ATX motherboard for Intel LGA1700.', msrp: 699.99, quantity: 12,
    specs: { type: 'motherboard', socketType: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 2, maxMemoryGB: 96, m2Slots: 5, sataSlots: 6, pciSlots: 3 },
  },
  {
    name: 'Z790 Aorus Elite AX', sku: 'GIG-Z790AORAX', mfrKey: 'gigabyte', categoryId: 'cat00003',
    description: 'ATX Z790 board for Intel LGA1700 with DDR5 and WiFi 6E.', msrp: 269.99, quantity: 16,
    specs: { type: 'motherboard', socketType: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, maxMemoryGB: 128, m2Slots: 4, sataSlots: 6, pciSlots: 3 },
  },
  {
    name: 'MAG B760M Mortar WiFi', sku: 'MSI-B760MMORTARW', mfrKey: 'msi', categoryId: 'cat00003',
    description: 'mATX B760 board for Intel LGA1700 with WiFi 6E.', msrp: 179.99, quantity: 30,
    specs: { type: 'motherboard', socketType: 'LGA1700', chipset: 'B760', formFactor: 'mATX', memoryType: 'DDR5', memorySlots: 4, maxMemoryGB: 128, m2Slots: 2, sataSlots: 4, pciSlots: 2 },
  },
  {
    name: 'MEG X670E ACE', sku: 'MSI-MEGX670ACE', mfrKey: 'msi', categoryId: 'cat00003',
    description: 'Flagship X670E ATX motherboard for AMD AM5.', msrp: 649.99, quantity: 10,
    specs: { type: 'motherboard', socketType: 'AM5', chipset: 'X670E', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, maxMemoryGB: 128, m2Slots: 4, sataSlots: 6, pciSlots: 3 },
  },
  {
    name: 'Aorus Master X670E', sku: 'GIG-AORX670M', mfrKey: 'gigabyte', categoryId: 'cat00003',
    description: 'Premium X670E ATX motherboard for AMD AM5.', msrp: 499.99, quantity: 14,
    specs: { type: 'motherboard', socketType: 'AM5', chipset: 'X670E', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, maxMemoryGB: 128, m2Slots: 4, sataSlots: 4, pciSlots: 3 },
  },
  {
    name: 'ROG Strix B650-E Gaming WiFi', sku: 'ASU-B650ESTRIX', mfrKey: 'asus', categoryId: 'cat00003',
    description: 'Mid-range B650E ATX board for AMD AM5 with WiFi 6E.', msrp: 299.99, quantity: 20,
    specs: { type: 'motherboard', socketType: 'AM5', chipset: 'B650E', formFactor: 'ATX', memoryType: 'DDR5', memorySlots: 4, maxMemoryGB: 128, m2Slots: 4, sataSlots: 4, pciSlots: 2 },
  },
  {
    name: 'B650M Steel Legend WiFi', sku: 'ASR-B650MSLW', mfrKey: 'asrock', categoryId: 'cat00003',
    description: 'mATX B650 board for AMD AM5 with WiFi 6E and 2.5G LAN.', msrp: 159.99, quantity: 25,
    specs: { type: 'motherboard', socketType: 'AM5', chipset: 'B650', formFactor: 'mATX', memoryType: 'DDR5', memorySlots: 4, maxMemoryGB: 128, m2Slots: 2, sataSlots: 4, pciSlots: 2 },
  },

  // ── RAM (cat00004) ────────────────────────────────────────────────────────────
  {
    name: 'Vengeance DDR5-6000 32GB', sku: 'COR-VEN-DDR5-6K', mfrKey: 'corsair', categoryId: 'cat00004',
    description: 'DDR5-6000 CL36 dual-channel kit (2x16GB).', msrp: 139.99, quantity: 75,
    specs: { type: 'ram', memoryType: 'DDR5', speedMHz: 6000, capacityGB: 32, modules: 2, casLatency: 36, voltage: 1.35 },
  },
  {
    name: '990 Pro DDR5-6400 32GB', sku: 'SAM-990P-DDR5-64', mfrKey: 'samsung', categoryId: 'cat00004',
    description: 'DDR5-6400 CL32 high-performance dual-channel kit (2x16GB).', msrp: 159.99, quantity: 40,
    specs: { type: 'ram', memoryType: 'DDR5', speedMHz: 6400, capacityGB: 32, modules: 2, casLatency: 32, voltage: 1.4 },
  },
  {
    name: 'Fury Beast DDR5-5200 32GB', sku: 'KIN-FB-DDR5-52', mfrKey: 'kingston', categoryId: 'cat00004',
    description: 'DDR5-5200 CL40 value dual-channel kit (2x16GB).', msrp: 109.99, quantity: 90,
    specs: { type: 'ram', memoryType: 'DDR5', speedMHz: 5200, capacityGB: 32, modules: 2, casLatency: 40, voltage: 1.25 },
  },
  {
    name: 'Trident Z5 RGB DDR5-6400 32GB', sku: 'GSK-TZ5RGB-DDR5-64', mfrKey: 'gskill', categoryId: 'cat00004',
    description: 'DDR5-6400 CL32 enthusiast RGB kit (2x16GB).', msrp: 189.99, quantity: 35,
    specs: { type: 'ram', memoryType: 'DDR5', speedMHz: 6400, capacityGB: 32, modules: 2, casLatency: 32, voltage: 1.4 },
  },
  {
    name: 'Pro DDR5-4800 32GB', sku: 'CRU-PRO-DDR5-48', mfrKey: 'crucial', categoryId: 'cat00004',
    description: 'DDR5-4800 CL40 value kit (2x16GB), great for budget AM5/Z790 builds.', msrp: 89.99, quantity: 100,
    specs: { type: 'ram', memoryType: 'DDR5', speedMHz: 4800, capacityGB: 32, modules: 2, casLatency: 40, voltage: 1.1 },
  },
  {
    name: 'Ripjaws V DDR4-3600 16GB', sku: 'GSK-RJV-DDR4-36', mfrKey: 'gskill', categoryId: 'cat00004',
    description: 'DDR4-3600 CL16 dual-channel kit (2x8GB), popular for AM4/Z490 builds.', msrp: 49.99, quantity: 120,
    specs: { type: 'ram', memoryType: 'DDR4', speedMHz: 3600, capacityGB: 16, modules: 2, casLatency: 16, voltage: 1.35 },
  },

  // ── Storage — General (cat00005) ─────────────────────────────────────────────
  {
    name: '990 Pro 2TB NVMe SSD', sku: 'SAM-990P-2TB', mfrKey: 'samsung', categoryId: 'cat00005',
    description: 'PCIe 4.0 NVMe SSD with up to 7450MB/s read speed.', msrp: 169.99, quantity: 55,
    specs: { type: 'storage', storageType: 'NVMe', capacityGB: 2000, interface: 'PCIe 4.0 x4', formFactor: 'M.2 2280', readSpeedMBps: 7450, writeSpeedMBps: 6900 },
  },
  {
    name: 'WD Black SN850X 2TB', sku: 'WD-SN850X-2TB', mfrKey: 'wd', categoryId: 'cat00005',
    description: 'PCIe 4.0 NVMe SSD with up to 7300MB/s read speed.', msrp: 149.99, quantity: 48,
    specs: { type: 'storage', storageType: 'NVMe', capacityGB: 2000, interface: 'PCIe 4.0 x4', formFactor: 'M.2 2280', readSpeedMBps: 7300, writeSpeedMBps: 6600 },
  },
  {
    name: 'BarraCuda 4TB HDD', sku: 'SEA-BRC-4TB', mfrKey: 'seagate', categoryId: 'cat00005',
    description: '3.5" 5400RPM SATA HDD for mass storage.', msrp: 79.99, quantity: 100,
    specs: { type: 'storage', storageType: 'HDD', capacityGB: 4000, interface: 'SATA 6Gb/s', formFactor: '3.5"', readSpeedMBps: 190, writeSpeedMBps: null },
  },

  // ── NVMe SSDs (cat00101) ──────────────────────────────────────────────────────
  {
    name: 'Crucial T700 2TB NVMe', sku: 'CRU-T700-2TB', mfrKey: 'crucial', categoryId: 'cat00101',
    description: 'PCIe 5.0 NVMe SSD with up to 12,400MB/s sequential read.', msrp: 219.99, quantity: 30,
    specs: { type: 'storage', storageType: 'NVMe', capacityGB: 2000, interface: 'PCIe 5.0 x4', formFactor: 'M.2 2280', readSpeedMBps: 12400, writeSpeedMBps: 11800 },
  },
  {
    name: 'Platinum P41 2TB NVMe', sku: 'SKH-P41-2TB', mfrKey: 'skhynix', categoryId: 'cat00101',
    description: 'PCIe 4.0 NVMe SSD with up to 7,000MB/s read, excellent efficiency.', msrp: 149.99, quantity: 40,
    specs: { type: 'storage', storageType: 'NVMe', capacityGB: 2000, interface: 'PCIe 4.0 x4', formFactor: 'M.2 2280', readSpeedMBps: 7000, writeSpeedMBps: 6500 },
  },
  {
    name: 'FireCuda 530 1TB NVMe', sku: 'SEA-FC530-1TB', mfrKey: 'seagate', categoryId: 'cat00101',
    description: 'PCIe 4.0 NVMe SSD with up to 7,300MB/s read, heatsink model available.', msrp: 109.99, quantity: 45,
    specs: { type: 'storage', storageType: 'NVMe', capacityGB: 1000, interface: 'PCIe 4.0 x4', formFactor: 'M.2 2280', readSpeedMBps: 7300, writeSpeedMBps: 6900 },
  },
  {
    name: 'WD Blue SN580 1TB NVMe', sku: 'WD-SN580-1TB', mfrKey: 'wd', categoryId: 'cat00101',
    description: 'PCIe 4.0 NVMe SSD for mainstream builds with up to 4,150MB/s read.', msrp: 79.99, quantity: 70,
    specs: { type: 'storage', storageType: 'NVMe', capacityGB: 1000, interface: 'PCIe 4.0 x4', formFactor: 'M.2 2280', readSpeedMBps: 4150, writeSpeedMBps: 4150 },
  },

  // ── SATA SSDs (cat00102) ──────────────────────────────────────────────────────
  {
    name: '870 EVO 1TB SATA SSD', sku: 'SAM-870EVO-1TB', mfrKey: 'samsung', categoryId: 'cat00102',
    description: '2.5" SATA SSD with up to 560MB/s read, ideal for laptop upgrades.', msrp: 89.99, quantity: 80,
    specs: { type: 'storage', storageType: 'SSD', capacityGB: 1000, interface: 'SATA 6Gb/s', formFactor: '2.5"', readSpeedMBps: 560, writeSpeedMBps: 530 },
  },
  {
    name: 'MX500 1TB SATA SSD', sku: 'CRU-MX500-1TB', mfrKey: 'crucial', categoryId: 'cat00102',
    description: '2.5" SATA SSD with hardware AES encryption and 560MB/s read.', msrp: 74.99, quantity: 95,
    specs: { type: 'storage', storageType: 'SSD', capacityGB: 1000, interface: 'SATA 6Gb/s', formFactor: '2.5"', readSpeedMBps: 560, writeSpeedMBps: 510 },
  },
  {
    name: 'Barracuda Q1 960GB SATA SSD', sku: 'SEA-BRCQ1-960', mfrKey: 'seagate', categoryId: 'cat00102',
    description: '2.5" SATA SSD, budget-friendly option at 550MB/s read.', msrp: 59.99, quantity: 60,
    specs: { type: 'storage', storageType: 'SSD', capacityGB: 960, interface: 'SATA 6Gb/s', formFactor: '2.5"', readSpeedMBps: 550, writeSpeedMBps: 510 },
  },

  // ── HDDs (cat00103) ───────────────────────────────────────────────────────────
  {
    name: 'WD Blue 6TB HDD', sku: 'WD-BLUE-6TB', mfrKey: 'wd', categoryId: 'cat00103',
    description: '3.5" 5400RPM SATA HDD for desktop mass storage.', msrp: 109.99, quantity: 55,
    specs: { type: 'storage', storageType: 'HDD', capacityGB: 6000, interface: 'SATA 6Gb/s', formFactor: '3.5"', readSpeedMBps: 180, writeSpeedMBps: null },
  },
  {
    name: 'IronWolf 4TB NAS HDD', sku: 'SEA-IW-4TB', mfrKey: 'seagate', categoryId: 'cat00103',
    description: '3.5" 5400RPM NAS-optimised HDD rated for 24/7 operation.', msrp: 94.99, quantity: 40,
    specs: { type: 'storage', storageType: 'HDD', capacityGB: 4000, interface: 'SATA 6Gb/s', formFactor: '3.5"', readSpeedMBps: 190, writeSpeedMBps: null },
  },

  // ── PSUs (cat00006) ───────────────────────────────────────────────────────────
  {
    name: 'RM1000x 1000W', sku: 'COR-RM1000X', mfrKey: 'corsair', categoryId: 'cat00006',
    description: '1000W 80 Plus Gold fully modular ATX PSU.', msrp: 199.99, quantity: 30,
    specs: { type: 'psu', wattage: 1000, efficiencyRating: '80 Plus Gold', modular: 'Full', formFactor: 'ATX' },
  },
  {
    name: 'SuperNOVA 850 G6 850W', sku: 'EVG-SN850G6', mfrKey: 'evga', categoryId: 'cat00006',
    description: '850W 80 Plus Gold fully modular ATX PSU.', msrp: 149.99, quantity: 35,
    specs: { type: 'psu', wattage: 850, efficiencyRating: '80 Plus Gold', modular: 'Full', formFactor: 'ATX' },
  },
  {
    name: 'Pure Power 12M 750W', sku: 'BEQ-PP12M-750', mfrKey: 'bequiet', categoryId: 'cat00006',
    description: '750W 80 Plus Gold fully modular ATX PSU.', msrp: 129.99, quantity: 40,
    specs: { type: 'psu', wattage: 750, efficiencyRating: '80 Plus Gold', modular: 'Full', formFactor: 'ATX' },
  },
  {
    name: 'Focus GX-850 850W', sku: 'SEA-FGXA-850', mfrKey: 'seasonic', categoryId: 'cat00006',
    description: '850W 80 Plus Gold fully modular PSU with 10-year warranty.', msrp: 159.99, quantity: 28,
    specs: { type: 'psu', wattage: 850, efficiencyRating: '80 Plus Gold', modular: 'Full', formFactor: 'ATX' },
  },
  {
    name: 'Toughpower GF3 850W', sku: 'TTK-GF3-850', mfrKey: 'tt', categoryId: 'cat00006',
    description: '850W 80 Plus Gold fully modular ATX 3.0 native PSU.', msrp: 129.99, quantity: 32,
    specs: { type: 'psu', wattage: 850, efficiencyRating: '80 Plus Gold', modular: 'Full', formFactor: 'ATX' },
  },

  // ── Cases (cat00007) ──────────────────────────────────────────────────────────
  {
    name: 'H510 Flow', sku: 'CM-H510F', mfrKey: 'cm', categoryId: 'cat00007',
    description: 'Mid-tower ATX case with mesh front panel for airflow.', msrp: 89.99, quantity: 22,
    specs: { type: 'case', formFactor: 'Mid Tower', moboSupport: 'ATX, mATX, ITX', maxGPULengthMM: 381, maxCPUCoolerHeightMM: 165, maxPSULengthMM: null, driveSlotsTwoHalf: 2, driveSlotsThreeHalf: 1, fanSlots: 4, radiatorSupport: '240mm front, 120mm rear' },
  },
  {
    name: 'Silent Base 802', sku: 'BEQ-SB802', mfrKey: 'bequiet', categoryId: 'cat00007',
    description: 'Mid-tower ATX case optimized for silent operation.', msrp: 169.99, quantity: 18,
    specs: { type: 'case', formFactor: 'Mid Tower', moboSupport: 'E-ATX, ATX, mATX, ITX', maxGPULengthMM: 430, maxCPUCoolerHeightMM: 185, maxPSULengthMM: null, driveSlotsTwoHalf: 3, driveSlotsThreeHalf: 2, fanSlots: 6, radiatorSupport: '360mm front, 280mm top, 140mm rear' },
  },
  {
    name: 'Meshify 2 Compact', sku: 'FD-M2C', mfrKey: 'fractal', categoryId: 'cat00007',
    description: 'Compact mid-tower with angular mesh front for maximum airflow.', msrp: 109.99, quantity: 20,
    specs: { type: 'case', formFactor: 'Mid Tower', moboSupport: 'ATX, mATX, ITX', maxGPULengthMM: 360, maxCPUCoolerHeightMM: 169, maxPSULengthMM: null, driveSlotsTwoHalf: 2, driveSlotsThreeHalf: 2, fanSlots: 5, radiatorSupport: '240mm front, 120mm rear' },
  },
  {
    name: 'Lancool 216', sku: 'LL-LC216', mfrKey: 'lianli', categoryId: 'cat00007',
    description: 'Mid-tower ATX case with dual 160mm fans and high airflow.', msrp: 104.99, quantity: 18,
    specs: { type: 'case', formFactor: 'Mid Tower', moboSupport: 'E-ATX, ATX, mATX, ITX', maxGPULengthMM: 435, maxCPUCoolerHeightMM: 176, maxPSULengthMM: null, driveSlotsTwoHalf: 2, driveSlotsThreeHalf: 2, fanSlots: 6, radiatorSupport: '360mm front, 240mm top, 120mm rear' },
  },
  {
    name: 'H7 Flow', sku: 'NZ-H7F', mfrKey: 'nzxt', categoryId: 'cat00007',
    description: 'Mid-tower ATX case with perforated mesh panels and clean aesthetic.', msrp: 149.99, quantity: 15,
    specs: { type: 'case', formFactor: 'Mid Tower', moboSupport: 'E-ATX, ATX, mATX, ITX', maxGPULengthMM: 400, maxCPUCoolerHeightMM: 185, maxPSULengthMM: null, driveSlotsTwoHalf: 2, driveSlotsThreeHalf: 2, fanSlots: 6, radiatorSupport: '360mm front, 280mm top, 120mm rear' },
  },

  // ── Air Coolers (cat00104) ────────────────────────────────────────────────────
  {
    name: 'NH-D15 CPU Cooler', sku: 'NOC-NHD15', mfrKey: 'noctua', categoryId: 'cat00008',
    description: 'Dual-tower air cooler with two NF-A15 fans.', msrp: 99.99, quantity: 28,
    specs: { type: 'cpuCooler', coolerType: 'Air', fanSizeMM: 150, maxTDP: 250, socketCompatibility: 'LGA1700, LGA1200, AM5, AM4', heightMM: 165, radiatorSizeMM: null },
  },
  {
    name: 'Hyper 212 Black Edition', sku: 'CM-H212BE', mfrKey: 'cm', categoryId: 'cat00008',
    description: 'Single-tower air cooler with 120mm RGB fan.', msrp: 39.99, quantity: 80,
    specs: { type: 'cpuCooler', coolerType: 'Air', fanSizeMM: 120, maxTDP: 150, socketCompatibility: 'LGA1700, LGA1200, AM5, AM4', heightMM: 159, radiatorSizeMM: null },
  },
  {
    name: 'Dark Rock Pro 5', sku: 'BEQ-DRP5', mfrKey: 'bequiet', categoryId: 'cat00104',
    description: 'Dual-tower air cooler with two Silent Wings fans, 250W TDP.', msrp: 89.99, quantity: 25,
    specs: { type: 'cpuCooler', coolerType: 'Air', fanSizeMM: 135, maxTDP: 250, socketCompatibility: 'LGA1700, LGA1200, AM5, AM4', heightMM: 162, radiatorSizeMM: null },
  },
  {
    name: 'AK620', sku: 'DPC-AK620', mfrKey: 'deepcool', categoryId: 'cat00104',
    description: 'Dual-tower air cooler with two 120mm fans, 260W TDP.', msrp: 59.99, quantity: 45,
    specs: { type: 'cpuCooler', coolerType: 'Air', fanSizeMM: 120, maxTDP: 260, socketCompatibility: 'LGA1700, LGA1200, AM5, AM4', heightMM: 160, radiatorSizeMM: null },
  },
  {
    name: 'NH-U12S Redux', sku: 'NOC-NHU12SR', mfrKey: 'noctua', categoryId: 'cat00104',
    description: 'Single-tower 120mm air cooler, slim and compatible with RAM.', msrp: 49.99, quantity: 50,
    specs: { type: 'cpuCooler', coolerType: 'Air', fanSizeMM: 120, maxTDP: 155, socketCompatibility: 'LGA1700, LGA1200, AM5, AM4', heightMM: 158, radiatorSizeMM: null },
  },

  // ── AIO Coolers (cat00105) ────────────────────────────────────────────────────
  {
    name: 'H150i Elite Capellix XT', sku: 'COR-H150I-ECX', mfrKey: 'corsair', categoryId: 'cat00008',
    description: '360mm AIO liquid cooler with three 120mm fans.', msrp: 199.99, quantity: 20,
    specs: { type: 'cpuCooler', coolerType: 'AIO', fanSizeMM: 120, maxTDP: 350, socketCompatibility: 'LGA1700, LGA1200, AM5, AM4', heightMM: 27, radiatorSizeMM: 360 },
  },
  {
    name: 'Kraken 240', sku: 'NZ-KR240', mfrKey: 'nzxt', categoryId: 'cat00105',
    description: '240mm AIO with LCD display head and two 120mm fans.', msrp: 149.99, quantity: 22,
    specs: { type: 'cpuCooler', coolerType: 'AIO', fanSizeMM: 120, maxTDP: 300, socketCompatibility: 'LGA1700, LGA1200, AM5, AM4', heightMM: 30, radiatorSizeMM: 240 },
  },
  {
    name: 'Galahad II 360', sku: 'LL-GA2-360', mfrKey: 'lianli', categoryId: 'cat00105',
    description: '360mm AIO with addressable RGB fans and wide socket support.', msrp: 169.99, quantity: 18,
    specs: { type: 'cpuCooler', coolerType: 'AIO', fanSizeMM: 120, maxTDP: 350, socketCompatibility: 'LGA1700, LGA1200, AM5, AM4', heightMM: 27, radiatorSizeMM: 360 },
  },
  {
    name: 'LC240 Mesh', sku: 'DPC-LC240M', mfrKey: 'deepcool', categoryId: 'cat00105',
    description: '240mm AIO with anti-leak pump and addressable RGB.', msrp: 79.99, quantity: 30,
    specs: { type: 'cpuCooler', coolerType: 'AIO', fanSizeMM: 120, maxTDP: 280, socketCompatibility: 'LGA1700, LGA1200, AM5, AM4', heightMM: 27, radiatorSizeMM: 240 },
  },

  // ── Workstation GPUs (cat00106) ───────────────────────────────────────────────
  {
    name: 'RTX A4000 16GB', sku: 'NV-RTXA4000', mfrKey: 'nvidia', categoryId: 'cat00106',
    description: 'Professional GPU with 16GB ECC GDDR6, quad DisplayPort, single-slot.', msrp: 1099.99, quantity: 8,
    specs: { type: 'gpu', chipset: 'GA104', vramGB: 16, vramType: 'GDDR6', tdp: 140, coreCount: 6144, baseClockMHz: 735, boostClockMHz: 1560, lengthMM: 241, powerConnectors: '1x 6-pin' },
  },
  {
    name: 'Radeon Pro W7800 32GB', sku: 'AMD-PRW7800', mfrKey: 'amd', categoryId: 'cat00106',
    description: 'Workstation GPU with 32GB GDDR6 ECC and four DisplayPort 2.1 outputs.', msrp: 2499.99, quantity: 5,
    specs: { type: 'gpu', chipset: 'Navi 31', vramGB: 32, vramType: 'GDDR6', tdp: 260, coreCount: 3840, baseClockMHz: 1600, boostClockMHz: 2500, lengthMM: 267, powerConnectors: '2x 8-pin' },
  },
];

// Users keep their UUID as document ID — must match Firebase Auth UID in production
const users: AppUser[] = [
  { uuid: 'aB3kR7mXpQ2nL9wY', displayName: 'Kaden Beck',      email: 'kaden@example.com',          provider: 'google.com', lastSignIn: '2026-03-24T10:15:00Z', createdAt: '2025-11-01T08:00:00Z', revoked: false, isCurrentUser: true },
  { uuid: 'cD5jT1vZoW8eM4uN', displayName: 'Alex Rivera',     email: 'alex.rivera@example.com',    provider: 'google.com', lastSignIn: '2026-03-22T14:30:00Z', createdAt: '2025-11-15T09:00:00Z', revoked: false },
  { uuid: 'fG2hU6xSiP0bK3qI', displayName: 'Jordan Lee',      email: 'jordan.lee@example.com',     provider: 'google.com', lastSignIn: '2026-03-20T09:45:00Z', createdAt: '2025-12-03T11:00:00Z', revoked: false },
  { uuid: 'hJ8lV4yAkR1nO7sC', displayName: 'Morgan Chen',     email: 'morgan.chen@example.com',    provider: 'google.com', lastSignIn: '2026-02-14T16:00:00Z', createdAt: '2025-12-20T10:30:00Z', revoked: true },
  { uuid: 'mN0pW9zBtS5dF2eH', displayName: 'Sam Patel',       email: 'sam.patel@example.com',      provider: 'google.com', lastSignIn: '2026-03-18T11:20:00Z', createdAt: '2026-01-08T08:45:00Z', revoked: false },
  { uuid: 'qR7sX3cEuG6kL1aP', displayName: 'Taylor Nguyen',   email: 'taylor.nguyen@example.com',  provider: 'google.com', lastSignIn: '2026-01-05T13:10:00Z', createdAt: '2026-01-05T13:00:00Z', revoked: true },
];

// ── Seed helpers ─────────────────────────────────────────────────────────────────

const BATCH_SIZE = 499;

async function writeBatchedFixed<T extends { id: string }>(
  collectionName: string,
  items: T[]
): Promise<void> {
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    for (const item of items.slice(i, i + BATCH_SIZE)) {
      const { id, ...data } = item;
      batch.set(doc(db, collectionName, id), data);
    }
    await batch.commit();
  }
}

async function writeBatchedAuto<T>(
  collectionName: string,
  items: T[]
): Promise<void> {
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    for (const item of items.slice(i, i + BATCH_SIZE)) {
      batch.set(doc(collection(db, collectionName)), item);
    }
    await batch.commit();
  }
}

export async function seedDatabase(): Promise<void> {
  // 1. Categories — fixed IDs required by productFormMap
  console.log('Seeding categories...');
  await writeBatchedFixed('categories', categories);

  // 2. Manufacturers — auto-generated IDs; capture mapping for product references
  console.log('Seeding manufacturers...');
  const mfrRefs = manufacturers.map((m) => ({
    seedKey: m.seedKey,
    ref: doc(collection(db, 'manufacturers')),
    data: { name: m.name, description: m.description },
  }));

  for (let i = 0; i < mfrRefs.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    for (const { ref, data } of mfrRefs.slice(i, i + BATCH_SIZE)) {
      batch.set(ref, data);
    }
    await batch.commit();
  }

  const mfrIdMap: Record<string, string> = {};
  for (const { seedKey, ref } of mfrRefs) {
    mfrIdMap[seedKey] = ref.id;
  }

  // 3. Products — auto-generated IDs; resolve manufacturerId from mfrIdMap
  console.log('Seeding products...');
  const productDocs = products.map(({ mfrKey, ...rest }) => ({
    ...rest,
    manufacturerId: mfrIdMap[mfrKey] ?? mfrKey,
  }));
  await writeBatchedAuto('products', productDocs);

  // 4. Users — fixed UUIDs (Auth-linked)
  console.log('Seeding users...');
  await writeBatchedFixed('users', users.map(({ uuid, ...rest }) => ({ id: uuid, ...rest })));

  console.log('Seed complete.');
}
