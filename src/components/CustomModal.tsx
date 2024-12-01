import React, { memo } from "react";
import { FaExclamationCircle, FaThumbsUp } from "react-icons/fa";

export type props = {
  title: string;
  description: string;
  closeModal: () => void;
  confirmFn: () => void;
  isError: boolean;
};

const CustomModal: React.FC<props> = ({
  title,
  description,
  closeModal,
  confirmFn,
  isError,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="w-full flex flex-row items-center justify-center mb-4">
          {isError ? (
            <FaExclamationCircle size={30} color="#ff2a00" />
          ) : (
            <FaThumbsUp size={30} color="#0dff00" />
          )}
        </div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Close
          </button>
          <button
            onClick={confirmFn}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomModal);
