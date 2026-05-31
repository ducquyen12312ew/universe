"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { App } from "@/data/apps";

interface AppIconProps {
  app: App;
}

export default function AppIcon({ app }: AppIconProps) {
  const [imgError, setImgError] = useState(false);
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(app.route)}
      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group w-24"
      title={app.name}
    >
      <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 group-hover:shadow-md transition-shadow">
        {!imgError ? (
          <img
            src={app.logo}
            alt={app.name}
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-2xl font-bold rounded-full"
            style={{ backgroundColor: app.color ?? "#5f6368" }}
          >
            {app.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <span className="text-xs text-gray-600 group-hover:text-gray-900 text-center leading-tight line-clamp-2 transition-colors">
        {app.name}
      </span>
    </button>
  );
}
