export type Cpu = {
  id: string;
  productId: string; // 1:1 reference to Product
  cores: number;
  threads: number;
  baseClockGHz: number;
  boostClockGHz?: number;
  tdp: number;
  socketType: string;
  integratedGraphics: boolean;
  cacheMB?: number;
};
