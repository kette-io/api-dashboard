// @material-ui/icons
import ContentPaste from "@material-ui/icons/ContentPaste";
// core components/views
import TableList from "views/TableList/TableList.jsx";

const dashboardRoutes = [
  /*{
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },*/
  {
    path: "/clients",
    sidebarName: "Users",
    navbarName: "Users",
    icon: ContentPaste,
    component: TableList
  },
  {
    path: "/apiKeys",
    sidebarName: "API Keys",
    navbarName: "API Keys",
    icon: ContentPaste,
    component: TableList
  },
  { redirect: true, path: "/", to: "/apiKeys", navbarName: "Redirect" }
];

export default dashboardRoutes;
