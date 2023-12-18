import type { RootState } from './index';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export declare const useAppDispatch: () => AppDispatch;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
export {};
