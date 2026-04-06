import React, { useRef, useState } from 'react';
import { uploadProductImage } from '@/db/storage/uploadProductImage';
import { useUpdateProductImages } from '@/lib/queries/productMutations';
import { Button } from '@/components/ui/button';
import type { ProductImage } from '@/schema/ProductImage';

interface ProductImageUploadProps {
  productId: string;
  images: ProductImage[];
}

type UploadStatus = { type: 'success' | 'error'; message: string } | null;

export default function ProductImageUpload({
  productId,
  images,
}: ProductImageUploadProps): React.JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<UploadStatus>(null);
  const { mutate: saveImages } = useUpdateProductImages();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus(null);
    setUploading(true);
    try {
      const url = await uploadProductImage(productId, file);
      const newImage: ProductImage = {
        url,
        altText: file.name,
        isPrimary: images.length === 0,
        order: images.length,
      };
      saveImages(
        { productId, images: [...images, newImage] },
        {
          onSuccess: () =>
            setStatus({ type: 'success', message: 'Image uploaded.' }),
          onError: (err) =>
            setStatus({
              type: 'error',
              message: `Failed to save image: ${err instanceof Error ? err.message : 'Unknown error'}`,
            }),
        }
      );
    } catch (err) {
      setStatus({
        type: 'error',
        message: `Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function handleSetPrimary(index: number) {
    const updated = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    saveImages({ productId, images: updated });
  }

  function handleRemove(index: number) {
    const updated = images
      .filter((_, i) => i !== index)
      .map((img, i) => ({
        ...img,
        order: i,
        isPrimary:
          img.isPrimary && i === 0 ? true : (images[0]?.isPrimary ?? i === 0),
      }));

    const hasPrimary = updated.some((img) => img.isPrimary);
    if (!hasPrimary && updated.length > 0) updated[0].isPrimary = true;

    saveImages({ productId, images: updated });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative group w-24 h-24">
            <img
              src={img.url}
              alt={img.altText ?? `Image ${i + 1}`}
              className="w-full h-full object-cover rounded-md border"
            />
            {img.isPrimary && (
              <span className="absolute top-1 left-1 text-[10px] bg-primary text-primary-foreground rounded px-1">
                Primary
              </span>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-md flex flex-col items-center justify-center gap-1 transition-opacity">
              {!img.isPrimary && (
                <button
                  type="button"
                  onClick={() => handleSetPrimary(i)}
                  className="text-[10px] text-white underline"
                >
                  Set primary
                </button>
              )}
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="text-[10px] text-red-300 underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => {
            setStatus(null);
            fileInputRef.current?.click();
          }}
          className="w-fit"
        >
          {uploading ? 'Uploading…' : 'Add image'}
        </Button>
        {status && (
          <p
            className={`text-xs ${status.type === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
}
