import type { GrayMatterFile } from 'gray-matter';

export interface FileMatter {
  readonly fileName: string;
  readonly fullPath: string;
  readonly matterResult: GrayMatterFile<string>;
}

export interface FooterLink {
  readonly text: string;
  readonly url: string;
}

export interface SiteConfig {
  readonly base_url: string;
  readonly repo_url: string;
  readonly site_title: string;
  readonly site_description: string;
  readonly site_image: string;
  readonly site_keywords: string[];
  readonly footer: {
    buttons: FooterLink[];
    links: FooterLink[];
  };
}

export interface Overview {
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
  readonly button_text: string;
  readonly url: string;
}

export interface FeatureIntro {
  title: string;
  subtitle1: string;
  subtitle2: string;
}

export interface Feature {
  title: string;
  description: string;
  image: string;
}

export interface HomepageData {
  readonly title: string;
  readonly subtitle: string;
  readonly get_started: GetStarted;
  readonly overviews: Overview[];
  readonly features_intro: FeatureIntro;
  readonly features: Feature[];
  readonly call_to_action: CallToAction;
}

export interface Release {
  readonly date: string;
  readonly version: string;
  readonly description: string;
}

export interface DocsData {
  readonly group: string;
  readonly title: string;
  readonly weight: number;
  readonly slug: string;
}

export interface DocsPage {
  readonly fullPath: string;
  readonly summary: string;
  readonly content: string;
  readonly data: DocsData;
}
