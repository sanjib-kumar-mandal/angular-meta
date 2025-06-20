import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { NgMetasCtrl } from '../service/ng-metas.service';

export const ngMetasResolver: ResolveFn<boolean> = async (route, state) => {
  const document = inject(DOCUMENT);
  const metas = inject(NgMetasCtrl);
  const params = route.params;
  const queryParams = route.queryParams;
  const data = route.data;
  const url = new URL(document.URL).toString();
  const metaData = await metas.getMetas({ params, queryParams, data, url });
  return await metas.setMetaData(metaData);
};
