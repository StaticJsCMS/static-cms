export type GiteaUser = {
  active: boolean;
  avatar_url: string;
  created: string;
  description: string;
  email: string;
  followers_count: number;
  following_count: number;
  full_name: string;
  id: number;
  is_admin: boolean;
  language: string;
  last_login: string;
  location: string;
  login: string;
  login_name?: string;
  prohibit_login: boolean;
  restricted: boolean;
  starred_repos_count: number;
  visibility: string;
  website: string;
};

export type Team = {
  can_create_org_repo: boolean;
  description: string;
  id: number;
  includes_all_repositories: boolean;
  name: string;
  organization: Organization;
  permission: string;
  units: Array<string>;
  units_map: Map<string, string>;
};

export type Organization = {
  avatar_url: string;
  description: string;
  full_name: string;
  id: number;
  location: string;
  name: string;
  repo_admin_change_team_access: boolean;
  username: string;
  visibility: string;
  website: string;
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

type ReposListCommitsResponseItemCommitUser = {
  date: string;
  email: string;
  name: string;
};

type ReposListCommitsResponseItemCommitMeta = { 
  created: string;
  sha: string; 
  url: string
};

type ReposListCommitsResponsePayloadUser = {
  email: string;
  name: string;
  username: string;
};

type ReposListCommitsResponsePayloadCommitVerification = {
  payload: string;
  reason: string;
  signature: string;
  signer: ReposListCommitsResponsePayloadUser;
  verified: boolean;
};

type ReposListCommitsResponseItemCommit = {
  author: ReposListCommitsResponseItemCommitUser;
  committer: ReposListCommitsResponseItemCommitUser;
  message: string;
  tree: ReposListCommitsResponseItemCommitMeta;
  url: string;
  verification: ReposListCommitsResponsePayloadCommitVerification;
};

type ReposGetResponsePermissions = {
  admin: boolean;
  pull: boolean;
  push: boolean;
};

type ReposGetResponseExternalTracker = {
  external_tracker_format: string;
  external_tracker_regexp_pattern: string;
  external_tracker_style: string;
  external_tracker_url: string;
};

type ReposGetResponseExternalWiki = {
  external_wiki_url: string;
};

type ReposGetResponseInternalTracker = {
  allow_only_contributors_to_track_time: boolean;
  enable_issue_dependencies: boolean;
  enable_time_tracker: boolean;
};

type ReposGetResponseRepoTransfer = {
  description: string;
  doer: GiteaUser;
  recipient: GiteaUser;
  teams: Array<Team>;
  enable_issue_dependencies: boolean;
  enable_time_tracker: boolean;
};

export type ReposGetResponse = {
  allow_merge_commits: boolean;
  allow_rebase: boolean;
  allow_rebase_explicit: boolean;
  allow_rebase_update: boolean;
  allow_squash_merge: boolean;
  archived: boolean;
  avatar_url: string;
  clone_url: string;
  created_at: string;
  default_branch: string;
  default_delete_branch_after_merge: boolean;
  default_merge_style: boolean;
  description: string;
  empty: boolean;
  external_tracker: ReposGetResponseExternalTracker;
  external_wiki:ReposGetResponseExternalWiki;
  fork: boolean;
  forks_count: number;
  full_name: string;
  has_issues: boolean;
  has_projects: boolean;
  has_pull_requests: boolean;
  has_wiki: boolean;
  html_url: string;
  id: number;
  ignore_whitespace_conflicts: boolean;
  internal: boolean;
  internal_tracker: ReposGetResponseInternalTracker;
  language: string;
  languages_url: string;
  mirror: boolean;
  mirror_interval: string;
  mirror_updated: string;
  name: string;
  open_issues_count: number;
  open_pr_counter: number;
  original_url: string;
  owner: GiteaUser;
  parent: null;
  permissions: ReposGetResponsePermissions;
  private: boolean;
  release_counter: number;
  repo_transfer: ReposGetResponseRepoTransfer;
  size: number;
  ssh_url: string;
  stars_count: number;
  template: boolean;
  updated_at: string;
  watchers_count: number;
  website: string;
};

type ReposListCommitsResponseItemCommitAffectedFiles = {
  filename: string;
};

type ReposListCommitsResponseItemCommitStats = {
  additions: number;
  deletions: number;
  total: number;
};

type ReposListCommitsResponseItem = {
  author: GiteaUser;
  commit: ReposListCommitsResponseItemCommit;
  committer: GiteaUser;
  created: string;
  files: Array<ReposListCommitsResponseItemCommitAffectedFiles>
  html_url: string;
  parents: Array<ReposListCommitsResponseItemCommitMeta>;
  sha: string;
  stats: ReposListCommitsResponseItemCommitStats;
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
  page: number;
  sha: string;
  total_count: number;
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

type ReposGetBranchResponsePayloadCommit = {
  added: Array<string>;
  author: ReposListCommitsResponsePayloadUser;
  committer: ReposListCommitsResponsePayloadUser;
  id: string;
  message: string;
  modified: Array<string>;
  removed: Array<string>;
  timestamp: string;
  url: string;
  verification: ReposListCommitsResponsePayloadCommitVerification;
};


export type ReposGetBranchResponse = {
  commit: ReposGetBranchResponsePayloadCommit;
  effective_branch_protection_name: string;
  enable_status_check: boolean;
  name: string;
  protected: boolean;
  required_approvals: number;
  status_check_contexts: Array<string>;
  user_can_merge: boolean;
  user_can_push: boolean;
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
