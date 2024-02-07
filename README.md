# capacitor-ios-webview-cache-cleaner-plugin

Clear IOS WebViews cache of your app. Nothing here for Android, sorry.

Oh, iOS has its very special way of handling hybrid app caching and, well, those beloved webviews of theirs. You might just be pleasantly surprised that after publishing your app successively on the emulator, TestFlight, or the App Store, you'll find it a tad challenging to flush out those app-stored elements.

But fear not, here's a method for clearing that cache at your leisure.


## Install

```bash
npm install capacitor-ios-webview-cache-cleaner-plugin
npx cap sync
```

## Examples


I recommend something like:

```typescript
import { CapacitorIosWebviewCacheCleaner } from 'capacitor-ios-webview-cache-cleaner-plugin';

// ...

if (/* some custom conditional matching the moment you want to flush */) {
    if (this.capacitor.getPlatform() === 'ios') {
      await CapacitorIosWebviewCacheCleaner.clearWebViewCache();
    }
}
```

For instance, in my case, an automatically injected Keycloak configuration into the local storage was never cleared between two app versions or between different environments, causing inconvenience for my users.

Here's an excerpt of the code selected to flush the cache only when there's a version or environment change.

```typescript
@Injectable()
export class MyService {
  private currentMobileAppBuildVersion: string =
    environment.envName + '-' + packageJson.version + '-' + packageJson.buildIncrementNumber;

  constructor(
    @Inject(CAPACITOR) private readonly capacitor: CapacitorGlobal,
    @Inject(CAPACITOR_PREFERENCES) private readonly preferences: PreferencesPlugin
  ) {}


  /**
   * check if the current build version+env is the same as the one stored in storage
   * @returns Promise<true> if storage has been cleared, false otherwise
   */
  async clearStorageOnVersionChange(): Promise<boolean> {
    // if key doesn’t exist, store current build version and return false
    const { value: keys } = await SecureStoragePlugin.keys();
    if (!keys.includes(MAP_BUILD_VERSION_KEY)) {
      return SecureStoragePlugin.set({ key: MAP_BUILD_VERSION_KEY, value: this.currentMobileAppBuildVersion }).then(
        () => false
      );
    }

    // if there is a stored build version, check it
    return SecureStoragePlugin.get({ key: MAP_BUILD_VERSION_KEY }).then((version) => {
      // if it’s empty or different from current build version, deeply clear all storages and return true
      if (!version.value || version.value !== this.currentMobileAppBuildVersion) {
        return this.clearAllLocalData()
          .then(() => SecureStoragePlugin.set({ key: MAP_BUILD_VERSION_KEY, value: this.currentMobileAppBuildVersion }))
          .then(() => true);
      }
      // if it’s the same, don’t do anything and return false
      return false;
    });
  }

  /**
   * Clear all data in different storages available on the device (localStorage, sessionStorage, capacitor preferences, secure storage plugin and cookies)
   *
   */
  async clearAllLocalData(): Promise<[{ value: boolean }, void, void]> {
    if (this.capacitor.getPlatform() === 'ios') {
      await CapacitorIosWebviewCacheCleaner.clearWebViewCache();
    }
    localStorage.clear(); // web local storage by url
    sessionStorage.clear(); // web local storage by tab, cleared on tab close
    return Promise.all([
      this.preferences.clear(), // Capacitor Preferences clearing
      CapacitorCookies.clearAllCookies() // Cookies clearing
    ]);
  }
}

```


## API

<docgen-index>

* [`clearWebViewCache()`](#clearwebviewcache)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### clearWebViewCache()

```typescript
clearWebViewCache() => Promise<{ value: string; }>
```

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------

</docgen-api>
