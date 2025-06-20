import { InjectionToken, Provider } from '@angular/core';

/**
 * @param apiEndpoint - required
 * @param forceCreation - True to create a new element without checking whether one already exists.
 */
export interface NgMetasConfig {
  apiEndpoint: string;
  forceCreation?: boolean;
}
export const NG_METAS_CONFIG = new InjectionToken<NgMetasConfig>(
  'NG_METAS_CONFIG'
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

export interface NgMetasData {
  title: string;
  meta: Array<DataTag>;
  schema: any;
}

export function provideNgMetas(config: NgMetasConfig): Provider[] {
  return [{ provide: NG_METAS_CONFIG, useValue: config }];
}
