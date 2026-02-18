# React-Native-Expo-News-App
Cryptocurrency news app in react native expo. Projects for native beginners

[Full Documentation of the code is here](https://ninza7.medium.com/cryptocurrency-news-app-using-react-native-expo-and-newsapi-c3f96ca3be20)

[Video Tutorial](https://youtu.be/yUEXP2ED2zg)

## Setup: NewsAPI Key

This project expects a NewsAPI key to be provided via Expo `extra` settings or an environment variable.

- Add your key to `app.json` under `expo.extra.NEWS_API_KEY`:

```json
{
	"expo": {
		"extra": {
			"NEWS_API_KEY": "YOUR_NEWSAPI_KEY_HERE"
		}
	}
}
```

- Alternatively set `NEWS_API_KEY` in your environment or use EAS secrets for production builds.

After adding the key restart the Expo server (`expo start`).
