import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { LanguageRouter } from "./i18n/LanguageRouter";
import { MainLayout } from "./layouts/layout";
import { Loading } from "./components/shared/Loading";
import  HomePage  from "./pages/home";
// Lazy loaded components
const Gallery = React.lazy(() => import("./components/4-LatestWorks/Gallery"));
const AboutUsPage = React.lazy(() => import("./components/6-about/AboutUs"));
const BlogPage = React.lazy(() => import("./components/10-Blog/BlogPage"));
const BlogDetail = React.lazy(() => import("./components/10-Blog/BlogDetail"));
const ProjectDetails = React.lazy(() => import("./components/4-LatestWorks/ProjectDetails"));
const ServiceDetails = React.lazy(() => import("./components/3-services/ServiceDetails"));
const AllServicesPage = React.lazy(() => import("./components/3-services/AllServices"));
const Services = React.lazy(() => import("./components/3-services/Services"));

// Config imports
import "./i18n";
import "./index.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const routes = [
  { path: "/:lang", Component: HomePage },
  { path: "/:lang/gallery", Component: Gallery },
  { path: "/:lang/about", Component: AboutUsPage },
  { path: "/:lang/blog", Component: BlogPage },
  { path: "/:lang/blog/:slug", Component: BlogDetail },
  { path: "/:lang/project/:id", Component: ProjectDetails },
  { path: "/:lang/services/:id", Component: ServiceDetails },
  { path: "/:lang/all-services", Component: AllServicesPage },
  { path: "/:lang/services/web", Component: Services },
  { path: "/:lang/services/mobile", Component: Services },
  { path: "/:lang/services/custom", Component: Services },
  { path: "/:lang/services/ui", Component: Services },
  { path: "/:lang/services/ai", Component: Services },
  { path: "/:lang/services/marketing", Component: Services }
];



export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageRouter>
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <MainLayout>
                    <Suspense fallback={<Loading />}>
                      <Component />
                    </Suspense>
                  </MainLayout>
                }
              />
            ))}
            <Route
              path="*"
              element={
                <MainLayout>
                  <Suspense fallback={<Loading />}>
                  </Suspense>
                </MainLayout>
              }
            />
          </Routes>
        </LanguageRouter>
      </ThemeProvider>
    </Router>
  );
}