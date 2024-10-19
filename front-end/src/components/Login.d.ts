import { AuthService } from "../services/AuthService";
type LoginProps = {
    authService: AuthService;
    setUserNameCb: (userName: string) => void;
};
export default function LoginComponent({ authService, setUserNameCb }: LoginProps): import("react/jsx-runtime").JSX.Element;
export {};
