# Angular Meta

**Angular Meta** is a powerful and flexible SEO utility designed for Angular applications, including support for Server-Side Rendering (SSR). It allows dynamic updates of meta tags, link tags, and schema.org structured data based on route-level data or custom logic.

---

## ✅ Features

- ✅ Fully tested with Angular SSR
- ✅ Easily configure meta information via route resolvers or services
- ✅ Supports dynamic meta updates based on route `params`, `queryParams`, `data`, and `URL`
- ✅ Allows flexible schema injection
- ✅ Lightweight and easy to integrate

---

## 📦 Installation

```bash
npm install angular-meta
```

## ⚙️ Setup

mport the `provideAngularMeta` function in your root providers (typically `main.ts` or `app.config.ts`):

```ts
import { provideAngularMeta } from "angular-meta";

bootstrapApplication(AppComponent, {
  providers: [
    provideAngularMeta({
      apiEndpoint: "https://your-api.com/meta",
    }),
    // other providers...
  ],
});
```

## 🧩 API Endpoint Contract

Your API should accept the following values in the request:

```ts
{
  param: { [key: string]: string },
  queryparam: { [key: string]: string },
  data: any,
  url: string
}
```

And return data in the following format:

```ts
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
```

## 🚀 Usage

### Using Angular Route Resolver

To automatically resolve metadata when navigating:

```ts
import { angularMetaResolver } from 'angular-meta';

{
  path: 'example',
  loadComponent: () => import('./example.component'),
  resolve: {
    meta: angularMetaResolver
  }
}
```

### Manual Usage in Component

You can manually trigger metadata updates from a component or service using AngularMetaCtrl:

```ts
import { AngularMetaCtrl } from 'angular-meta';
import { inject } from "@angular/core";

private metaCtrl = inject(AngularMetaCtrl);
constructor() {
  this.metaCtrl.initFromCtrl();
}
```

## 📄 License

MIT

## 🙌 Contribution

Feel free to open issues or submit PRs to enhance functionality or fix bugs.
