import Link from "next/link";

export default function GoogleHeader() {
  return (
    <header className="flex items-center justify-end px-4 py-3 gap-2">
      <a
        href="#"
        className="text-sm text-gray-700 hover:underline px-2 py-1"
        onClick={(e) => e.preventDefault()}
      >
        Gmail
      </a>
      <a
        href="#"
        className="text-sm text-gray-700 hover:underline px-2 py-1"
        onClick={(e) => e.preventDefault()}
      >
        Hình ảnh
      </a>

      {/* Grid icon */}
      <button
        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
        aria-label="Ứng dụng Google"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368">
          <path d="M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
      </button>

      <button className="ml-1 px-6 py-2 bg-[#1a73e8] text-white text-sm font-medium rounded-full hover:bg-[#1557b0] transition-colors shadow-sm">
        Đăng nhập
      </button>
    </header>
  );
}
