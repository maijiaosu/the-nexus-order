package com.maijiaosu.thenexusorder;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLConnection;
import java.util.Collections;
import java.util.Locale;
import java.nio.charset.StandardCharsets;
import org.json.JSONObject;

/** Serve the bundled web application on a local HTTPS origin, with no TLS bypass. */
public final class MainActivity extends Activity {
    private static final String ASSET_HOST = "appassets.androidplatform.net";
    private static final String HOME = "https://" + ASSET_HOST + "/assets/www/index.html";
    private static final String LEGACY_HOME = "file:///android_asset/legacy-preferences.html";
    private static final String MIGRATION_KEY = "local_preferences_https_v1";
    private static final byte[] BOOTSTRAP = "<!doctype html><html><head><meta charset='utf-8'></head><body style='background:#0a0d11'></body></html>".getBytes(StandardCharsets.UTF_8);
    private WebView web;
    private volatile int migrationPhase;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable migrationTimeout = () -> finishMigration(false);
    private String legacyPreferences;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        web = new WebView(this);
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setMediaPlaybackRequiresUserGesture(false);
        web.setBackgroundColor(0xFF0A0D11);
        web.setWebChromeClient(new WebChromeClient());
        web.setWebViewClient(new WebViewClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (migrationPhase == 2 && HOME.equals(uri.toString())) {
                    return new WebResourceResponse("text/html", "UTF-8", new ByteArrayInputStream(BOOTSTRAP));
                }
                if (!"https".equals(uri.getScheme()) || !ASSET_HOST.equals(uri.getHost())) return null;
                String path = uri.getPath();
                if (path == null || !path.startsWith("/assets/") || path.contains("..")) return missing();
                String asset = path.substring("/assets/".length());
                try {
                    String mime = mimeType(asset);
                    String charset = mime.startsWith("text/") || mime.contains("javascript") || mime.contains("json") || mime.contains("svg") ? "UTF-8" : null;
                    return new WebResourceResponse(mime, charset, 200, "OK",
                            Collections.singletonMap("Cache-Control", "no-cache"), getAssets().open(asset));
                } catch (IOException error) {
                    return missing();
                }
            }

            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (("https".equals(uri.getScheme()) && ASSET_HOST.equals(uri.getHost()))
                        || (migrationPhase == 1 && LEGACY_HOME.equals(uri.toString()))) return false;
                if ("https".equals(uri.getScheme()) || "http".equals(uri.getScheme())) {
                    try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); }
                    catch (ActivityNotFoundException ignored) { }
                }
                return true;
            }

            @Override public void onPageFinished(WebView view, String url) {
                if (migrationPhase == 1 && LEGACY_HOME.equals(url)) {
                    // Read only the five known keys from the previous app origin.
                    migrationPhase = 3;
                    web.evaluateJavascript(PreferenceMigration.readScript(), result -> {
                        if (migrationPhase != 3) return;
                        try {
                            JSONObject record = new JSONObject(result);
                            if (!record.optBoolean("ok")) { finishMigration(false); return; }
                            legacyPreferences = record.getJSONObject("values").toString();
                            migrationPhase = 2;
                            web.loadDataWithBaseURL(HOME, new String(BOOTSTRAP, StandardCharsets.UTF_8), "text/html", "UTF-8", HOME);
                        } catch (Exception error) { finishMigration(false); }
                    });
                } else if (migrationPhase == 2 && HOME.equals(url)) {
                    migrationPhase = 4;
                    web.evaluateJavascript(PreferenceMigration.writeScript(legacyPreferences), result -> {
                        if (migrationPhase != 4) return;
                        try { finishMigration(new JSONObject(result).optBoolean("ok")); }
                        catch (Exception error) { finishMigration(false); }
                    });
                } else if (migrationPhase == 0 && HOME.equals(url)) {
                    // The two controlled migration pages are not navigation history.
                    web.clearHistory();
                }
            }
        });
        setContentView(web);
        if (getPreferences(MODE_PRIVATE).getBoolean(MIGRATION_KEY, false)) {
            if (state == null || web.restoreState(state) == null) web.loadUrl(HOME);
        } else {
            migrationPhase = 1;
            handler.postDelayed(migrationTimeout, 4000);
            web.loadUrl(LEGACY_HOME);
        }
    }

    private void finishMigration(boolean success) {
        if (migrationPhase == 0) return;
        migrationPhase = 0;
        handler.removeCallbacks(migrationTimeout);
        legacyPreferences = null;
        if (success) getPreferences(MODE_PRIVATE).edit().putBoolean(MIGRATION_KEY, true).apply();
        web.loadUrl(HOME);
    }

    private static WebResourceResponse missing() {
        return new WebResourceResponse("text/plain", "UTF-8", 404, "Not Found",
                Collections.emptyMap(), new ByteArrayInputStream(new byte[0]));
    }

    private static String mimeType(String path) {
        String lower = path.toLowerCase(Locale.ROOT);
        if (lower.endsWith(".js")) return "application/javascript";
        if (lower.endsWith(".json") || lower.endsWith(".geojson")) return "application/json";
        if (lower.endsWith(".svg")) return "image/svg+xml";
        if (lower.endsWith(".woff")) return "font/woff";
        if (lower.endsWith(".woff2")) return "font/woff2";
        if (lower.endsWith(".ttf")) return "font/ttf";
        if (lower.endsWith(".webp")) return "image/webp";
        String mime = URLConnection.guessContentTypeFromName(path);
        return mime == null ? "application/octet-stream" : mime;
    }

    @Override protected void onSaveInstanceState(Bundle state) {
        web.saveState(state);
        super.onSaveInstanceState(state);
    }
    @Override protected void onPause() {
        web.onPause();
        web.pauseTimers();
        super.onPause();
    }
    @Override protected void onResume() {
        super.onResume();
        web.resumeTimers();
        web.onResume();
        // Android does not consistently emit a document visibility transition.
        web.evaluateJavascript("window.dispatchEvent(new Event('pageshow'));", null);
    }
    @Override protected void onDestroy() {
        migrationPhase = 0;
        handler.removeCallbacks(migrationTimeout);
        web.destroy();
        super.onDestroy();
    }
    @Override public void onBackPressed() {
        if (web.canGoBack()) web.goBack(); else super.onBackPressed();
    }
}
