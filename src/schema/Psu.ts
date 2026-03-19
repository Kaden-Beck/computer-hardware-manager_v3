export type Psu = {
  id: string;
  productId: string; // 1:1 reference to Product
  wattage: number;
  efficiencyRating: string; // e.g. "80 Plus Gold"
  modular: 'Full' | 'Semi' | 'Non-Modular';
  formFactor: string;
};
