import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-800 p-4 hidden md:block border-r border-gray-200 dark:border-gray-700">
      <h2 className="font-semibold mb-4">Chat History</h2>
      {/* Placeholder for history */}
      <p className="text-sm text-gray-500">No previous chats</p>
    </aside>
  );
};

export default Sidebar;
