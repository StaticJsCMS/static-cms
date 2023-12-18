/// <reference types="jest" />
declare const mock: {
    storage: {};
    setItem: jest.Mock<any, any, any>;
    getItem: jest.Mock<any, any, any>;
    removeItem: jest.Mock<any, any, any>;
};
export default mock;
