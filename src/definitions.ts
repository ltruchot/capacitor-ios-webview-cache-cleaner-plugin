export interface CapacitorIosWebviewCacheCleanerPlugin {
  clearWebViewCache(): Promise<{ value: string }>;
}
