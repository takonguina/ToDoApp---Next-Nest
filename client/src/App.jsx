import "./App.css";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/taskContext";
import AxiosErrorHandler from "./components/axiosError/AxiosErrorHandler";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <AxiosErrorHandler>
          <TaskProvider>
            <Routes>
              <Route path="/login" element={<AuthPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </TaskProvider>
        </AxiosErrorHandler>
      </AuthProvider>
    </Router>
  );
}

export default App;
