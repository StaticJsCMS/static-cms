import type { ReactNode } from 'react';
import type { Breadcrumb, Collection } from '../interface';
import './MainView.css';
export declare const classes: Record<"body" | "root" | "show-left-nav" | "no-margin" | "no-scroll", string>;
interface MainViewProps {
    breadcrumbs?: Breadcrumb[];
    showQuickCreate?: boolean;
    navbarActions?: ReactNode;
    showLeftNav?: boolean;
    noMargin?: boolean;
    noScroll?: boolean;
    children: ReactNode;
    collection?: Collection;
}
declare const MainView: ({ children, breadcrumbs, showQuickCreate, showLeftNav, noMargin, noScroll, navbarActions, collection, }: MainViewProps) => JSX.Element;
export default MainView;
