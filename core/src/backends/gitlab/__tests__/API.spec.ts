import API, { getMaxAccess } from '../API';

global.fetch = jest.fn().mockRejectedValue(new Error('should not call fetch inside tests'));

describe('GitLab API', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('hasWriteAccess', () => {
    test('should return true on project access_level >= 30', async () => {
      const api = new API({ repo: 'repo' });

      api.requestJSON = jest
        .fn()
        .mockResolvedValueOnce({ permissions: { project_access: { access_level: 30 } } });

      await expect(api.hasWriteAccess()).resolves.toBe(true);
    });

    test('should return false on project access_level < 30', async () => {
      const api = new API({ repo: 'repo' });

      api.requestJSON = jest
        .fn()
        .mockResolvedValueOnce({ permissions: { project_access: { access_level: 10 } } });

      await expect(api.hasWriteAccess()).resolves.toBe(false);
    });

    test('should return true on group access_level >= 30', async () => {
      const api = new API({ repo: 'repo' });

      api.requestJSON = jest
        .fn()
        .mockResolvedValueOnce({ permissions: { group_access: { access_level: 30 } } });

      await expect(api.hasWriteAccess()).resolves.toBe(true);
    });

    test('should return false on group access_level < 30', async () => {
      const api = new API({ repo: 'repo' });

      api.requestJSON = jest
        .fn()
        .mockResolvedValueOnce({ permissions: { group_access: { access_level: 10 } } });

      await expect(api.hasWriteAccess()).resolves.toBe(false);
    });

    test('should return true on shared group access_level >= 40', async () => {
      const api = new API({ repo: 'repo' });
      api.requestJSON = jest.fn().mockResolvedValueOnce({
        permissions: { project_access: null, group_access: null },
        shared_with_groups: [{ group_access_level: 10 }, { group_access_level: 40 }],
      });

      await expect(api.hasWriteAccess()).resolves.toBe(true);

      expect(api.requestJSON).toHaveBeenCalledTimes(1);
    });

    test('should return true on shared group access_level >= 30, developers can merge and push', async () => {
      const api = new API({ repo: 'repo' });

      const requestJSONMock = (api.requestJSON = jest.fn());
      requestJSONMock.mockResolvedValueOnce({
        permissions: { project_access: null, group_access: null },
        shared_with_groups: [{ group_access_level: 10 }, { group_access_level: 30 }],
      });
      requestJSONMock.mockResolvedValueOnce({
        developers_can_merge: true,
        developers_can_push: true,
      });

      await expect(api.hasWriteAccess()).resolves.toBe(true);
    });

    test('should return false on shared group access_level < 30,', async () => {
      const api = new API({ repo: 'repo' });

      const requestJSONMock = (api.requestJSON = jest.fn());
      requestJSONMock.mockResolvedValueOnce({
        permissions: { project_access: null, group_access: null },
        shared_with_groups: [{ group_access_level: 10 }, { group_access_level: 20 }],
      });
      requestJSONMock.mockResolvedValueOnce({
        developers_can_merge: true,
        developers_can_push: true,
      });

      await expect(api.hasWriteAccess()).resolves.toBe(false);
    });

    test("should return false on shared group access_level >= 30, developers can't merge", async () => {
      const api = new API({ repo: 'repo' });

      const requestJSONMock = (api.requestJSON = jest.fn());
      requestJSONMock.mockResolvedValueOnce({
        permissions: { project_access: null, group_access: null },
        shared_with_groups: [{ group_access_level: 10 }, { group_access_level: 30 }],
      });
      requestJSONMock.mockResolvedValueOnce({
        developers_can_merge: false,
        developers_can_push: true,
      });

      await expect(api.hasWriteAccess()).resolves.toBe(false);
    });

    test("should return false on shared group access_level >= 30, developers can't push", async () => {
      const api = new API({ repo: 'repo' });

      const requestJSONMock = (api.requestJSON = jest.fn());
      requestJSONMock.mockResolvedValueOnce({
        permissions: { project_access: null, group_access: null },
        shared_with_groups: [{ group_access_level: 10 }, { group_access_level: 30 }],
      });
      requestJSONMock.mockResolvedValueOnce({
        developers_can_merge: true,
        developers_can_push: false,
      });

      await expect(api.hasWriteAccess()).resolves.toBe(false);
    });

    test('should return false on shared group access_level >= 30, error getting branch', async () => {
      const api = new API({ repo: 'repo' });

      const requestJSONMock = (api.requestJSON = jest.fn());
      requestJSONMock.mockResolvedValueOnce({
        permissions: { project_access: null, group_access: null },
        shared_with_groups: [{ group_access_level: 10 }, { group_access_level: 30 }],
      });

      const error = new Error('Not Found');
      requestJSONMock.mockRejectedValue(error);

      await expect(api.hasWriteAccess()).resolves.toBe(false);

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith('Failed getting default branch', error);
    });
  });

  describe('getMaxAccess', () => {
    it('should return group with max access level', () => {
      const groups = [
        { group_access_level: 10 },
        { group_access_level: 5 },
        { group_access_level: 100 },
        { group_access_level: 1 },
      ];
      expect(getMaxAccess(groups)).toBe(groups[2]);
    });
  });
});
