import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import useToken from "./hooks/useToken";
import Login from "./auth/Login";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import MovieSeries from "./pages/MovieSeries";
import MovieSeriesDetails from "./pages/MovieSeriesDetails";
import AddMovieSeries from "./pages/AddMovieSeries";
import Franchise from "./pages/Franchise";
import Contact from "./pages/Contact";
import Logs from "./pages/Logs";
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
                <div className="d-flex flex-grow-1">
                    {token && <Sidebar />}
                    <main className="flex-grow-1 p-3">
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
                                    <Route path="/details/:id" element={<MovieSeriesDetails />} />
                                    <Route path="/addMovieSeries" element={<AddMovieSeries />} />
                                    <Route path="/franchise" element={<Franchise />} />
                                    <Route path="/query" element={<Contact />} />
                                    <Route path="/logs" element={<Logs />} />
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </>
                            )}
                        </Routes>
                    </main>
                </div>
                {token && <Footer />}
            </div>
        </>
    );
};

export default App;