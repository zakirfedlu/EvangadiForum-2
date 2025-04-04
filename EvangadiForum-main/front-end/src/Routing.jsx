import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/HomePage/Home";
import AskQuestion from "./components/AskQuestionPage/AskQuestion";
import QuestionDetail from "./components/QuestionDetail/QuestionDetail";
import ProtectedRoutes from "./components/Util/ProtectedRoutes";
import HowItWorks from "./components/HowItWork/HowItWorks";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />

        {/* Wrap protected routes inside ProtectedRoutes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/askQuestion/:id" element={<QuestionDetail />} />
          <Route path="/askQuestion" element={<AskQuestion />} />
        </Route>
        <Route path="/howItWorks" element={<HowItWorks />} />
      </Routes>
    </Router>
  );
};

export default Routing;
