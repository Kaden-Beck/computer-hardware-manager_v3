export type Storage = {
  type: 'storage';
  storageType: 'SSD' | 'HDD' | 'NVMe';
  capacityGB: number;
  interface: string;
  formFactor: string;
  readSpeedMBps: number | null;
  writeSpeedMBps: number | null;
};
