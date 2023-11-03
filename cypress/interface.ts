import type { Config } from '@staticcms/core/interface';

export interface TaskResult {
  data: SetupBackendResponse;
}

export interface SetupBackendProps {
  backend: string;
  options: Partial<Config>;
}

export interface User {
  email: string;
  password: string;
  netlifySiteURL?: string;
}

export type SetupBackendResponse = null | {
  user: User;
};

export interface SetupBackendTestProps {
  backend: string;
  testName: string;
}

export interface TeardownBackendTestProps {
  backend: string;
  testName: string;
}

export interface SeedRepoProps {
  backend: string;
}

export interface TeardownBackendProps {
  backend: string;
}

export interface Post {
  Title: string;
  Body: string;
  Description: string;
  Category: string;
  Tags: string;
}

export interface Author {
  name: string;
  description: string;
}

export interface Authors {
  authors: Author[];
}
