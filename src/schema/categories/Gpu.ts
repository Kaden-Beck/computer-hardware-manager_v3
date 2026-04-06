export type Gpu = {
  type: 'gpu';
  chipset: string;
  vramGB: number;
  vramType: string;
  tdp: number;
  coreCount: number | null;
  baseClockMHz: number | null;
  boostClockMHz: number | null;
  lengthMM: number | null;
  powerConnectors: string;
};
