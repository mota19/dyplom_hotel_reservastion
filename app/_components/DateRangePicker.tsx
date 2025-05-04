"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";

export function DateRangePicker({
  onDateChange,
}: {
  onDateChange: (date: DateRange | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  const formatted =
    date?.from && date?.to
      ? `${format(date.from, "dd MMM yyyy")} - ${format(date.to, "dd MMM yyyy")}`
      : "Pick a date";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[260px] justify-start border-none text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatted}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            onDateChange(newDate); // 🔄 передаємо в батьківський компонент
            if (newDate?.from && newDate?.to) {
              setOpen(false);
            }
          }}
          disabled={(date) => date < new Date()}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
