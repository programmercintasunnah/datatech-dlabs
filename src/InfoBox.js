// InfoBox.js
import React from "react";

const InfoBox = () => {
  return (
    <div className="border border-gray-300 p-4 rounded-md shadow-lg bg-white mb-4">
      <h6 className="text-sm font-semibold text-gray-700 mb-2">
        Lihat dokumentasi lengkap di{" "}
        <a
          href="https://drive.google.com/file/d/15v3rauUc4WBKpBtj4jJVZnNN1CLW19jG/view?usp=sharing"
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          sini
        </a>
      </h6>
      <h6 className="text-sm font-semibold text-gray-700">
        Download source code dari repository{" "}
        <a
          href="https://github.com/programmercintasunnah/datatech-dlabs"
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          sini
        </a>
      </h6>
    </div>
  );
};

export default InfoBox;
