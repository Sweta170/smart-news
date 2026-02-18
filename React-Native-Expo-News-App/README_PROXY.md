Local proxy and run instructions

- Start local proxy (keeps NewsAPI key secret):

```powershell
cd React-Native-Expo-News-App
$env:NEWS_API_KEY="YOUR_NEWSAPI_KEY"
npm run start:proxy
```

- Ensure `PROXY_URL` in `app.json` is set to `http://localhost:3000` (already set).

- Start Expo (clear cache):

```powershell
cd React-Native-Expo-News-App
npx expo start -c
```

- Notes:
  - Do NOT commit your `NEWS_API_KEY` to the repo.
  - For production, run API requests server-side or use EAS secrets.
