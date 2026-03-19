export type Gpu = {
  id: string;
  productId: string; // 1:1 reference to Product
  chipset: string;
  vramGB: number;
  vramType: string;
  coreCount?: number;
  baseClockMHz?: number;
  boostClockMHz?: number;
  tdp: number;
  lengthMM?: number;
  powerConnectors?: string;
};
