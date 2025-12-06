
import "./index.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";

const AppContent = () => {
  const { user } = useAuthContext();

  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">
        <AppRouter />
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
