export interface OverleafProject {
  id: string;
  title: string;
  owner: string;
  lastModified: string;
  isLinked?: boolean;
  route?: string;
}

export const overleafProjects: OverleafProject[] = [
  {
    id: "datn-phan-duc-quyen",
    title: "ĐATN_PhanDucQuyen",
    owner: "You",
    lastModified: "an hour ago by You",
    route: "/apps/overleaf/editor",
  },
  {
    id: "datn",
    title: "DATN",
    owner: "You",
    lastModified: "13 days ago by You",
  },
  {
    id: "it1110e",
    title: "it1110e",
    owner: "You",
    lastModified: "2 months ago by You",
  },
  {
    id: "test-1",
    title: "test",
    owner: "You",
    lastModified: "2 months ago by You",
  },
  {
    id: "kpll",
    title: "kpll",
    owner: "You",
    lastModified: "2 months ago by You",
  },
  {
    id: "gr2",
    title: "gr2",
    owner: "You",
    lastModified: "2 months ago by You",
  },
  {
    id: "soict-template",
    title: "SOICT_DATN_Application_VIE_Template",
    owner: "",
    lastModified: "2 months ago",
    isLinked: true,
  },
  {
    id: "kpl",
    title: "kpl",
    owner: "Minh Nguyễn Đức",
    lastModified: "5 months ago by You",
  },
  {
    id: "baocao",
    title: "baocao",
    owner: "You",
    lastModified: "10 months ago by You",
  },
  {
    id: "nihon",
    title: "nihon",
    owner: "You",
    lastModified: "a year ago by You",
  },
  {
    id: "test-2",
    title: "test",
    owner: "You",
    lastModified: "3 years ago by You",
  },
  {
    id: "h",
    title: "H",
    owner: "You",
    lastModified: "4 years ago by You",
  },
];
