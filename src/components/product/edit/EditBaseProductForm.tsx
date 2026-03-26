import React from 'react';
import { getProductSpecType } from '@/lib/productFormMap';
import type { Product } from '@/schema/Product';
import { GpuProductEditForm } from './EditGpuForm';
import { CpuProductEditForm } from './EditCpuForm';
import { MotherboardProductEditForm } from './EditMotherboardForm';
import { RamProductEditForm } from './EditRamForm';
import { StorageProductEditForm } from './EditStorageForm';
import { PsuProductEditForm } from './EditPsuForm';
import { CaseProductEditForm } from './EditCaseForm';
import { CpuCoolerProductEditForm } from './EditCpuCoolerForm';

export interface ProductSpecEditFormProps {
  product: Product;
  onSuccess: () => void;
  onEdit: (base: Omit<Product, 'id' | 'categoryId'>) => void;
}

interface ProductEditFormProps {
  product: Product;
  onSuccess: () => void;
  onEdit: (item: Product) => void;
}

export default function ProductEditForm({
  product,
  onSuccess,
  onEdit,
}: ProductEditFormProps): React.JSX.Element {
  const specType = getProductSpecType(product.categoryId);

  if (!specType) {
    return (
      <div className="px-4 py-6 text-sm text-muted-foreground">
        Unknown product category. Cannot render edit form.
      </div>
    );
  }

  const formProps: ProductSpecEditFormProps = {
    product,
    onSuccess,
    onEdit: (base) =>
      onEdit({ id: product.id, categoryId: product.categoryId, ...base }),
  };

  switch (specType) {
    case 'gpu':
      return <GpuProductEditForm {...formProps} />;
    case 'cpu':
      return <CpuProductEditForm {...formProps} />;
    case 'motherboard':
      return <MotherboardProductEditForm {...formProps} />;
    case 'ram':
      return <RamProductEditForm {...formProps} />;
    case 'storage':
      return <StorageProductEditForm {...formProps} />;
    case 'psu':
      return <PsuProductEditForm {...formProps} />;
    case 'case':
      return <CaseProductEditForm {...formProps} />;
    case 'cpuCooler':
      return <CpuCoolerProductEditForm {...formProps} />;
  }
}
