export type Storage = {
  id: string;
  productId: string; // 1:1 reference to Product
  storageType: 'SSD' | 'HDD' | 'NVMe';
  capacityGB: number;
  interface: string;
  formFactor: string;
  readSpeedMBps?: number;
  writeSpeedMBps?: number;
};
