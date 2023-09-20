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

/**
 * Editorial Workflow
 */
export type GitListMatchingRefsResponseItem = {
  node_id: string;
  object: GitListMatchingRefsResponseItemObject;
  ref: string;
  url: string;
};

export type GitListMatchingRefsResponseItemObject = {
  sha: string;
  type: string;
  url: string;
};

export type GitListMatchingRefsResponse = Array<GitListMatchingRefsResponseItem>;

export type GitHubCompareFile = ReposCompareCommitsResponseFilesItem & {
  previous_filename?: string;
};

export type GitHubCompareFiles = GitHubCompareFile[];

export type ReposCompareCommitsResponseFilesItem = {
  additions: number;
  blob_url: string;
  changes: number;
  contents_url: string;
  deletions: number;
  filename: string;
  patch: string;
  raw_url: string;
  sha: string;
  status: string;
};
type PullsListResponseItemUser = {
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
type PullsListResponseItemRequestedTeamsItem = {
  description: string;
  html_url: string;
  id: number;
  members_url: string;
  name: string;
  node_id: string;
  parent: null;
  permission: string;
  privacy: string;
  repositories_url: string;
  slug: string;
  url: string;
};
type PullsListResponseItemRequestedReviewersItem = {
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
type PullsListResponseItemMilestoneCreator = {
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
type PullsListResponseItemMilestone = {
  closed_at: string;
  closed_issues: number;
  created_at: string;
  creator: PullsListResponseItemMilestoneCreator;
  description: string;
  due_on: string;
  html_url: string;
  id: number;
  labels_url: string;
  node_id: string;
  number: number;
  open_issues: number;
  state: string;
  title: string;
  updated_at: string;
  url: string;
};
type PullsListResponseItemLabelsItem = {
  color: string;
  default: boolean;
  description: string;
  id: number;
  name: string;
  node_id: string;
  url: string;
};
type PullsListResponseItemHeadUser = {
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
type PullsListResponseItemHeadRepoPermissions = {
  admin: boolean;
  pull: boolean;
  push: boolean;
};
type PullsListResponseItemHeadRepoOwner = {
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
type PullsListResponseItemHeadRepo = {
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
  owner: PullsListResponseItemHeadRepoOwner;
  permissions: PullsListResponseItemHeadRepoPermissions;
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
type PullsListResponseItemHead = {
  label: string;
  ref: string;
  repo: PullsListResponseItemHeadRepo;
  sha: string;
  user: PullsListResponseItemHeadUser;
};
type PullsListResponseItemBaseUser = {
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
type PullsListResponseItemBaseRepoPermissions = {
  admin: boolean;
  pull: boolean;
  push: boolean;
};
type PullsListResponseItemBaseRepoOwner = {
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
type PullsListResponseItemBaseRepo = {
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
  owner: PullsListResponseItemBaseRepoOwner;
  permissions: PullsListResponseItemBaseRepoPermissions;
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
type PullsListResponseItemBase = {
  label: string;
  ref: string;
  repo: PullsListResponseItemBaseRepo;
  sha: string;
  user: PullsListResponseItemBaseUser;
};
type PullsListResponseItemAssigneesItem = {
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
type PullsListResponseItemAssignee = {
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
type PullsListResponseItemLinksStatuses = { href: string };
type PullsListResponseItemLinksSelf = { href: string };
type PullsListResponseItemLinksReviewComments = { href: string };
type PullsListResponseItemLinksReviewComment = { href: string };
type PullsListResponseItemLinksIssue = { href: string };
type PullsListResponseItemLinksHtml = { href: string };
type PullsListResponseItemLinksCommits = { href: string };
type PullsListResponseItemLinksComments = { href: string };
type PullsListResponseItemLinks = {
  comments: PullsListResponseItemLinksComments;
  commits: PullsListResponseItemLinksCommits;
  html: PullsListResponseItemLinksHtml;
  issue: PullsListResponseItemLinksIssue;
  review_comment: PullsListResponseItemLinksReviewComment;
  review_comments: PullsListResponseItemLinksReviewComments;
  self: PullsListResponseItemLinksSelf;
  statuses: PullsListResponseItemLinksStatuses;
};

export type GitHubPull = {
  _links: PullsListResponseItemLinks;
  active_lock_reason: string;
  assignee: PullsListResponseItemAssignee;
  assignees: Array<PullsListResponseItemAssigneesItem>;
  author_association: string;
  base: PullsListResponseItemBase;
  body: string;
  closed_at: string;
  comments_url: string;
  commits_url: string;
  created_at: string;
  diff_url: string;
  draft: boolean;
  head: PullsListResponseItemHead;
  html_url: string;
  id: number;
  issue_url: string;
  labels: Array<PullsListResponseItemLabelsItem>;
  locked: boolean;
  merge_commit_sha: string;
  merged_at: string;
  milestone: PullsListResponseItemMilestone;
  node_id: string;
  number: number;
  patch_url: string;
  requested_reviewers: Array<PullsListResponseItemRequestedReviewersItem>;
  requested_teams: Array<PullsListResponseItemRequestedTeamsItem>;
  review_comment_url: string;
  review_comments_url: string;
  state: string;
  statuses_url: string;
  title: string;
  updated_at: string;
  url: string;
  user: PullsListResponseItemUser;
};

export enum PullRequestState {
  Open = 'open',
  Closed = 'closed',
  All = 'all',
}

export type PullsListResponse = Array<GitHubPull>;

export type PullsGetResponseLabelsItem = {
  color: string;
  default: boolean;
  description: string;
  id: number;
  name: string;
  node_id: string;
  url: string;
};

type ReposCompareCommitsResponseMergeBaseCommitParentsItem = {
  sha: string;
  url: string;
};
type ReposCompareCommitsResponseMergeBaseCommitCommitter = {
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
type ReposCompareCommitsResponseMergeBaseCommitCommitVerification = {
  payload: null;
  reason: string;
  signature: null;
  verified: boolean;
};
type ReposCompareCommitsResponseMergeBaseCommitCommitTree = {
  sha: string;
  url: string;
};
type ReposCompareCommitsResponseMergeBaseCommitCommitCommitter = {
  date: string;
  email: string;
  name: string;
};
type ReposCompareCommitsResponseMergeBaseCommitCommitAuthor = {
  date: string;
  email: string;
  name: string;
};
type ReposCompareCommitsResponseMergeBaseCommitCommit = {
  author: ReposCompareCommitsResponseMergeBaseCommitCommitAuthor;
  comment_count: number;
  committer: ReposCompareCommitsResponseMergeBaseCommitCommitCommitter;
  message: string;
  tree: ReposCompareCommitsResponseMergeBaseCommitCommitTree;
  url: string;
  verification: ReposCompareCommitsResponseMergeBaseCommitCommitVerification;
};
type ReposCompareCommitsResponseMergeBaseCommitAuthor = {
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
type ReposCompareCommitsResponseMergeBaseCommit = {
  author: ReposCompareCommitsResponseMergeBaseCommitAuthor;
  comments_url: string;
  commit: ReposCompareCommitsResponseMergeBaseCommitCommit;
  committer: ReposCompareCommitsResponseMergeBaseCommitCommitter;
  html_url: string;
  node_id: string;
  parents: Array<ReposCompareCommitsResponseMergeBaseCommitParentsItem>;
  sha: string;
  url: string;
};
type ReposCompareCommitsResponseCommitsItemParentsItem = {
  sha: string;
  url: string;
};
type ReposCompareCommitsResponseCommitsItemCommitter = {
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
type ReposCompareCommitsResponseCommitsItemCommitVerification = {
  payload: null;
  reason: string;
  signature: null;
  verified: boolean;
};
type ReposCompareCommitsResponseCommitsItemCommitTree = {
  sha: string;
  url: string;
};
type ReposCompareCommitsResponseCommitsItemCommitCommitter = {
  date: string;
  email: string;
  name: string;
};
type ReposCompareCommitsResponseCommitsItemCommitAuthor = {
  date: string;
  email: string;
  name: string;
};
type ReposCompareCommitsResponseCommitsItemCommit = {
  author: ReposCompareCommitsResponseCommitsItemCommitAuthor;
  comment_count: number;
  committer: ReposCompareCommitsResponseCommitsItemCommitCommitter;
  message: string;
  tree: ReposCompareCommitsResponseCommitsItemCommitTree;
  url: string;
  verification: ReposCompareCommitsResponseCommitsItemCommitVerification;
};
type ReposCompareCommitsResponseCommitsItemAuthor = {
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
type ReposCompareCommitsResponseCommitsItem = {
  author: ReposCompareCommitsResponseCommitsItemAuthor;
  comments_url: string;
  commit: ReposCompareCommitsResponseCommitsItemCommit;
  committer: ReposCompareCommitsResponseCommitsItemCommitter;
  html_url: string;
  node_id: string;
  parents: Array<ReposCompareCommitsResponseCommitsItemParentsItem>;
  sha: string;
  url: string;
};
type ReposCompareCommitsResponseBaseCommitParentsItem = {
  sha: string;
  url: string;
};
type ReposCompareCommitsResponseBaseCommitCommitter = {
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
type ReposCompareCommitsResponseBaseCommitCommitVerification = {
  payload: null;
  reason: string;
  signature: null;
  verified: boolean;
};
type ReposCompareCommitsResponseBaseCommitCommitTree = {
  sha: string;
  url: string;
};
type ReposCompareCommitsResponseBaseCommitCommitCommitter = {
  date: string;
  email: string;
  name: string;
};
type ReposCompareCommitsResponseBaseCommitCommitAuthor = {
  date: string;
  email: string;
  name: string;
};
type ReposCompareCommitsResponseBaseCommitCommit = {
  author: ReposCompareCommitsResponseBaseCommitCommitAuthor;
  comment_count: number;
  committer: ReposCompareCommitsResponseBaseCommitCommitCommitter;
  message: string;
  tree: ReposCompareCommitsResponseBaseCommitCommitTree;
  url: string;
  verification: ReposCompareCommitsResponseBaseCommitCommitVerification;
};
type ReposCompareCommitsResponseBaseCommitAuthor = {
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
type ReposCompareCommitsResponseBaseCommit = {
  author: ReposCompareCommitsResponseBaseCommitAuthor;
  comments_url: string;
  commit: ReposCompareCommitsResponseBaseCommitCommit;
  committer: ReposCompareCommitsResponseBaseCommitCommitter;
  html_url: string;
  node_id: string;
  parents: Array<ReposCompareCommitsResponseBaseCommitParentsItem>;
  sha: string;
  url: string;
};
export type ReposCompareCommitsResponse = {
  ahead_by: number;
  base_commit: ReposCompareCommitsResponseBaseCommit;
  behind_by: number;
  commits: Array<ReposCompareCommitsResponseCommitsItem>;
  diff_url: string;
  files: Array<ReposCompareCommitsResponseFilesItem>;
  html_url: string;
  merge_base_commit: ReposCompareCommitsResponseMergeBaseCommit;
  patch_url: string;
  permalink_url: string;
  status: string;
  total_commits: number;
  url: string;
};

export type PullsMergeResponse = { merged: boolean; message: string; sha: string };

export type PullsUpdateBranchResponse = { message: string; url: string };

type PullsCreateResponseUser = {
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
type PullsCreateResponseRequestedTeamsItem = {
  description: string;
  html_url: string;
  id: number;
  members_url: string;
  name: string;
  node_id: string;
  parent: null;
  permission: string;
  privacy: string;
  repositories_url: string;
  slug: string;
  url: string;
};
type PullsCreateResponseRequestedReviewersItem = {
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
type PullsCreateResponseMilestoneCreator = {
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
type PullsCreateResponseMilestone = {
  closed_at: string;
  closed_issues: number;
  created_at: string;
  creator: PullsCreateResponseMilestoneCreator;
  description: string;
  due_on: string;
  html_url: string;
  id: number;
  labels_url: string;
  node_id: string;
  number: number;
  open_issues: number;
  state: string;
  title: string;
  updated_at: string;
  url: string;
};
type PullsCreateResponseMergedBy = {
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
type PullsCreateResponseLabelsItem = {
  color: string;
  default: boolean;
  description: string;
  id: number;
  name: string;
  node_id: string;
  url: string;
};
type PullsCreateResponseHeadUser = {
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
type PullsCreateResponseHeadRepoPermissions = {
  admin: boolean;
  pull: boolean;
  push: boolean;
};
type PullsCreateResponseHeadRepoOwner = {
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
type PullsCreateResponseHeadRepo = {
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
  owner: PullsCreateResponseHeadRepoOwner;
  permissions: PullsCreateResponseHeadRepoPermissions;
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
type PullsCreateResponseHead = {
  label: string;
  ref: string;
  repo: PullsCreateResponseHeadRepo;
  sha: string;
  user: PullsCreateResponseHeadUser;
};
type PullsCreateResponseBaseUser = {
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
type PullsCreateResponseBaseRepoPermissions = {
  admin: boolean;
  pull: boolean;
  push: boolean;
};
type PullsCreateResponseBaseRepoOwner = {
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
type PullsCreateResponseBaseRepo = {
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
  owner: PullsCreateResponseBaseRepoOwner;
  permissions: PullsCreateResponseBaseRepoPermissions;
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
type PullsCreateResponseBase = {
  label: string;
  ref: string;
  repo: PullsCreateResponseBaseRepo;
  sha: string;
  user: PullsCreateResponseBaseUser;
};
type PullsCreateResponseAssigneesItem = {
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
type PullsCreateResponseAssignee = {
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
type PullsCreateResponseLinksStatuses = { href: string };
type PullsCreateResponseLinksSelf = { href: string };
type PullsCreateResponseLinksReviewComments = { href: string };
type PullsCreateResponseLinksReviewComment = { href: string };
type PullsCreateResponseLinksIssue = { href: string };
type PullsCreateResponseLinksHtml = { href: string };
type PullsCreateResponseLinksCommits = { href: string };
type PullsCreateResponseLinksComments = { href: string };
type PullsCreateResponseLinks = {
  comments: PullsCreateResponseLinksComments;
  commits: PullsCreateResponseLinksCommits;
  html: PullsCreateResponseLinksHtml;
  issue: PullsCreateResponseLinksIssue;
  review_comment: PullsCreateResponseLinksReviewComment;
  review_comments: PullsCreateResponseLinksReviewComments;
  self: PullsCreateResponseLinksSelf;
  statuses: PullsCreateResponseLinksStatuses;
};
export type PullsCreateResponse = {
  _links: PullsCreateResponseLinks;
  active_lock_reason: string;
  additions: number;
  assignee: PullsCreateResponseAssignee;
  assignees: Array<PullsCreateResponseAssigneesItem>;
  author_association: string;
  base: PullsCreateResponseBase;
  body: string;
  changed_files: number;
  closed_at: string;
  comments: number;
  comments_url: string;
  commits: number;
  commits_url: string;
  created_at: string;
  deletions: number;
  diff_url: string;
  draft: boolean;
  head: PullsCreateResponseHead;
  html_url: string;
  id: number;
  issue_url: string;
  labels: Array<PullsCreateResponseLabelsItem>;
  locked: boolean;
  maintainer_can_modify: boolean;
  merge_commit_sha: string;
  mergeable: boolean;
  mergeable_state: string;
  merged: boolean;
  merged_at: string;
  merged_by: PullsCreateResponseMergedBy;
  milestone: PullsCreateResponseMilestone;
  node_id: string;
  number: number;
  patch_url: string;
  rebaseable: boolean;
  requested_reviewers: Array<PullsCreateResponseRequestedReviewersItem>;
  requested_teams: Array<PullsCreateResponseRequestedTeamsItem>;
  review_comment_url: string;
  review_comments: number;
  review_comments_url: string;
  state: string;
  statuses_url: string;
  title: string;
  updated_at: string;
  url: string;
  user: PullsCreateResponseUser;
};

export enum GitHubCommitStatusState {
  Error = 'error',
  Failure = 'failure',
  Pending = 'pending',
  Success = 'success',
}

type ReposListStatusesForRefResponseItemCreator = {
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

type ReposListStatusesForRefResponseItem = {
  avatar_url: string;
  context: string;
  created_at: string;
  creator: ReposListStatusesForRefResponseItemCreator;
  description: string;
  id: number;
  node_id: string;
  state: string;
  target_url: string;
  updated_at: string;
  url: string;
};

export type GitHubCommitStatus = ReposListStatusesForRefResponseItem & {
  state: GitHubCommitStatusState;
};

export interface TreeFile {
  type: 'blob' | 'tree';
  sha: string;
  path: string;
  raw?: string;
}

export type GitHubCompareCommit = ReposCompareCommitsResponseCommitsItem;
export type GitHubCompareCommits = GitHubCompareCommit[];
