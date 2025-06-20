import { InjectionToken, Provider } from '@angular/core';

/**
 * @param apiEndpoint - required
 * @param forceCreation - True to create a new element without checking whether one already exists.
 */
export interface AngularMetaConfig {
  apiEndpoint: string;
  forceCreation?: boolean;
}
export const ANGULAR_META_CONFIG = new InjectionToken<AngularMetaConfig>(
  'ANGULAR_META_CONFIG'
);

interface LinkTag {
  href?: string;
  rel?: string;
  type?: string;
  title?: string;
  media?: string;
}

interface MetaTag {
  charset?: string;
  content?: string;
  httpEquiv?: string;
  id?: string;
  itemprop?: string;
  name?: string;
  property?: string;
  scheme?: string;
  url?: string;
}

type DataTag = LinkTag | MetaTag;

export interface AngularMetaData {
  title: string;
  meta: Array<DataTag>;
  schema: any;
}

export function provideAngularMeta(config: AngularMetaConfig): Provider[] {
  return [{ provide: ANGULAR_META_CONFIG, useValue: config }];
}
