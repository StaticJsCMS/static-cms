export interface SiteConfig {
  readonly base_url: string;
  readonly site_title: string;
  readonly site_description: string;
  readonly site_image: string;
  readonly site_keywords: string[];
}

export interface Feature {
  title: string;
  description: string;
}

export interface GetStarted {
  readonly title: string;
  readonly url: string;
}

export interface CallToAction {
  readonly title: string;
  readonly subtitle: string;
  readonly url: string;
}

export interface HomepageData {
  readonly title: string;
  readonly subtitle: string;
  readonly get_started: GetStarted
  readonly features: Feature[];
  readonly call_to_action: CallToAction;
}
