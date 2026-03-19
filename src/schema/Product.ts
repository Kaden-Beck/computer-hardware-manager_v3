export type Product = {
  id: string;
  name: string;
  sku: string;
  description: string;
  color?: string;
  msrp: number;
  price?: number;
  quantity: number;
  manufacturerId: string; // references Manufacturer
  categoryId: string;     // references Category
};
