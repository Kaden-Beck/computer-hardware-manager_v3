export type CpuCooler = {
  type: 'cpuCooler';
  coolerType: 'Air' | 'AIO' | 'Custom Loop';
  fanSizeMM: number;
  maxTDP: number;
  socketCompatibility: string;
  heightMM: number;
  radiatorSizeMM: number | null;
};
