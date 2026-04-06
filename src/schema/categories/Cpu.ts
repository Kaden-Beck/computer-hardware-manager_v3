export type Cpu = {
  type: 'cpu';
  cores: number;
  threads: number;
  baseClockGHz: number;
  boostClockGHz: number | null;
  tdp: number;
  socketType: string;
  integratedGraphics: boolean;
  cacheMB: number | null;
};
