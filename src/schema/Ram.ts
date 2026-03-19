export type Ram = {
  id: string;
  productId: string; // 1:1 reference to Product
  memoryType: string; // e.g. "DDR5"
  speedMHz: number;
  capacityGB: number;
  modules: number;
  casLatency?: number;
  voltage?: number;
};
