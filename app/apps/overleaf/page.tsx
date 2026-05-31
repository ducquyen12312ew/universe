import OverleafTopBar from "@/components/overleaf/OverleafTopBar";
import OverleafSidebar from "@/components/overleaf/OverleafSidebar";
import BannerNotice from "@/components/overleaf/BannerNotice";
import ProjectTable from "@/components/overleaf/ProjectTable";

export default function OverleafPage() {
  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ backgroundColor: "#1b2638", color: "#c5cdd9" }}
    >
      <OverleafTopBar />

      <div className="flex flex-1 overflow-hidden">
        <OverleafSidebar />

        <main
          className="flex-1 flex flex-col overflow-hidden"
          style={{ backgroundColor: "#243044" }}
        >
          <BannerNotice />
          <ProjectTable />
        </main>
      </div>
    </div>
  );
}
