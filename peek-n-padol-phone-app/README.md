# Peek n’ Padol Pickleball: phone app package

This folder is a ready-to-build project. It holds the game (`www/`), icons, and a
Capacitor wrapper that turns the web game into an Android app and an iPhone app.
It is **not** a finished .apk or .ipa: those have to be built and signed on your own
computer with your own developer accounts.

## What works in the installed app
- Full single-player game vs the CPU, character creator, names, sounds, camera angles, menu.
- Works offline after the first sync.
- Online rooms (host/join with a code) only work inside claude.ai. The installed app
  shows the CPU mode only.


## Fastest way to get an APK: build it in the cloud (no Android Studio, no coding)
1. Make a free account at github.com and create a new repository.
2. Upload everything in this folder to it (Add file > Upload files). Make sure the
   `.github/workflows/build-apk.yml` file is included. If your computer hides it, use
   Add file > Create new file, type `.github/workflows/build-apk.yml` as the name and
   paste the contents of `build-apk.yml` from this folder.
3. Open the **Actions** tab, choose **Build Android APK**, press **Run workflow**.
4. Wait about 5 to 10 minutes. Open the finished run, scroll to **Artifacts** and download
   `peek-n-padol-apk`. Unzip it to get `app-debug.apk`.
5. Send the APK to your Android phone and open it. Allow "Install unknown apps" when asked.

The debug APK is fine for you and friends. The Play Store needs a signed release bundle
(.aab) and a Google Play developer account.

## Quick option: install as a web app (no stores, free)
1. Upload the contents of `www/` to any static host (GitHub Pages, Netlify, Cloudflare Pages).
2. iPhone: open the site in Safari, tap Share, then **Add to Home Screen**.
   Android: open it in Chrome, tap ⋮, then **Install app**.

## Android app (.apk / .aab)
Needs: Node 18+, Android Studio (includes the SDK and a Java runtime).
```
npm install
npm run prepare:web          # downloads three.js so the app works offline
npx cap add android
npm run sync
npm run android              # opens Android Studio
```
In Android Studio: **Build > Build Bundle(s) / APK(s) > Build APK(s)** to get a test APK
you can send to a phone. For the Play Store, use **Build > Generate Signed Bundle** and
create a Google Play developer account (one-time fee).

## iPhone app (.ipa)
Needs: a Mac, Xcode, and an Apple ID. Installing on your own phone is free;
the App Store needs a paid Apple Developer Program membership.
```
npm install
npm run prepare:web
npx cap add ios
npm run sync
npm run ios                  # opens Xcode
```
In Xcode: pick your team under **Signing & Capabilities**, choose your phone, press Run.
For the App Store, use **Product > Archive**.

## App icon
`icon-1024.png` is a 1024×1024 icon. Use any icon generator (for example
`npx @capacitor/assets generate`) to create every Android/iOS size from it.

## Changing the app
Edit `www/index.html`, then run `npm run sync` again.
