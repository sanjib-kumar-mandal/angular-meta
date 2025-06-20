import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, firstValueFrom, map, of, switchMap } from 'rxjs';
import { ANGULAR_META_CONFIG, AngularMetaData } from '../config';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AngularMetaCtrl {
  private config = inject(ANGULAR_META_CONFIG);
  private httpClient = inject(HttpClient);
  private meta = inject(Meta);
  private title = inject(Title);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  async getMetas(data: any) {
    return await firstValueFrom(
      this.httpClient.get<AngularMetaData>(this.config.apiEndpoint, {
        params: data,
        headers: { 'content-type': 'application/json' },
      })
    );
  }

  async setMetaData(data: AngularMetaData) {
    try {
      // Set title
      this.title.setTitle(data.title);
      // Set meta tags
      for (let i = 0, l = data.meta.length; i < l; i++) {
        const each: any = data.meta[i];
        if (each.hasOwnProperty('href')) {
          const link = this.document.createElement('link');
          if (each.hasOwnProperty('href')) {
            link.href = each.href;
          }
          if (each.hasOwnProperty('rel')) {
            link.rel = each.rel;
          }
          if (each.hasOwnProperty('type')) {
            link.type = each.type;
          }
          if (each.hasOwnProperty('title')) {
            link.title = each.title;
          }
          if (each.hasOwnProperty('media')) {
            link.media = each.media;
          }
          this.document.head.appendChild(link);
        } else {
          this.meta.addTag(each, this.config.forceCreation ?? false);
        }
      }
      // Set schema
      const all = this.document.head.getElementsByTagName('script');
      let isExists = null;
      for (let i = 0, l = all.length; i < l; i++) {
        if (all[i].id === `ng_metas_page_json_ld`) {
          isExists = all[i];
          break;
        }
      }
      if (isExists) {
        isExists.innerText = JSON.stringify(data.schema);
      } else {
        const script = this.document.createElement('script');
        script.type = 'application/ld+json';
        script.id = `ng_metas_page_json_ld`;
        script.innerText = JSON.stringify(data.schema);
        this.document.head.appendChild(script);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  initFromCtrl() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => route.firstChild),
        switchMap((route) => {
          return of({
            params: route?.snapshot.params,
            queryParams: route?.snapshot.queryParams,
            data: route?.snapshot.data,
            url: new URL(this.document.URL).toString(),
          });
        })
      )
      .subscribe({
        next: async (response) => {
          const metas = await this.getMetas(response);
          this.setMetaData(metas);
        },
      });
  }
}
