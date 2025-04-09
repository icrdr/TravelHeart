import TravelHeart from "@/scenes/TravelHeart/index";
import { Route, Routes } from "react-router";
import BloodFlow from "@/scenes/BloodFlow";
import ErrorPage from "@/404";
import Layout from "@/Layout";
import UnderDev from "@/components/UnderDev";
import Layout2 from "./Layout2";

function App() {
  return (
    <Layout2>
      <TravelHeart />
    </Layout2>
    // <Routes>
    //   <Route element={<Layout />}>
    //     <Route path="/" element={<TravelHeart />} />
    //     <Route path="travelheart" element={<TravelHeart />} />
    //     <Route path="travelheart/ca" element={<TravelHeart />} />
    //     <Route path="bloodflow" element={<BloodFlow />} />
    //     <Route path="valve" element={<UnderDev />} />
    //     <Route path="heartbeat" element={<UnderDev />} />
    //   </Route>
    //   <Route path="*" element={<ErrorPage />} />
    // </Routes>
  );
}

export default App;
