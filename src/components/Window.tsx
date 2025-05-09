import React from "react";

function Window({ children, title }: any) {
  return (
    <div className="bg-white rounded-lg shadow-xl w-full overflow-hidden">
      {/* 标题栏 */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-2 flex items-center border-b border-gray-200">
        {/* 交通灯按钮 */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-gray-200 hover:bg-red-600 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-gray-200 hover:bg-yellow-600 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-gray-200 hover:bg-green-600 cursor-pointer" />
        </div>

        {/* 窗口标题 */}
        <div className="flex-1 text-center">
          <span className="text-sm text-gray-400">{title}</span>
        </div>
      </div>
      <div className="p-2">{children} </div>
    </div>
  );
}

export default Window;
