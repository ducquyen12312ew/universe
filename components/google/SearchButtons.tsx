"use client";

import { useRouter } from "next/navigation";
import { getFirstMatch } from "@/data/apps";

interface SearchButtonsProps {
  query: string;
}

export default function SearchButtons({ query }: SearchButtonsProps) {
  const router = useRouter();

  const handleSearch = () => {
    const match = getFirstMatch(query);
    if (match) router.push(match.route);
  };

  const handleLucky = () => {
    const match = getFirstMatch(query);
    if (match) router.push(match.route);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-7">
      <button
        onClick={handleSearch}
        className="px-5 py-3 bg-[#f8f9fa] text-sm text-[#3c4043] border border-[#f8f9fa] rounded hover:border-[#dadce0] hover:shadow-sm hover:bg-[#f0f4f9] transition-all duration-150 font-medium"
      >
        Tìm trên Google
      </button>
      <button
        onClick={handleLucky}
        className="px-5 py-3 bg-[#f8f9fa] text-sm text-[#3c4043] border border-[#f8f9fa] rounded hover:border-[#dadce0] hover:shadow-sm hover:bg-[#f0f4f9] transition-all duration-150 font-medium"
      >
        Xem trang đầu tiên tìm được
      </button>
    </div>
  );
}
