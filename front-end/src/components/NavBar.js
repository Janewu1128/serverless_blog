import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
export default function NavBar({ userName }) {
    function renderLoginLogout() {
        if (userName) {
            return (_jsx(NavLink, { to: "/logout", style: { float: "right" }, children: userName }));
        }
        else {
            return (_jsx(NavLink, { to: "/login", style: { float: "right" }, children: "Login" }));
        }
    }
    return (_jsxs("div", { className: "navbar", children: [_jsx(NavLink, { to: "/", children: "Home" }), _jsx(NavLink, { to: "/profile", children: "Profile" }), _jsx(NavLink, { to: "/spaces", children: "Spaces" }), _jsx(NavLink, { to: "/createSpace", children: "Create space" }), renderLoginLogout()] }));
}
