import { apps } from "@/data/apps";
import AppIcon from "./AppIcon";

export default function AppShortcuts() {
  if (apps.length === 0) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <p className="text-sm text-gray-500">Ứng dụng</p>
      <div className="flex flex-wrap justify-center gap-2">
        {apps.map((app) => (
          <AppIcon key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
