import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function CreateSpace({ dataService }) {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [photo, setPhoto] = useState();
    const [actionResult, setActionResult] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (name && location) {
            const id = await dataService.createSpace(name, location, photo);
            setActionResult(`Created space with id ${id}`);
            setName('');
            setLocation('');
        }
        else {
            setActionResult('Please provide a name and a location!');
        }
    };
    function setPhotoUrl(event) {
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0]);
        }
    }
    function renderPhoto() {
        if (photo) {
            const localPhotoURL = URL.createObjectURL(photo);
            return _jsx("img", { alt: '', src: localPhotoURL, style: { maxWidth: "200px" } });
        }
    }
    function renderForm() {
        if (!dataService.isAuthorized()) {
            return _jsx(NavLink, { to: "/login", children: "Please login" });
        }
        return (_jsxs("form", { onSubmit: (e) => handleSubmit(e), children: [_jsx("label", { children: "Name:" }), _jsx("br", {}), _jsx("input", { value: name, onChange: (e) => setName(e.target.value) }), _jsx("br", {}), _jsx("label", { children: "Location:" }), _jsx("br", {}), _jsx("input", { value: location, onChange: (e) => setLocation(e.target.value) }), _jsx("br", {}), _jsx("label", { children: "Photo:" }), _jsx("br", {}), _jsx("input", { type: "file", onChange: (e) => setPhotoUrl(e) }), _jsx("br", {}), renderPhoto(), _jsx("br", {}), _jsx("input", { type: "submit", value: 'Create space' })] }));
    }
    return _jsxs("div", { children: [renderForm(), actionResult ? _jsx("h3", { children: actionResult }) : undefined] });
}
