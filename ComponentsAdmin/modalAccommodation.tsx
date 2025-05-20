"use client";
import { FC, useState } from "react";
import { insertAccommodation, uploadImage } from "@/app/_supabase/adminApi";
import { getCookie } from "@/app/_supabase/apiUser";

interface ModalProps {
  onClose: () => void;
}

const amenitiesList: Record<string, number> = {
  "Wi-Fi": 1,
  Parking: 2,
  "Swimming Pool": 3,
  "Air Conditioning": 4,
  Heating: 5,
  "Breakfast Included": 6,
  "Laundry / Washing Machine": 7,
  TV: 8,
  Safe: 9,
  Elevator: 10,
  "Pet Friendly": 11,
  Spa: 12,
  Sauna: 13,
};

const ModalAccommodation: FC<ModalProps> = ({ onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: 1,
    city: "",
    country: "",
    image: null as File | null,
  });

  const [amenities, setAmenities] = useState<number[]>([]);

  const getAmenityNameById = (id: number): string => {
    return (
      Object.entries(amenitiesList).find(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, amenityId]) => amenityId === id,
      )?.[0] || ""
    );
  };

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

  const toggleAmenity = (id: number) => {
    setAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = getCookie("userId");
    let url = "";

    if (formData.image && userId) {
      const { publicUrl, error } = await uploadImage(
        userId,
        "images",
        formData.image,
      );
      if (error) {
        alert("Image upload failed");
        console.error(error);
        return;
      }
      url = publicUrl;
    }

    const accommodationData = {
      name: formData.name,
      type_id: formData.type,
      description: formData.description,
      city: formData.city,
      country: formData.country,
      image: url,
      user_id: userId || "",
    };

    try {
      await insertAccommodation(accommodationData, amenities);
      onClose();
    } catch (err) {
      console.error("Accommodation insert failed:", err);
      alert("Failed to save accommodation");
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
          Add Accommodation
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
          <select
            name="type"
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            value={formData.type!}
            onChange={handleInputChange}
          >
            <option value={1}>Hotel</option>
            <option value={2}>Motel</option>
            <option value={3}>Cabin</option>
          </select>
        </div>

        {/* City and Country */}
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              placeholder="Country"
              name="country"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Amenities combobox */}
        <div className="relative mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Amenities
          </label>
          <div
            className="w-full cursor-pointer rounded-xl border border-gray-300 px-4 py-2 select-none focus:outline-none"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {amenities.length > 0
              ? amenities.map(getAmenityNameById).join(", ")
              : "Select amenities..."}
          </div>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
              {Object.entries(amenitiesList).map(([amenity, id]) => (
                <label
                  key={id}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={amenities.includes(id)}
                    onChange={() => toggleAmenity(id)}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          )}
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

export default ModalAccommodation;
