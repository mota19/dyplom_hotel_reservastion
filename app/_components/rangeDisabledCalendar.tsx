"use client";

import { useEffect, useMemo, useState } from "react";
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

export type DisabledRange = {
  start_date: string;
  end_date: string;
};

function convertToDisabledRanges(
  ranges: DisabledRange[],
): { from: Date; to: Date }[] {
  return ranges.map((range) => ({
    from: new Date(range.start_date),
    to: new Date(range.end_date),
  }));
}

function isDateBlocked(
  date: Date,
  ranges: { from: Date; to: Date }[],
): boolean {
  return ranges.some((range) => date >= range.from && date <= range.to);
}

function getFirstAvailableDate(
  disabledRanges: { from: Date; to: Date }[],
): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const candidate = new Date(today);

  while (isDateBlocked(candidate, disabledRanges)) {
    candidate.setDate(candidate.getDate() + 1);
  }

  return candidate;
}

export function DateRangePicker({
  onDateChange,
  width,
  disabledDates,
}: {
  onDateChange: (date: DateRange | undefined) => void;
  width: string;
  disabledDates: DisabledRange[] | null;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange>();
  const [defaultMonth, setDefaultMonth] = useState<Date>();

  const disabledRanges = useMemo(() => {
    return disabledDates ? convertToDisabledRanges(disabledDates) : [];
  }, [disabledDates]);

  // 🔁 після завантаження заблокованих дат
  useEffect(() => {
    if (!disabledDates) return;

    const disabledRanges = convertToDisabledRanges(disabledDates); // <-- перемістили сюди
    const firstFree = getFirstAvailableDate(disabledRanges);
    const newDate: DateRange = { from: firstFree, to: undefined };
    setDate(newDate);
    setDefaultMonth(firstFree);
    onDateChange(newDate);
  }, [disabledDates]);

  const formatted =
    date?.from && date?.to
      ? `${format(date.from, "dd MMM yyyy")} - ${format(date.to, "dd MMM yyyy")}`
      : date?.from
        ? `${format(date.from, "dd MMM yyyy")} - ...`
        : "Pick a date";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn(`w-${width} font-normal`)}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatted}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {defaultMonth && (
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={defaultMonth}
            selected={date}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                // Генеруємо всі дати між from і to
                const daysInRange = [];
                const current = new Date(range.from);
                while (current <= range.to) {
                  daysInRange.push(new Date(current));
                  current.setDate(current.getDate() + 1);
                }

                // Якщо в діапазоні є заблоковані — не дозволяємо вибір
                const hasBlocked = daysInRange.some((d) =>
                  isDateBlocked(d, disabledRanges),
                );
                if (hasBlocked) {
                  // можеш показати повідомлення або просто не оновлювати state
                  alert("There are blocked days in the selected range");
                  return;
                }

                setDate(range);
                onDateChange(range);
                setOpen(false);
              } else {
                setDate(range);
                onDateChange(range);
              }
            }}
            disabled={[
              ...disabledRanges,
              (date) => date < new Date(new Date().setHours(0, 0, 0, 0)),
            ]}
            numberOfMonths={2}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
