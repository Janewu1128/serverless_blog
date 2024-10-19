import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useState } from 'react';
import LoginComponent from './components/Login';
import { AuthService } from './services/AuthService';
const authService = new AuthService();
function App() {
    const [userName, setUserName] = useState(undefined);
    const router = createBrowserRouter([
        {
            element: (_jsxs(_Fragment, { children: [_jsx(NavBar, { userName: userName }), _jsx(Outlet, {})] })),
            children: [
                {
                    path: "/",
                    element: _jsx("div", { children: "Hello world!" }),
                },
                {
                    path: "/login",
                    element: _jsx(LoginComponent, { authService: authService, setUserNameCb: setUserName }),
                },
                {
                    path: "/profile",
                    element: _jsx("div", { children: "Profile page" }),
                },
                {
                    path: "/createSpace",
                    element: _jsx("div", { children: "Create space page" }),
                },
                {
                    path: "/spaces",
                    element: _jsx("div", { children: "Spaces page " }),
                },
            ]
        },
    ]);
    return (_jsx("div", { className: "wrapper", children: _jsx(RouterProvider, { router: router }) }));
}
export default App;
