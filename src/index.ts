import { registerPlugin } from '@capacitor/core';

import type { CapacitorIosWebviewCacheCleanerPlugin } from './definitions';

const CapacitorIosWebviewCacheCleaner =
  registerPlugin<CapacitorIosWebviewCacheCleanerPlugin>(
    'CapacitorIosWebviewCacheCleaner',
    {
      web: () =>
        import('./web').then(m => new m.CapacitorIosWebviewCacheCleanerWeb()),
    },
  );

export * from './definitions';
export { CapacitorIosWebviewCacheCleaner };
