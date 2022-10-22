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

export interface HomepageData {
  readonly features: Feature[];
}
