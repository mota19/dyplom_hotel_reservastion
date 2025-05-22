import { FC } from "react";

// Функція, яка повертає текст і колір залежно від рейтингу
export const getRatingText = (star_rating: number | null) => {
  if (star_rating === null) {
    return { text: "error", color: "bg-black-600" };
  }
  if (star_rating >= 9) {
    return {
      text: "Exceptional",
      color: "bg-green-600", // Зелений для високої оцінки
    };
  } else if (star_rating >= 7) {
    return {
      text: "Very Good",
      color: "bg-blue-600", // Синій для гарної оцінки
    };
  } else if (star_rating >= 5) {
    return {
      text: "Good",
      color: "bg-yellow-600", // Жовтий для середньої оцінки
    };
  } else if (star_rating >= 3) {
    return {
      text: "Fair",
      color: "bg-orange-600", // Оранжевий для низької оцінки
    };
  } else {
    return {
      text: "Poor",
      color: "bg-red-600", // Червоний для поганої оцінки
    };
  }
};

interface RatingProps {
  star_rating: number | null;
}

const Rating: FC<RatingProps> = ({ star_rating }) => {
  if (star_rating === null) {
    return <span>Rating is not available</span>;
  }

  const { text, color } = getRatingText(star_rating);

  return (
    <>
      <span
        className={`rounded-md px-2 py-1 font-semibold text-white ${color}`}
      >
        {star_rating}
      </span>
      <span className="ml-2 text-black">{text}</span>
    </>
  );
};

export default Rating;
