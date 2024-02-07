import Capacitor
import WebKit

@objc(CapacitorIosWebviewCacheCleanerPlugin)
public class CapacitorIosWebviewCacheCleanerPlugin: CAPPlugin {
    
    @objc func clearWebViewCache(_ call: CAPPluginCall) {

            WKWebsiteDataStore.default().fetchDataRecords(ofTypes: WKWebsiteDataStore.allWebsiteDataTypes()) { records in
                records.forEach { record in
                    WKWebsiteDataStore.default().removeData(ofTypes: record.dataTypes, for: [record], completionHandler: {})
                }
                call.resolve([
                    "success": true
                ])
            }
    }
}
