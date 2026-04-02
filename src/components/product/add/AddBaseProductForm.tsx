import React, { useState } from 'react';
import { ProductCategoryStep } from './AddBaseProductCategoryStep';
import { GpuProductForm } from './AddGpuForm';
import { CpuProductForm } from './AddCpuForm';
import { MotherboardProductForm } from './AddMotherboardForm';
import { RamProductForm } from './AddRamForm';
import { StorageProductForm } from './AddStorageForm';
import { PsuProductForm } from './AddPsuForm';
import { CaseProductForm } from './AddCaseForm';
import { CpuCoolerProductForm } from './AddCpuCoolerForm';
import { getProductSpecType, type ProductSpecType } from '@/lib/productFormMap';
import type { Product } from '@/schema/Product';
import { useQueryClient } from '@tanstack/react-query';
import { addProduct } from '@/db/mutation/addProduct';

export interface ProductSpecFormProps {
  onSuccess: () => void;
  onBack: () => void;
  onAdd: (base: Omit<Product, 'id' | 'categoryId'>) => void;
}

interface ProductAddFormProps {
  onSuccess: () => void;
}

export default function ProductAddForm({
  onSuccess,
}: ProductAddFormProps): React.JSX.Element {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const queryClient = useQueryClient();

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
    onAdd: (base: Omit<Product, 'id' | 'categoryId'>) => {
      addProduct({ categoryId: selectedCategoryId, ...base }).then(() =>
        queryClient.invalidateQueries({ queryKey: ['products'] })
      );
    },
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
