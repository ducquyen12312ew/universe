export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  extension?: string;
  children?: FileNode[];
  isOpen?: boolean;
  isActive?: boolean;
}

export interface OutlineNode {
  id: string;
  title: string;
  level: 1 | 2 | 3;
  isActive?: boolean;
}

export const fileTreeData: FileNode[] = [
  {
    id: "diagrams",
    name: "diagrams",
    type: "folder",
    isOpen: true,
    children: [
      { id: "package_diagram", name: "package_diagram.png", type: "file", extension: "png" },
      { id: "phanra", name: "phanra.png", type: "file", extension: "png" },
      { id: "usecase_config", name: "usecase_config.png", type: "file", extension: "png" },
      { id: "usecase_lookup", name: "usecase_lookup.png", type: "file", extension: "png" },
      { id: "usecase_notifications", name: "usecase_notifications.png", type: "file", extension: "png" },
      { id: "usecase_overview", name: "usecase_overview.png", type: "file", extension: "png" },
      { id: "usecase_registration", name: "usecase_registration.png", type: "file", extension: "png" },
      { id: "usecase_rooms", name: "usecase_rooms.png", type: "file", extension: "png" },
      { id: "usecase_simulation", name: "usecase_simulation.png", type: "file", extension: "png" },
    ],
  },
  {
    id: "image",
    name: "image",
    type: "folder",
    isOpen: false,
    children: [],
  },
  {
    id: "main-tex",
    name: "main.tex",
    type: "file",
    extension: "tex",
    isActive: true,
  },
];

export const fileOutlineData: OutlineNode[] = [
  { id: "o1", title: "2.2.2 Biểu đồ Use Case phân ra", level: 3 },
  { id: "o2", title: "2.2.3 Quy trình nghiệp vụ", level: 3 },
  { id: "o3", title: "Đặc tả chức năng", level: 2 },
  { id: "o4", title: "Use Case 1: Đăng ký ở và nộp minh...", level: 3 },
  { id: "o5", title: "Use Case 2: Cấu hình chính sách và ...", level: 3 },
  { id: "o6", title: "Use Case 3: Chạy mô phỏng và thư...", level: 3 },
  { id: "o7", title: "Use Case 4: Tra cứu kết quả, khiếu ...", level: 3 },
  { id: "o8", title: "Use Case 5: Quản lý danh sách phò...", level: 3 },
  { id: "o9", title: "Use Case 6: Thông báo thời gian th...", level: 3 },
  { id: "o10", title: "Yêu cầu phi chức năng", level: 2 },
  { id: "o11", title: "CÔNG NGHỆ VÀ KIẾN TRÚC HỆ THỐNG", level: 1, isActive: true },
  { id: "o12", title: "Công nghệ backend", level: 2 },
  { id: "o13", title: "Công nghệ frontend", level: 2 },
  { id: "o14", title: "Cơ sở dữ liệu", level: 2 },
  { id: "o15", title: "Xác thực và bảo mật", level: 2 },
];
