"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

type Country = {
  code: string;
  name: string;
  flag: string;
};

const countries: Country[] = [
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  onBlur?: () => void;
}

export function PhoneInput({
  value,
  onChange,
  error,
  onBlur,
  ...props
}: PhoneInputProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(
    countries[0]
  );

  // Split the value into country code and number
  const [countryCode, phoneNumber] = React.useMemo(() => {
    const code =
      countries.find((c) => value.startsWith(c.code))?.code ||
      selectedCountry.code;
    const number = value.replace(code, "").trim();
    return [code, number];
  }, [value, selectedCountry.code]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    // Update the full phone number with the new country code
    onChange(country.code + phoneNumber);
    setOpen(false);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/\D/g, "");
    onChange(selectedCountry.code + newNumber);
  };

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[140px] justify-between"
          >
            {selectedCountry.flag} {selectedCountry.code}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {countries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={() => handleCountrySelect(country)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCountry.code === country.code
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {country.flag} {country.name} ({country.code})
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        onBlur={onBlur}
        className={cn("flex-1", error && "border-red-500")}
        placeholder="Phone number"
        {...props}
      />
    </div>
  );
}
