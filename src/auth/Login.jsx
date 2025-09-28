import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { login } from "../api/movieseries";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(credentials);
            if (response.status === 200) {
                toast.success(response.data.message);
                setAuth(response.data.token, response.data.role);
                navigate("/");
            };
        } catch (error) {
            if (error.status === 400) toast.error("Server busy. Try again later.");
            else toast.error(error.message);
        } finally {
            setLoading(false);
        };
    };

    const changeCredentials = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    return (
        <main
            className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-5">
                <form onSubmit={handleLogin}>
                    <div className="h6 fw-bolder text-center">HelloHood - Admin Panel | Log In</div>
                    <hr />
                    <label className="form-label mb-0" htmlFor="email">
                        <small className="fw-bold">Email</small>
                    </label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-envelope"></i>
                        </span>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={credentials.email}
                            onChange={changeCredentials}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <label className="form-label mb-0" htmlFor="password">
                        <small className="fw-bold">Password</small>
                    </label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fa-solid fa-lock"></i>
                        </span>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={credentials.password}
                            onChange={changeCredentials}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-secondary" disabled={loading}>
                            {loading ? <i className="fa fa-spinner fa-spin"></i> : "Log In"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Login;