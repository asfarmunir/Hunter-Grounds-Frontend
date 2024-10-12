"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewMaker = ({
  onRatingSubmit,
  defaultRating,
}: {
  onRatingSubmit: (rating: number) => void;
  defaultRating?: number;
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(
    defaultRating! / 2 || 0
  );

  // Function to handle the star click
  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingSubmit(rating * 2); // Convert rating to 2 points each
  };

  return (
    <div className="flex items-center flex-col gap-2 md:pr-4">
      <p>Rate this trip</p>
      <div className="flex gap-1.5 items-center">
        {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
          <button
            key={star}
            type="button"
            className="text-2xl focus:outline-none"
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <FaStar
              className={`transition-colors duration-300 text-sm ${
                (hoverRating || selectedRating) >= star
                  ? "text-primary-50"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReviewMaker;
