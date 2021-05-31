import asyncComponentLoader from "utils/asyncComponentLoader";

const routes = [
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/Welcome")),
    path: "/identification",
  },
  {
    exact: true,
    component: asyncComponentLoader(() =>
      import("pages/AvesIdentificationPage")
    ),
    path: "/identification/aves",
  },
  // {
  //   exact: true,
  //   component: asyncComponentLoader(() => import("pages/AvesCandidatesPage")),
  //   path: "/identification/aves/:queryParams",
  // },
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/AvesResultPage")),
    path: "/identification/aves/:aves_id",
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
