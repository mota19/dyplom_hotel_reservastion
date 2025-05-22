"use client";
import {
  getAccommodationNameByUser,
  insertRoom,
  uploadImage,
} from "@/app/_supabase/adminApi";
import { getCookie } from "@/app/_supabase/apiUser";
import { FC, useState, useEffect } from "react";

interface ModalProps {
  onClose: () => void;
}

interface IAccommodation {
  id: number | null;
  name: string | null;
}

const roomBedsID: Record<string, number> = {
  Single: 1,
  Double: 2,
  Twin: 3,
  King: 4,
  Queen: 5,
};

const ModalRooms: FC<ModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    accommodation_id: "",
    sqm: "",
    capacity: "",
    pricerPerNight: "",
    discount: "",
    type: "",
    image: null as File | null,
  });
  const [accommodationData, setAccommodationData] = useState<
    IAccommodation[] | null
  >([]);
  const [roomBeds, setRoomBeds] = useState<
    { bed_type_id: number; bed_count: number }[]
  >([]);
  const [isBedsDropdownOpen, setIsBedsDropdownOpen] = useState(false);
  const userId = getCookie("userId");

  useEffect(() => {
    const getAcc = async () => {
      if (userId) {
        const { data } = await getAccommodationNameByUser(userId);

        if (data) {
          const uniqueByAccommodationId = Array.from(
            new Map(data.map((item) => [item, item])).values(),
          );

          setAccommodationData(uniqueByAccommodationId);
        }
      }
    };
    getAcc();
  }, [userId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const updateBedCount = (bed_type_id: number, bed_count: number) => {
    setRoomBeds((prev) => {
      const exists = prev.find((b) => b.bed_type_id === bed_type_id);
      if (exists) {
        return prev.map((b) =>
          b.bed_type_id === bed_type_id ? { ...b, bed_count } : b,
        );
      } else {
        return [...prev, { bed_type_id, bed_count }];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let url = "";

    if (formData.image && userId) {
      const { publicUrl, error } = await uploadImage(
        userId,
        "rooms",
        formData.image,
      );
      if (error) {
        alert("Image upload failed");
        console.error(error);
        return;
      }
      url = publicUrl;
    }

    const roomsData = {
      name: formData.name,
      description: formData.description,
      accommodation_id: +formData.accommodation_id,
      sqm: +formData.sqm,
      capacity: +formData.capacity,
      pricepernight: +formData.pricerPerNight,
      discount: +formData.discount,
      room_type: formData.type,
      image: url,
    };

    try {
      const filteredBeds = roomBeds.filter((b) => b.bed_count > 0);
      await insertRoom(roomsData, filteredBeds);
      onClose();
    } catch (err) {
      console.error("Room insert failed:", err);
      alert("Failed to save room");
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-[4px]">
      <form
        className="mx-auto w-full max-w-xl rounded-2xl bg-white p-8 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Add Room
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <select
            name="accommodation_id"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            value={formData.accommodation_id!}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Choose an accommodation
            </option>
            {accommodationData?.map((el) => (
              <option
                value={String(el.id)}
                key={el.id}
              >{`${el.id}: ${el.name}`}</option>
            ))}
          </select>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            placeholder="Short description..."
            rows={3}
            name="description"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Type of room
          </label>
          <select
            name="type"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            value={formData.type!}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Choose a type of room
            </option>
            <option value="Standard">Standard</option>
            <option value="Economy">Economy</option>
            <option value="Cabin">Cabin</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Junior Suite">Junior Suite</option>
            <option value="Studio">Studio</option>
            <option value="Family Room">Family Room</option>
            <option value="Connecting Rooms">Connecting Rooms</option>
            <option value="Presidential Suite">Presidential Suite</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Apartment">Apartment</option>
          </select>
        </div>
        <div className="relative mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Beds
          </label>
          <div
            className="w-full cursor-pointer rounded-xl border border-gray-300 px-4 py-2 select-none"
            onClick={() => setIsBedsDropdownOpen((prev) => !prev)}
          >
            {roomBeds.length > 0
              ? roomBeds
                  .map(
                    (b) =>
                      `${Object.keys(roomBedsID).find(
                        (k) => roomBedsID[k] === b.bed_type_id,
                      )} (${b.bed_count})`,
                  )
                  .join(", ")
              : "Select beds..."}
          </div>

          {isBedsDropdownOpen && (
            <div className="absolute z-10 mt-1 mb-20 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
              {Object.entries(roomBedsID).map(([bedName, bed_type_id]) => {
                const currentCount =
                  roomBeds.find((b) => b.bed_type_id === bed_type_id)
                    ?.bed_count || 0;

                return (
                  <div
                    key={bed_type_id}
                    className="flex items-center justify-between gap-4 px-4 py-2 hover:bg-gray-50"
                  >
                    <span>{bedName}</span>
                    <input
                      type="number"
                      min="0"
                      value={currentCount}
                      onChange={(e) =>
                        updateBedCount(
                          bed_type_id,
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-right"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* City and Country */}
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Square meters
            </label>
            <input
              type="text"
              name="sqm"
              placeholder="Square meters"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              value={formData.sqm}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="text"
              placeholder="Capacity"
              name="capacity"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              value={formData.capacity}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              discount
            </label>
            <input
              type="text"
              name="discount"
              placeholder="discount"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              value={formData.discount}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Price per night
            </label>
            <input
              type="text"
              placeholder="Price per night"
              name="pricerPerNight"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              value={formData.pricerPerNight}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Image upload */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
            onChange={handleImageChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalRooms;
