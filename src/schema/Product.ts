import type { ProductImage } from './ProductImage';
import type { Cpu } from './categories/Cpu';
import type { CpuCooler } from './categories/CpuCooler';
import type { Case } from './categories/Case';
import type { Gpu } from './categories/Gpu';
import type { Motherboard } from './categories/Motherboard';
import type { Psu } from './categories/Psu';
import type { Ram } from './categories/Ram';
import type { Storage } from './categories/Storage';

export type ProductSpecs =
  | Gpu
  | Cpu
  | Ram
  | Motherboard
  | Psu
  | Storage
  | Case
  | CpuCooler;

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
  categoryId: string; // references Category
  specs?: ProductSpecs;
  images?: ProductImage[];
};
