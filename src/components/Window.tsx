

function Window({ children, title, width }: any) {
  return (
    <div
      style={{ width: width }}
      className="bg-gray-200 rounded-lg shadow-xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-gray-200/80 to-gray-100/80 px-4 py-2 flex items-center border-b border-gray-200/90">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-gray-300 hover:bg-red-600 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-gray-300 hover:bg-yellow-600 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-gray-300 hover:bg-green-600 cursor-pointer" />
        </div>

        <div className="flex-1 text-center">
          <span className="text-sm text-gray-400">{title}</span>
        </div>
      </div>
      <div className="p-1.5">{children} </div>
    </div>
  );
}

export default Window;
