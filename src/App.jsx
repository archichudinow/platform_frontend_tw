import AppNavBar from "./components/AppNavBar";
import TodoPageMain from "./components/TodoPageMain";
import TodoPageCollection from "./components/TodoPageCollection";
import MasonryGrid from "./components/MasonryGrid";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {

  return (
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <div className="bg-background text-primary min-h-screen flex flex-col">
        <div className="sm:mx-4 md:mx-8 lg:mx-auto lg:max-w-4xl flex flex-col grow shrink-0 lg:min-w-4xl min-w-[320px]" >

          {/* Header */}
          <div><AppNavBar /></div>

          {/* Main */}
          <div className="grow">
            <Routes>
              <Route path="/" element={<TodoPageMain />}></Route>
              <Route path="/collection" element={<TodoPageCollection />}></Route>
              <Route path="/grid" element={<MasonryGrid />}></Route>
            </Routes>
          </div>


          {/* Footer */}
          <div></div>

        </div>
        </div>
        </BrowserRouter>
        </QueryClientProvider>
  )
}

export default App
