export type Psu = {
  type: 'psu';
  wattage: number;
  efficiencyRating: string;
  modular: 'Full' | 'Semi' | 'Non-Modular';
  formFactor: string;
};
