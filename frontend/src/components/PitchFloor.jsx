import React from 'react';

export default function PitchFloor() {
  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden pitch-perspective-container pointer-events-none mt-10">
      {/* 3D burilgan maydon tekisligi */}
      <div className="absolute inset-x-0 -top-10 h-[500px] pitch-floor border-t-4 border-white/80 flex items-center justify-center">
        
        {/* Markaziy doira va chiziqlar */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Maydon o'rta chizig'i */}
          <div className="absolute w-full h-1 bg-white/70 shadow-sm"></div>

          {/* Markaziy aylanasi */}
          <div className="w-56 h-56 rounded-full border-4 border-white/75 flex items-center justify-center">
            {/* Markaziy nuqta */}
            <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
          </div>

          {/* Jarima maydonchasi yarim arkasi */}
          <div className="absolute -bottom-10 w-96 h-48 border-4 border-white/70 rounded-t-full"></div>

          {/* Burchak bayroqchalari */}
          <div className="absolute top-4 left-6 text-2xl">🚩</div>
          <div className="absolute top-4 right-6 text-2xl">🚩</div>
        </div>

      </div>

      {/* Maydon chetidagi yorug'lik va soyalar */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream-200 dark:from-stadium-night to-transparent"></div>
    </div>
  );
}

