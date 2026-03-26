import React, { useState } from 'react';
import { ProductCategoryStep } from './ProductCategoryStep';
import { GpuProductForm } from './GpuProductForm';
import { CpuProductForm } from './CpuProductForm';
import { MotherboardProductForm } from './MotherboardProductForm';
import { RamProductForm } from './RamProductForm';
import { StorageProductForm } from './StorageProductForm';
import { PsuProductForm } from './PsuProductForm';
import { CaseProductForm } from './CaseProductForm';
import { CpuCoolerProductForm } from './CpuCoolerProductForm';
import { getProductSpecType, type ProductSpecType } from '@/lib/productFormMap';
import type { Product } from '@/schema/Product';

export interface ProductSpecFormProps {
  onSuccess: () => void;
  onBack: () => void;
  onAdd: (base: Omit<Product, 'id' | 'categoryId'>) => void;
}

interface ProductAddFormProps {
  onSuccess: () => void;
  onAdd: (item: Product) => void;
}

export default function ProductAddForm({
  onSuccess,
  onAdd,
}: ProductAddFormProps): React.JSX.Element {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const specType: ProductSpecType | undefined = selectedCategoryId
    ? getProductSpecType(selectedCategoryId)
    : undefined;

  function handleBack() {
    setSelectedCategoryId(null);
  }

  if (!selectedCategoryId || !specType) {
    return <ProductCategoryStep onNext={setSelectedCategoryId} />;
  }

  const formProps = {
    onSuccess,
    onBack: handleBack,
    onAdd: (base: Omit<Product, 'id' | 'categoryId'>) =>
      onAdd({ id: crypto.randomUUID(), categoryId: selectedCategoryId!, ...base }),
  };

  switch (specType) {
    case 'gpu':
      return <GpuProductForm {...formProps} />;
    case 'cpu':
      return <CpuProductForm {...formProps} />;
    case 'motherboard':
      return <MotherboardProductForm {...formProps} />;
    case 'ram':
      return <RamProductForm {...formProps} />;
    case 'storage':
      return <StorageProductForm {...formProps} />;
    case 'psu':
      return <PsuProductForm {...formProps} />;
    case 'case':
      return <CaseProductForm {...formProps} />;
    case 'cpuCooler':
      return <CpuCoolerProductForm {...formProps} />;
  }
}
