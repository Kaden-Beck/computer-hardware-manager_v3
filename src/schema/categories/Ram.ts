export type Ram = {
  type: 'ram';
  memoryType: string;
  speedMHz: number;
  capacityGB: number;
  modules: number;
  casLatency: number | null;
  voltage: number | null;
};
