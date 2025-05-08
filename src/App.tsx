import TravelHeart from "@/scenes/TravelHeart/index";
import Layout2 from "./Layout2";
import { Route, Routes } from "react-router";
import Home from "./Home";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route
        path="travelheart/*"
        index
        element={
          <Layout2>
            <TravelHeart />
          </Layout2>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
