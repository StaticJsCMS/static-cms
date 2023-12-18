import type { Collections } from '@staticcms/core/interface';
interface EditorRouteProps {
    newRecord?: boolean;
    collections: Collections;
}
declare const EditorRoute: ({ newRecord, collections }: EditorRouteProps) => JSX.Element;
export default EditorRoute;
