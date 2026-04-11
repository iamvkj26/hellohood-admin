import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import useToken from "./hooks/useToken";
import Login from "./auth/Login";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import MovieSeries from "./pages/MovieSeries";
import AddMovieSeries from "./pages/AddMovieSeries";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {

    const token = useToken();

    return (
        <>
            <ScrollToTop />
            <div className="d-flex flex-column min-vh-100">
                <Toaster position="top-right" toastOptions={{ duration: 3000, style: { fontSize: "16px" } }} />
                {token && <Navbar />}
                <main className="flex-grow-1">
                    <Routes>
                        {!token ? (
                            <>
                                <Route path="/login" element={<Login />} />
                                <Route path="*" element={<Navigate to="/login" replace />} />
                            </>
                        ) : (
                            <>

                                <Route path="/" element={<Dashboard />} />
                                <Route path="/movieSeries" element={<MovieSeries />} />
                                <Route path="/addMovieSeries" element={<AddMovieSeries />} />
                                <Route path="/query" element={<Contact />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </>
                        )}
                    </Routes>
                </main>
                {token && <Footer />}
            </div>
        </>
    );
};

export default App;