import { WebPlugin } from '@capacitor/core';

import type { CapacitorIosWebviewCacheCleanerPlugin } from './definitions';

export class CapacitorIosWebviewCacheCleanerWeb
  extends WebPlugin
  implements CapacitorIosWebviewCacheCleanerPlugin
{
  async clearWebViewCache(): Promise<{ value: string }> {
    console.log('clearWebViewCache');
    return { value: 'ok' };
  }
}
