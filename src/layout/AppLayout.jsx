import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <div className="container px-6 py-4 mx-auto">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
