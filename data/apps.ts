export interface App {
  id: string;
  name: string;
  logo: string;
  keywords: string[];
  route: string;
  description?: string;
  color?: string;
}

export const apps: App[] = [
  {
    id: "overleaf",
    name: "Overleaf",
    logo: "/image/overleaf.png",
    keywords: [
      "overleaf",
      "latex",
      "đồ án",
      "datn",
      "báo cáo",
      "document",
      "pdf",
      "bài luận",
      "thesis",
      "scientific",
    ],
    route: "/apps/overleaf",
    description: "Online LaTeX Editor",
    color: "#4caf50",
  },
];

export function searchApps(query: string): App[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return apps.filter(
    (app) =>
      app.name.toLowerCase().includes(q) ||
      app.keywords.some((kw) => kw.toLowerCase().includes(q))
  );
}

export function getFirstMatch(query: string): App | null {
  const results = searchApps(query);
  return results[0] ?? null;
}
