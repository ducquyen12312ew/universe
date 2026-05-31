import EditorTopBar from "@/components/editor/EditorTopBar";
import FileTree from "@/components/editor/FileTree";
import CodeEditor from "@/components/editor/CodeEditor";
import PdfPreview from "@/components/editor/PdfPreview";

export default function EditorPage() {
  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ backgroundColor: "#1b2638" }}
    >
      <EditorTopBar projectName="ĐATN_PhanDucQuyen" />

      <div className="flex flex-1 overflow-hidden">
        <FileTree />
        <CodeEditor />
        <PdfPreview />
      </div>
    </div>
  );
}
