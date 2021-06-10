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
  {
    exact: true,
    component: asyncComponentLoader(() =>
      import("pages/HerpetoIdentificationPage")
    ),
    path: "/identification/herpetofauna",
  },
  {
    exact: true,
    component: asyncComponentLoader(() =>
      import("pages/MammalsIdentificationPage")
    ),
    path: "/identification/mammals",
  },

  // {
  //   exact: true,
  //   component: asyncComponentLoader(() => import("pages/AvesCandidatesPage")),
  //   path: "/identification/aves/:queryParams",
  // },
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/LoginPage")),
    path: "/",
  },
  {
    component: asyncComponentLoader(() => import("components/NotFound")),
  },
];

export default routes;
