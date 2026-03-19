export type Motherboard = {
  id: string;
  productId: string; // 1:1 reference to Product
  socketType: string;
  chipset: string;
  formFactor: string;
  memoryType: string;
  memorySlots: number;
  maxMemoryGB: number;
  m2Slots?: number;
  sataSlots?: number;
  pciSlots?: number;
};
