import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DatePickerProps } from "@/lib/interfaces";

export function DatePicker({
  htmlFor,
  label,
  value,
  onChange,
}: DatePickerProps) {
  return (
    <>
      <label htmlFor={htmlFor} className="block text-sm text-[#232323]">
        {label}
      </label>

      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "mt-1 w-full flex justify-between items-center rounded-md border border-[#DFEAF2] bg-white px-4 py-2 text-left text-[15px] text-[#6B7280] shadow-none"
            )}
          >
            <span
              className={`font-normal ${
                value ? "text-[#232323]" : "text-[#718EBF]"
              }`}
            >
              {value ? format(value, "dd MMMM yyyy") : "25 January 1990"}
            </span>
            <CalendarIcon className="h-4 w-4 text-[#718EBF]" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ?? undefined}
            onSelect={(day) => onChange(day ?? null)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
