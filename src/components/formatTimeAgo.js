"use client";

// Format the comment time as time ago (e.g., 2d, 5h, etc.)
function formatTimeAgo(utcString) {
  const utcDate = new Date(utcString + "Z");
  const localDate = new Date();
  const diffInSeconds = Math.floor((localDate - utcDate) / 1000);

  const timeUnits = [
    { unit: "y", value: 60 * 60 * 24 * 365 },
    { unit: "m", value: 60 * 60 * 24 * 30 },
    { unit: "d", value: 60 * 60 * 24 },
    { unit: "h", value: 60 * 60 },
    { unit: "m", value: 60 },
    { unit: "s", value: 1 },
  ];

  for (const { unit, value } of timeUnits) {
    const diff = Math.floor(diffInSeconds / value);
    if (diff > 0) return `${diff}${unit}`;
  }

  return "Just now"; // If time difference is very small
}

export default formatTimeAgo;
