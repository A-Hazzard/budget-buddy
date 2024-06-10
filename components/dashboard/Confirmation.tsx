import { useState } from 'react';

export default function Confirmation({ itemName, onCancel, onDelete }: { itemName: string, onCancel: () => void, onDelete: () => void }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancel = () => {
    onCancel();
  };

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete();
  };

  return (
    <div className="p-10 absolute top-[25%] left-1/2 -translate-x-1/2 bg-white shadow-lg flex flex-col items-center justify-center">
      <p>
        Are you sure you want to <span className="text-red-600">delete</span> {itemName}?
      </p>

      <div className="mt-5 flex gap-3 items-center justify-end w-full">
        <button className="p-2 rounded-md text-blue-600" onClick={handleCancel} disabled={isDeleting}>
          Cancel
        </button>
        <button className="p-2 rounded-md text-white bg-red-600" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
