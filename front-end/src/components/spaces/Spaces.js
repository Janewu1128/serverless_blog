import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import SpaceComponent from "./SpaceComponent";
import { NavLink } from "react-router-dom";
export default function Spaces(props) {
    const [spaces, setSpaces] = useState();
    const [reservationText, setReservationText] = useState();
    //once rendor -> call spaces
    useEffect(() => {
        const getSpaces = async () => {
            console.log('getting spaces....');
            const spaces = await props.dataService.getSpaces();
            setSpaces(spaces);
        };
        getSpaces();
    }, []);
    async function reserveSpace(spaceId, spaceName) {
        const reservationResult = await props.dataService.reserveSpace(spaceId);
        setReservationText(`You reserved ${spaceName}, reservation id: ${reservationResult}`);
    }
    function renderSpaces() {
        if (!props.dataService.isAuthorized()) {
            return _jsx(NavLink, { to: "/login", children: "Please login" });
        }
        const rows = [];
        if (spaces) {
            for (const spaceEntry of spaces) {
                rows.push(_jsx(SpaceComponent, { id: spaceEntry.id, location: spaceEntry.location, name: spaceEntry.name, photoUrl: spaceEntry.photoUrl, reserveSpace: reserveSpace }, spaceEntry.id));
            }
        }
        return rows;
    }
    return (_jsxs("div", { children: [_jsx("h2", { children: "Welcome to the Spaces page!" }), reservationText ? _jsx("h2", { children: reservationText }) : undefined, renderSpaces()] }));
}
