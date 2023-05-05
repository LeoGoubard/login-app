import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from './router';



const App = () => {
  return (
    <main>
      <RouterProvider router={router}>

      </RouterProvider>
    </main>
  );
}

export default App;
