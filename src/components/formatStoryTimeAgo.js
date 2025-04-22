"use client";

function formatStoryTimeAgo(utcString) {
    const utcDate = new Date(utcString);
    const localDate = new Date();
    
    const diffInSeconds = Math.floor((localDate.getTime() - utcDate.getTime()) / 1000);
    
    const intervals = {
      y: 31536000, // 60 * 60 * 24 * 365
      M: 2592000,  // 60 * 60 * 24 * 30
      d: 86400,    // 60 * 60 * 24
      h: 3600,     // 60 * 60
      m: 60,      // 60 (renamed to avoid conflict)
      s: 1,
    };
  
    for (const [key, value] of Object.entries(intervals)) {
      const count = Math.floor(diffInSeconds / value);
      if (count > 0) {
        return `${count}${key === 'm_' ? 'm' : key}`;
      }
    }
    return "0s";
}

export default formatStoryTimeAgo;
