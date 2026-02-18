# Implementation Plan - News App Enhancements

## Goal Description
Enhance the existing React Native News App with a modern UI, fully functional bookmarking system, and in-app article reading. This aims to improve user retention and provide a premium "reading" experience.

## User Review Required
> [!IMPORTANT]
> I will be introducing **FlatList** which changes how scrolling behavior works compared to the current ScrollView.
> I will assume standard Expo installation for new packages (`expo install`).

## Proposed Changes

### Dependencies
#### [MODIFY] [package.json](file:///e:/final%20year%20project/news-app/React-Native-Expo-News-App/package.json)
- Add `react-native-webview` (for in-app browser).
- Add `react-native-linear-gradient` (for UI gradients).
- [COMPLETED] Modified `server.js` to serve **Mock Data** when `NEWS_API_KEY` is missing to unblock development.

### UI/UX & Components
#### [MODIFY] [HomeScreen/index.js](file:///e:/final%20year%20project/news-app/React-Native-Expo-News-App/screens/HomeScreen/index.js)
- Replace `ScrollView` with `FlatList`.
- Integrate `SkeletonContent` (or custom Animated View) for loading.
- Update `Card` rendering with new design (gradient overlay, glass effect).
- Add "Heart" icon to cards toggling `toggleBookmark`.
- Add "Saved" button in header/top bar to switch view to bookmarks.
- Implement Modal for `WebView`.

#### [NEW] [components/ArticleModal.js](file:///e:/final%20year%20project/news-app/React-Native-Expo-News-App/components/ArticleModal.js)
- A modal component wrapping `WebView` to display articles.
- Close button and share option.

#### [NEW] [components/NewsCard.js](file:///e:/final%20year%20project/news-app/React-Native-Expo-News-App/components/NewsCard.js)
- Extract Card logic from HomeScreen.
- Apply new styling and animations.

## Verification Plan

### Automated Tests
- None currently available. Verification will be manual.

### Manual Verification
1.  **UI Check**: Verify Card design looks "Premium" and matches the description (shadows, radius).
2.  **Scroll Performance**: List should scroll smoothly without lag (FlatList benefit).
3.  **Bookmarks**:
    - Click Heart -> Icon changes.
    - Restart App -> Bookmark persists.
    - Open Saved View -> Article appears.
4.  **Webview**: Click article -> Opens inside app -> Can close back to list.
