"use client";
import { FC, useState } from "react";
import BookingCard from "./BookingCard";
import SortByButton from "./SortByButton";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";

const ListOfBooking: FC = () => {
  const data = useAppSelector((state) => state.booking);
  const city = useAppSelector((state) => state.info.destination);
  const inDate = useAppSelector((state) => state.info.inDate);
  const outDate = useAppSelector((state) => state.info.outDate);
  const numberOfGuests = useAppSelector((state) => state.info.numberOfGuest);
  const range = useAppSelector((state) => state.range);

  const router = useRouter();

  const parseDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  };

  const inD = parseDate(inDate);
  const outD = parseDate(outDate);

  let nights = 1;

  if (inD && outD) {
    const diff = (outD.getTime() - inD.getTime()) / (1000 * 60 * 60 * 24);
    nights = diff > 0 ? Math.floor(diff) : 1;
  }

  const validResults =
    data
      ?.filter((el) => el.city !== "")
      ?.filter(
        (el) =>
          (el.cheapestRoom?.pricepernight ?? 0) * nights >=
            range.priceRange.min &&
          (el.cheapestRoom?.pricepernight ?? 0) * nights <=
            range.priceRange.max,
      ) ?? [];

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(validResults.length / itemsPerPage);

  const paginatedData = validResults.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const getPaginationRange = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);

    range.push(1);
    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) range.push("...");
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const handlePageClick = (p: number | string) => {
    if (typeof p === "number") {
      setPage(p);
    }
  };

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="w-full p-8">
      <p className="text-gray-800">{validResults.length} search results for</p>
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-[700]">
          {city}, {inDate}-{outDate}, {numberOfGuests} guests
        </h2>
        <SortByButton />
      </div>

      <div className="mt-2 flex flex-col gap-8">
        {paginatedData.map((item) => (
          <BookingCard
            key={item.id}
            cheapestRoom={item.cheapestRoom ? item.cheapestRoom : {}}
            id={item.id}
            city={item.city}
            name={item.name}
            star_rating={item.star_rating}
            country={item.country}
            image={item.image}
            nights={nights}
            onClick={() => router.push(`/booking/${item.id}`)}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>

        {getPaginationRange().map((p, idx) => (
          <button
            key={idx}
            onClick={() => handlePageClick(p)}
            disabled={p === "..."}
            className={`rounded px-3 py-1 ${
              p === page
                ? "bg-black text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListOfBooking;
