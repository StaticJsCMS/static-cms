import './Loader.css';
export declare const classes: Record<"root", string>;
export interface LoaderProps {
    children: string | string[] | undefined;
}
declare const Loader: ({ children }: LoaderProps) => JSX.Element;
export default Loader;
