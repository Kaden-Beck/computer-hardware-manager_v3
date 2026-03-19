export type Case = {
  id: string;
  productId: string; // 1:1 reference to Product
  formFactor: string;
  moboSupport: string;   // e.g. "ATX, mATX, ITX"
  maxGPULengthMM?: number;
  maxCPUCoolerHeightMM?: number;
  maxPSULengthMM?: number;
  driveSlotsTwoHalf?: number;
  driveSlotsThreeHalf?: number;
  fanSlots?: number;
  radiatorSupport?: string;
};
