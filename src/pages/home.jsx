import React, { Suspense } from "react";
import { Loading } from "../components/shared/Loading";
import FeatureSection from "../components/2-Feature/FeatureSection";

const HeroSection = React.lazy(() => import("../components/2-hero/Hero"));
const Services = React.lazy(() => import("../components/3-services/Services"));
const LatestWorks = React.lazy(() => import("../components/4-LatestWorks/LatestWorks"));
const Steps = React.lazy(() => import("../components/5-steps/steps"));
const About = React.lazy(() => import("../components/6-about/About"));
const Testimonials = React.lazy(() => import("../components/7-Testimonials/Testimonials"));
const LatestArticles = React.lazy(() => import("../components/10-Blog/LatestArticles"));
const Contact = React.lazy(() => import("../components/8-Contact/Contact"));

const HomePage = () => (
  <Suspense fallback={<Loading />}>
    <HeroSection />
    <FeatureSection />
    <Services />
    <LatestWorks />
    <Steps />
    <About />
    <Testimonials />
    <LatestArticles />
    <Contact />
  </Suspense>
);

export default HomePage;