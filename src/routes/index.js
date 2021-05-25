import asyncComponentLoader from "utils/asyncComponentLoader";

const routes = [
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/Welcome")),
    path: "/identification",
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/IdentificationPage")),
    path: "/identification/:animalType",
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/CandidatesPage")),
    path: "/candidates",
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/LoginPage")),
    path: "/",
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/Page4")),
    path: "/page-4",
  },
  {
    component: asyncComponentLoader(() => import("components/NotFound")),
  },
];

export default routes;
