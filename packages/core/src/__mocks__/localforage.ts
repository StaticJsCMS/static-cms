/* eslint-disable @typescript-eslint/no-explicit-any */
const mock = {
  storage: {},
  setItem: jest.fn().mockImplementation(function (this: any, key: string, data: any) {
    this.storage[key] = data;
    return Promise.resolve();
  }),
  getItem: jest.fn().mockImplementation(function (this: any, key: string) {
    return Promise.resolve(this.storage[key]);
  }),
  removeItem: jest.fn().mockImplementation(function (this: any, key: string) {
    delete this.storage[key];
    return Promise.resolve();
  }),
};

export default mock;
