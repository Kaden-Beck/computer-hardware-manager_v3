import React from 'react';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LabelWithTooltip } from '@/components/ui/label-with-tooltip';
import type { Manufacturer } from '@/schema/Manufacturer';

// The form prop is typed as any because this component is shared across all 8
// product spec forms. Every product schema extends productBaseSchema, so these
// field names are always present, but TanStack Form's FormApi generic makes a
// single concrete type impractical here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProductForm = any;

interface ProductBaseFieldsProps {
  form: AnyProductForm;
  manufacturers: Manufacturer[];
}

export function ProductBaseFields({
  form,
  manufacturers,
}: ProductBaseFieldsProps): React.JSX.Element {
  return (
    <FieldGroup>
      <form.Field name="name">
        {(field: AnyProductForm) => (
          <Field>
            <LabelWithTooltip
              htmlFor={field.name}
              label="Name"
              tip="The display name of this product."
            />
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.target.value)
              }
              onBlur={field.handleBlur}
              aria-invalid={field.state.meta.errors.length > 0}
              placeholder="e.g. GeForce RTX 5090"
            />
            <FieldError errors={field.state.meta.errors} />
          </Field>
        )}
      </form.Field>

      <form.Field name="sku">
        {(field: AnyProductForm) => (
          <Field>
            <LabelWithTooltip
              htmlFor={field.name}
              label="SKU"
              tip="Unique stock-keeping unit identifier."
            />
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.target.value)
              }
              onBlur={field.handleBlur}
              aria-invalid={field.state.meta.errors.length > 0}
              placeholder="e.g. NV-RTX5090"
            />
            <FieldError errors={field.state.meta.errors} />
          </Field>
        )}
      </form.Field>

      <form.Field name="description">
        {(field: AnyProductForm) => (
          <Field>
            <LabelWithTooltip
              htmlFor={field.name}
              label="Description"
              tip="A brief description shown in product listings."
            />
            <Textarea
              id={field.name}
              value={field.state.value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                field.handleChange(e.target.value)
              }
              onBlur={field.handleBlur}
              aria-invalid={field.state.meta.errors.length > 0}
              placeholder="Brief description of the product"
            />
            <FieldError errors={field.state.meta.errors} />
          </Field>
        )}
      </form.Field>

      <form.Field name="manufacturerId">
        {(field: AnyProductForm) => (
          <Field>
            <LabelWithTooltip
              htmlFor={field.name}
              label="Manufacturer"
              tip="The company that makes this product."
            />
            <Select
              value={field.state.value}
              onValueChange={(val: string) => field.handleChange(val)}
            >
              <SelectTrigger
                id={field.name}
                aria-invalid={field.state.meta.errors.length > 0}
              >
                <SelectValue placeholder="Select a manufacturer" />
              </SelectTrigger>
              <SelectContent>
                {manufacturers.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={field.state.meta.errors} />
          </Field>
        )}
      </form.Field>

      <form.Field name="color">
        {(field: AnyProductForm) => (
          <Field>
            <LabelWithTooltip
              htmlFor={field.name}
              label="Color"
              tip="Primary color of the product (optional)."
            />
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.target.value)
              }
              onBlur={field.handleBlur}
              placeholder="e.g. Black"
            />
          </Field>
        )}
      </form.Field>

      <form.Field name="msrp">
        {(field: AnyProductForm) => (
          <Field>
            <LabelWithTooltip
              htmlFor={field.name}
              label="MSRP ($)"
              tip="Manufacturer's suggested retail price."
            />
            <Input
              id={field.name}
              type="number"
              min={0}
              step={0.01}
              value={field.state.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(parseFloat(e.target.value) || 0)
              }
              onBlur={field.handleBlur}
              aria-invalid={field.state.meta.errors.length > 0}
              placeholder="e.g. 1999.99"
            />
            <FieldError errors={field.state.meta.errors} />
          </Field>
        )}
      </form.Field>

      <form.Field name="price">
        {(field: AnyProductForm) => (
          <Field>
            <LabelWithTooltip
              htmlFor={field.name}
              label="Sale Price ($)"
              tip="Current sale price, if different from MSRP (optional)."
            />
            <Input
              id={field.name}
              type="number"
              min={0}
              step={0.01}
              value={field.state.value ?? ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(
                  e.target.value === '' ? null : parseFloat(e.target.value)
                )
              }
              onBlur={field.handleBlur}
              placeholder="e.g. 1799.99"
            />
          </Field>
        )}
      </form.Field>

      <form.Field name="quantity">
        {(field: AnyProductForm) => (
          <Field>
            <LabelWithTooltip
              htmlFor={field.name}
              label="Quantity"
              tip="Units currently in stock."
            />
            <Input
              id={field.name}
              type="number"
              min={0}
              step={1}
              value={field.state.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(parseInt(e.target.value, 10) || 0)
              }
              onBlur={field.handleBlur}
              aria-invalid={field.state.meta.errors.length > 0}
              placeholder="e.g. 10"
            />
            <FieldError errors={field.state.meta.errors} />
          </Field>
        )}
      </form.Field>
    </FieldGroup>
  );
}
