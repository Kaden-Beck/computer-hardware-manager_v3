export type CpuCooler = {
  id: string;
  productId: string; // 1:1 reference to Product
  coolerType: 'Air' | 'AIO' | 'Custom Loop';
  radiatorSizeMM?: number;
  fanSizeMM: number;
  maxTDP: number;
  socketCompatibility: string;
  heightMM: number;
};
