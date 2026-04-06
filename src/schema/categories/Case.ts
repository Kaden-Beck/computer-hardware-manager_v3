export type Case = {
  type: 'case';
  formFactor: string;
  moboSupport: string;
  maxGPULengthMM: number | null;
  maxCPUCoolerHeightMM: number | null;
  maxPSULengthMM: number | null;
  driveSlotsTwoHalf: number | null;
  driveSlotsThreeHalf: number | null;
  fanSlots: number | null;
  radiatorSupport: string;
};
