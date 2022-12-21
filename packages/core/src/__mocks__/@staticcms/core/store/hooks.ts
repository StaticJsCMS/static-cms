/* eslint-disable import/prefer-default-export */
const mockDisplatch = jest.fn();
export const useAppDispatch = jest.fn().mockReturnValue(mockDisplatch);
export const useAppSelector = jest.fn();
