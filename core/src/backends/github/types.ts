type UsersGetAuthenticatedResponsePlan = {
  collaborators: number;
  name: string;
  private_repos: number;
  space: number;
};

export type GitHubUser = {
  avatar_url: string;
  bio: string;
  blog: string;
  collaborators?: number;
  company: string;
  created_at: string;
  disk_usage?: number;
  email: string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  owned_private_repos?: number;
  plan?: UsersGetAuthenticatedResponsePlan;
  private_gists?: number;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  total_private_repos?: number;
  two_factor_authentication?: boolean;
  type: string;
  updated_at: string;
  url: string;
};

export type GitCreateTreeParamsTree = {
  content?: string;
  mode?: '100644' | '100755' | '040000' | '160000' | '120000';
  path?: string;
  sha?: string;
  type?: 'blob' | 'tree' | 'commit';
};

export type GitHubAuthor = {
  date: string;
  email: string;
  name: string;
};

export type GitHubCommitter = {
  date: string;
  email: string;
  name: string;
};

type ReposListCommitsResponseItemAuthor = {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
};

type ReposListCommitsResponseItemCommitCommitter = {
  date: string;
  email: string;
  name: string;
};

type ReposListCommitsResponseItemCommitAuthor = {
  date: string;
  email: string;
  name: string;
};

type ReposListCommitsResponseItemCommitTree = { sha: string; url: string };

type ReposListCommitsResponseItemCommitVerification = {
  payload: null;
  reason: string;
  signature: null;
  verified: boolean;
};

type ReposListCommitsResponseItemCommit = {
  author: ReposListCommitsResponseItemCommitAuthor;
  comment_count: number;
  committer: ReposListCommitsResponseItemCommitCommitter;
  message: string;
  tree: ReposListCommitsResponseItemCommitTree;
  url: string;
  verification: ReposListCommitsResponseItemCommitVerification;
};

type ReposGetResponseSourcePermissions = {
  admin: boolean;
  pull: boolean;
  push: boolean;
};

type ReposGetResponseSourceOwner = {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
};

type ReposGetResponseSource = {
  allow_merge_commit: boolean;
  allow_rebase_merge: boolean;
  allow_squash_merge: boolean;
  archive_url: string;
  archived: boolean;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: string;
  default_branch: string;
  deployments_url: string;
  description: string;
  disabled: boolean;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  has_downloads: boolean;
  has_issues: boolean;
  has_pages: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  homepage: string;
  hooks_url: string;
  html_url: string;
  id: number;
  is_template: boolean;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: null;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  mirror_url: string;
  name: string;
  network_count: number;
  node_id: string;
  notifications_url: string;
  open_issues_count: number;
  owner: ReposGetResponseSourceOwner;
  permissions: ReposGetResponseSourcePermissions;
  private: boolean;
  pulls_url: string;
  pushed_at: string;
  releases_url: string;
  size: number;
  ssh_url: string;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_count: number;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  temp_clone_token: string;
  template_repository: null;
  topics: Array<string>;
  trees_url: string;
  updated_at: string;
  url: string;
  visibility: string;
  watchers_count: number;
};

type ReposGetResponseLicense = {
  key: string;
  name: string;
  node_id: string;
  spdx_id: string;
  url: string;
};

type ReposGetResponseParentPermissions = {
  admin: boolean;
  pull: boolean;
  push: boolean;
};

type ReposGetResponseParentOwner = {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
};

type ReposGetResponseParent = {
  allow_merge_commit: boolean;
  allow_rebase_merge: boolean;
  allow_squash_merge: boolean;
  archive_url: string;
  archived: boolean;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: string;
  default_branch: string;
  deployments_url: string;
  description: string;
  disabled: boolean;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  has_downloads: boolean;
  has_issues: boolean;
  has_pages: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  homepage: string;
  hooks_url: string;
  html_url: string;
  id: number;
  is_template: boolean;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: null;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  mirror_url: string;
  name: string;
  network_count: number;
  node_id: string;
  notifications_url: string;
  open_issues_count: number;
  owner: ReposGetResponseParentOwner;
  permissions: ReposGetResponseParentPermissions;
  private: boolean;
  pulls_url: string;
  pushed_at: string;
  releases_url: string;
  size: number;
  ssh_url: string;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_count: number;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  temp_clone_token: string;
  template_repository: null;
  topics: Array<string>;
  trees_url: string;
  updated_at: string;
  url: string;
  visibility: string;
  watchers_count: number;
};

type ReposGetResponseOwner = {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
};

type ReposGetResponseOrganization = {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
};

type ReposGetResponsePermissions = {
  admin: boolean;
  pull: boolean;
  push: boolean;
};

export type ReposGetResponse = {
  allow_merge_commit: boolean;
  allow_rebase_merge: boolean;
  allow_squash_merge: boolean;
  archive_url: string;
  archived: boolean;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: string;
  default_branch: string;
  deployments_url: string;
  description: string;
  disabled: boolean;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  has_downloads: boolean;
  has_issues: boolean;
  has_pages: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  homepage: string;
  hooks_url: string;
  html_url: string;
  id: number;
  is_template: boolean;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: null;
  languages_url: string;
  license: ReposGetResponseLicense;
  merges_url: string;
  milestones_url: string;
  mirror_url: string;
  name: string;
  network_count: number;
  node_id: string;
  notifications_url: string;
  open_issues_count: number;
  organization: ReposGetResponseOrganization;
  owner: ReposGetResponseOwner;
  parent: ReposGetResponseParent;
  permissions: ReposGetResponsePermissions;
  private: boolean;
  pulls_url: string;
  pushed_at: string;
  releases_url: string;
  size: number;
  source: ReposGetResponseSource;
  ssh_url: string;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_count: number;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  temp_clone_token: string;
  template_repository: null;
  topics: Array<string>;
  trees_url: string;
  updated_at: string;
  url: string;
  visibility: string;
  watchers_count: number;
};

type ReposListCommitsResponseItemCommitter = {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
};

type ReposListCommitsResponseItemParentsItem = { sha: string; url: string };

type ReposListCommitsResponseItem = {
  author: ReposListCommitsResponseItemAuthor;
  comments_url: string;
  commit: ReposListCommitsResponseItemCommit;
  committer: ReposListCommitsResponseItemCommitter;
  html_url: string;
  node_id: string;
  parents: Array<ReposListCommitsResponseItemParentsItem>;
  sha: string;
  url: string;
};

export type ReposListCommitsResponse = Array<ReposListCommitsResponseItem>;

export type GitGetBlobResponse = {
  content: string;
  encoding: string;
  sha: string;
  size: number;
  url: string;
};

type GitGetTreeResponseTreeItem = {
  mode: string;
  path: string;
  sha: string;
  size?: number;
  type: string;
  url: string;
};

export type GitGetTreeResponse = {
  sha: string;
  tree: Array<GitGetTreeResponseTreeItem>;
  truncated: boolean;
  url: string;
};

type GitCreateRefResponseObject = { sha: string; type: string; url: string };

export type GitCreateRefResponse = {
  node_id: string;
  object: GitCreateRefResponseObject;
  ref: string;
  url: string;
};

type GitUpdateRefResponseObject = { sha: string; type: string; url: string };

export type GitUpdateRefResponse = {
  node_id: string;
  object: GitUpdateRefResponseObject;
  ref: string;
  url: string;
};

type GitCreateCommitResponseVerification = {
  payload: null;
  reason: string;
  signature: null;
  verified: boolean;
};

type GitCreateCommitResponseTree = { sha: string; url: string };

type GitCreateCommitResponseParentsItem = { sha: string; url: string };

type GitCreateCommitResponseCommitter = {
  date: string;
  email: string;
  name: string;
};

type GitCreateCommitResponseAuthor = {
  date: string;
  email: string;
  name: string;
};

export type GitCreateCommitResponse = {
  author: GitCreateCommitResponseAuthor;
  committer: GitCreateCommitResponseCommitter;
  message: string;
  node_id: string;
  parents: Array<GitCreateCommitResponseParentsItem>;
  sha: string;
  tree: GitCreateCommitResponseTree;
  url: string;
  verification: GitCreateCommitResponseVerification;
};

type ReposGetBranchResponseCommitCommitVerification = {
  payload: null;
  reason: string;
  signature: null;
  verified: boolean;
};

type ReposGetBranchResponseCommitCommitTree = { sha: string; url: string };

type ReposGetBranchResponseCommitCommitCommitter = {
  date: string;
  email: string;
  name: string;
};

type ReposGetBranchResponseCommitCommitAuthor = {
  date: string;
  email: string;
  name: string;
};

type ReposGetBranchResponseCommitCommit = {
  author: ReposGetBranchResponseCommitCommitAuthor;
  committer: ReposGetBranchResponseCommitCommitCommitter;
  message: string;
  tree: ReposGetBranchResponseCommitCommitTree;
  url: string;
  verification: ReposGetBranchResponseCommitCommitVerification;
};

type ReposGetBranchResponseCommitAuthor = {
  avatar_url: string;
  gravatar_id: string;
  id: number;
  login: string;
  url: string;
};

type ReposGetBranchResponseCommitCommitter = {
  avatar_url: string;
  gravatar_id: string;
  id: number;
  login: string;
  url: string;
};

type ReposGetBranchResponseCommitParentsItem = { sha: string; url: string };

type ReposGetBranchResponseCommit = {
  author: ReposGetBranchResponseCommitAuthor;
  commit: ReposGetBranchResponseCommitCommit;
  committer: ReposGetBranchResponseCommitCommitter;
  node_id: string;
  parents: Array<ReposGetBranchResponseCommitParentsItem>;
  sha: string;
  url: string;
};

type ReposGetBranchResponseLinks = { html: string; self: string };

type ReposGetBranchResponseProtectionRequiredStatusChecks = {
  contexts: Array<string>;
  enforcement_level: string;
};

type ReposGetBranchResponseProtection = {
  enabled: boolean;
  required_status_checks: ReposGetBranchResponseProtectionRequiredStatusChecks;
};

export type ReposGetBranchResponse = {
  _links: ReposGetBranchResponseLinks;
  commit: ReposGetBranchResponseCommit;
  name: string;
  protected: boolean;
  protection: ReposGetBranchResponseProtection;
  protection_url: string;
};

type GitCreateTreeResponseTreeItem = {
  mode: string;
  path: string;
  sha: string;
  size: number;
  type: string;
  url: string;
};

export type GitCreateTreeResponse = {
  sha: string;
  tree: Array<GitCreateTreeResponseTreeItem>;
  url: string;
};
