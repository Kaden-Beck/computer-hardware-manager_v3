export type Motherboard = {
  type: 'motherboard';
  socketType: string;
  chipset: string;
  formFactor: string;
  memoryType: string;
  memorySlots: number;
  maxMemoryGB: number;
  m2Slots: number | null;
  sataSlots: number | null;
  pciSlots: number | null;
};
