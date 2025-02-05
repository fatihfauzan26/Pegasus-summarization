import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // main routes
  {
    path: "/",
    element: async () => {
      const AppShell = await import("./components/layouts/main");
      return { Component: AppShell.default };
    },
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./pages/home")).default,
        }),
      },
    ],
  },
  // error routes
]);

export default router;
