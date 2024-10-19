import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Navigate } from "react-router-dom";
export default function LoginComponent({ authService, setUserNameCb }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userName && password) {
            const loginResponse = await authService.login(userName, password);
            const userName2 = authService.getUserName();
            if (userName2) {
                setUserNameCb(userName2);
            }
            if (loginResponse) {
                setLoginSuccess(true);
            }
            else {
                setErrorMessage("invalid credentials");
            }
        }
        else {
            setErrorMessage("UserName and password required!");
        }
    };
    function renderLoginResult() {
        if (errorMessage) {
            return _jsx("label", { children: errorMessage });
        }
    }
    return (_jsxs("div", { role: "main", children: [loginSuccess && _jsx(Navigate, { to: "/profile", replace: true }), _jsx("h2", { children: "Please login" }), _jsxs("form", { onSubmit: (e) => handleSubmit(e), children: [_jsx("label", { children: "User name" }), _jsx("input", { value: userName, onChange: (e) => setUserName(e.target.value) }), _jsx("br", {}), _jsx("label", { children: "Password" }), _jsx("input", { value: password, onChange: (e) => setPassword(e.target.value), type: "password" }), _jsx("br", {}), _jsx("input", { type: "submit", value: "Login" })] }), _jsx("br", {}), renderLoginResult()] }));
}
