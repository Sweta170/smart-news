## Dependency Upgrade Proposal

This document proposes safe, tested steps to upgrade the project's dependencies and notes compatibility considerations.

Current notable packages (from `package.json`):

- `expo`: ~42.0.1
- `react`: 16.13.1
- `react-native`: expo SDK 42 (react-native linked from expo)
- `react-native-paper`: ^4.9.2
- `react-native-linear-gradient`: ^2.8.3
- `react-native-webview`: ^13.16.0

Proposal summary

1. Target an Expo SDK upgrade path rather than piecemeal package bumps. Recommended flow:
   - Upgrade Expo to a recent SDK (e.g., SDK 45+) using `expo upgrade` (run locally).
   - Address breaking changes in React and React Native introduced by the new SDK.

2. Upgrade `react` to a compatible version for the chosen SDK (likely React 17 or 18).

3. Update `react-native-paper` to latest v5+ (note: v5 may require React 17+ and react-native-vector-icons updates).

4. Update `react-native-webview` and `react-native-linear-gradient` to their latest stable releases.

5. Run the app in a fresh emulator and fix compile/runtime errors; update native modules if necessary.

Detailed recommended commands (run locally):

```bash
# 1) Create branch (already done):
git checkout -b upgrade/deps-proposal

# 2) Upgrade Expo SDK interactively (recommended):
npx expo-cli upgrade

# 3) Install updated dependencies:
yarn install

# 4) Run app and fix issues:
expo start
```

Notes & cautions

- Upgrading Expo SDK is the canonical way to keep `react`/`react-native` in sync.
- Do not manually bump `react-native` without using `expo upgrade` when using a managed Expo project.
- Keep a backup branch and test on iOS and Android emulators/devices.

If you want, I can attempt a safer automated change set (update `package.json` versions) and try to run the app here — tell me whether you prefer a full upgrade attempt or just a prepared plan/PR.
