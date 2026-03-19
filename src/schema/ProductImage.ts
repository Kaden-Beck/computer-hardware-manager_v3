export type ProductImage = {
  id: string;
  url: string;
  altText?: string;
  productId: string; // references Product
};
