import type { FC } from 'react';
export interface CodeBlockFrameProps {
    id: string;
    lang?: string;
    code: string;
    theme: 'dark' | 'light';
}
declare const CodeBlockFrame: FC<CodeBlockFrameProps>;
export default CodeBlockFrame;
