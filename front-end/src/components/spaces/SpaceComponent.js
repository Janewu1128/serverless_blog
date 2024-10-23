import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import genericImage from "../../assets/generic-photo.jpg";
import './SpaceComponent.css';
export default function SpaceComponent(props) {
    function renderImage() {
        if (props.photoUrl) {
            return _jsx("img", { src: props.photoUrl });
        }
        else {
            return _jsx("img", { src: genericImage });
        }
    }
    return (_jsxs("div", { className: "spaceComponent", children: [renderImage(), _jsx("label", { className: "name", children: props.name }), _jsx("br", {}), _jsx("label", { className: "location", children: props.location }), _jsx("br", {}), _jsx("button", { onClick: () => props.reserveSpace(props.id, props.name), children: "Reserve" })] }));
}
