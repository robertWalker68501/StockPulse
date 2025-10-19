/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Control, Controller, FieldError } from 'react-hook-form';
import countryList from 'react-select-country-list';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type CountrySelectProps = {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError;
  required?: boolean;
};

type MaybeCountryValue =
  | string
  | { value?: string; label?: string }
  | null
  | undefined;

const CountrySelect = ({
  value,
  onChange,
}: {
  value?: MaybeCountryValue;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const countries = countryList().getData();

  // Extract a meaningful string from various possible inputs (string, {value,label}, etc.)
  const extractInputString = (
    input?: MaybeCountryValue
  ): string | undefined => {
    if (!input) return undefined;
    if (typeof input === 'string') return input;
    if (typeof input === 'object') {
      const asAny = input as any;
      if (typeof asAny.value === 'string' && asAny.value.trim())
        return asAny.value;
      if (typeof asAny.label === 'string' && asAny.label.trim())
        return asAny.label;
    }
    return undefined;
  };

  // Resolve a strict 2-letter ISO code from input or by looking up the countries list.
  const resolveIso2 = (input?: MaybeCountryValue): string | undefined => {
    const raw = extractInputString(input);
    if (!raw) return undefined;

    const sanitized = raw.toUpperCase().replace(/[^A-Z]/g, '');
    if (sanitized.length === 2) return sanitized;

    // Try to match by value or label (case-insensitive)
    const match = countries.find(
      (c) =>
        (c.value && String(c.value).toLowerCase() === raw.toLowerCase()) ||
        (c.label && c.label.toLowerCase() === raw.toLowerCase())
    );
    if (match && typeof match.value === 'string') {
      const code = String(match.value)
        .toUpperCase()
        .replace(/[^A-Z]/g, '');
      if (code.length === 2) return code;
    }

    return undefined;
  };

  const selectedIso = resolveIso2(value);
  const selectedLabel =
    (typeof value === 'object' && value && (value as any).label) ||
    countries.find(
      (c) =>
        c.value === selectedIso || c.value === (extractInputString(value) ?? '')
    )?.label;

  // Small helper to render a reliable SVG flag
  const Flag = ({ iso }: { iso?: string }) =>
    iso ? (
      <ReactCountryFlag
        svg
        countryCode={iso}
        aria-label={iso}
        style={{ width: '1em', height: '1em', lineHeight: '1' }}
      />
    ) : null;

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='country-select-trigger'
        >
          {selectedIso ? (
            <span className='flex items-center gap-2'>
              <Flag iso={selectedIso} />
              <span>{selectedLabel}</span>
            </span>
          ) : (
            'Select your country...'
          )}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-full border-gray-600 bg-gray-800 p-0'
        align='start'
      >
        <Command className='border-gray-600 bg-gray-800'>
          <CommandInput
            placeholder='Search countries...'
            className='country-select-input'
          />
          <CommandEmpty className='country-select-empty'>
            No country found.
          </CommandEmpty>
          <CommandList className='scrollbar-hide-default max-h-60 bg-gray-800'>
            <CommandGroup className='bg-gray-800'>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(val: string) => {
                    // ensure we pass the 2-letter (or original) string to the form
                    onChange(String(val));
                    setOpen(false);
                  }}
                  className='country-select-item'
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 text-yellow-500',
                      selectedIso ===
                        String(country.value)
                          .toUpperCase()
                          .replace(/[^A-Z]/g, '')
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  <span className='flex items-center gap-2'>
                    <span>
                      <Flag iso={resolveIso2(country.value)} />
                    </span>
                    <span>{country.label}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const CountrySelectField = ({
  name,
  label,
  control,
  error,
  required = false,
}: CountrySelectProps) => {
  return (
    <div className='space-y-2'>
      <Label
        htmlFor={name}
        className='form-label'
      >
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        defaultValue={''}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <CountrySelect
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {error && <p className='text-sm text-red-500'>{error.message}</p>}
      <p className='text-xs text-gray-500'>
        Helps us show market data and news relevant to you.
      </p>
    </div>
  );
};
