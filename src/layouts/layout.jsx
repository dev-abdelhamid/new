import React, { Suspense } from "react";
import { Header } from "../components/1-header/Header";
import { Loading } from "../components/shared/Loading";
import Footer  from "../components/9-Footer/Footer";

import { useTheme } from "../Context/ThemeContext";


export const MainLayout = ({ children }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div 
      className={`flex flex-col relative min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />
      <div className="min-h-screen" >
      <Suspense fallback={<Loading />}>
       {children}
      </Suspense>
      </div>
       <Footer />
    </div>
  );
};