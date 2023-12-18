import './NavigationDrawer.css';
export declare const classes: Record<"content" | "root", string>;
interface NavigationDrawerProps {
    mobileOpen: boolean;
    onMobileOpenToggle: () => void;
}
declare const NavigationDrawer: ({ mobileOpen, onMobileOpenToggle }: NavigationDrawerProps) => JSX.Element;
export default NavigationDrawer;
