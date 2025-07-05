
import { inject, DOCUMENT } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AngularMetaCtrl } from '../service/angular-meta.service';

export const angularMetaResolver: ResolveFn<boolean> = async (route, state) => {
  const document = inject(DOCUMENT);
  const metaCtrl = inject(AngularMetaCtrl);
  const params = route.params;
  const queryParams = route.queryParams;
  const data = route.data;
  const url = new URL(document.URL).toString();
  const metaData = await metaCtrl.getMetas({ params, queryParams, data, url });
  return await metaCtrl.setMetaData(metaData);
};
