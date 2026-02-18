import React, { Component } from "react";
import { View, Text, Image, FlatList, Linking, ActivityIndicator, TouchableOpacity, TextInput, RefreshControl, Animated, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

import Header from "../../components/AppBar";
import NewsCard from "../../components/NewsCard";

export default class HomeScreen extends Component {

  state = {
    articles: [],
    isLoading: true,
    errors: null,
    categories: [
      "technology",
      "business",
      "sports",
      "health",
      "science",
      "entertainment",
      "general"
    ],
    selectedCategory: "technology",
    searchQuery: "",
    bookmarks: [],
    refreshing: false
  };

  getArticles = async (category = this.state.selectedCategory, searchQuery = this.state.searchQuery, isRefresh = false) => {
    if (isRefresh) {
      this.setState({ refreshing: true, errors: null });
    } else {
      this.setState({ isLoading: true, errors: null });
    }
    try {
      const PROXY = Constants.manifest?.extra?.PROXY_URL || process.env.PROXY_URL || '';
      const API_KEY = Constants.manifest?.extra?.NEWS_API_KEY || process.env.NEWS_API_KEY || '';

      let res;
      if (PROXY) {
        // Use the local/server proxy which keeps the API key secret
        let url = `${PROXY.replace(/\/$/, '')}/news?category=${category}`;
        if (searchQuery && searchQuery.trim().length > 0) {
          url += `&q=${encodeURIComponent(searchQuery.trim())}`;
        }
        res = await axios.get(url);
      } else {
        if (!API_KEY) {
          console.warn('NEWS_API_KEY is not set. Add it to app.json -> expo.extra.NEWS_API_KEY or set NEWS_API_KEY in the environment, or run the proxy.');
        }
        let url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${API_KEY}`;
        if (searchQuery && searchQuery.trim().length > 0) {
          url += `&q=${encodeURIComponent(searchQuery.trim())}`;
        }
        res = await axios.get(url);
      }

      const articles = res.data.articles.map(article => ({
        date: article.publishedAt,
        title: article.title,
        url: article.url,
        description: article.description,
        urlToImage: article.urlToImage,
        source: article.source,
        author: article.author
      }));

      this.setState({
        articles,
        isLoading: false,
        refreshing: false
      });

    } catch (error) {
      console.log("API ERROR:", error.response?.data || error.message);
      this.setState({
        errors: error,
        isLoading: false,
        refreshing: false
      });
    }
  };


  async componentDidMount() {
    this.getArticles();
    this.loadBookmarks();
  }

  loadBookmarks = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarkedArticles');
      if (bookmarks) {
        this.setState({ bookmarks: JSON.parse(bookmarks) });
      }
    } catch (e) {
      // ignore errors
    }
  };

  saveBookmarks = async (bookmarks) => {
    try {
      await AsyncStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
    } catch (e) {
      // ignore errors
    }
  };

  isBookmarked = (url) => {
    return this.state.bookmarks.some(article => article.url === url);
  };

  toggleBookmark = (article) => {
    let bookmarks = [...this.state.bookmarks];
    const index = bookmarks.findIndex(a => a.url === article.url);
    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(article);
    }
    this.setState({ bookmarks }, () => this.saveBookmarks(bookmarks));
  };

  handleCategorySelect = (category) => {
    if (category !== this.state.selectedCategory) {
      this.setState({ selectedCategory: category }, () => {
        this.getArticles(category, this.state.searchQuery);
      });
    }
  };

  handleSearchChange = (text) => {
    this.setState({ searchQuery: text });
  };

  handleSearchSubmit = () => {
    this.getArticles(this.state.selectedCategory, this.state.searchQuery);
  };

  openLink = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  onRefresh = () => {
    this.getArticles(this.state.selectedCategory, this.state.searchQuery, true);
  };

  renderHeader = () => {
    const { categories, selectedCategory, searchQuery, isLoading } = this.state;
    const { theme } = this.props;

    return (
      <View>
        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.searchBg, borderColor: theme.searchBorder }]}>
          <TouchableOpacity
            onPress={this.handleSearchSubmit}
            style={{ padding: 6, marginRight: 4 }}
            accessibilityLabel="Search"
          >
            <Text style={{ fontSize: 20, color: theme.textSecondary }}>🔍</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search news..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={this.handleSearchChange}
            onSubmitEditing={this.handleSearchSubmit}
            returnKeyType="search"
          />
        </View>

        {/* Category Selector */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          renderItem={({ item: cat }) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                onPress={() => this.handleCategorySelect(cat)}
                activeOpacity={0.8}
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: isActive ? theme.primary : 'transparent',
                    borderColor: isActive ? theme.primary : theme.pill,
                  }
                ]}
              >
                <Text style={{
                  color: isActive ? '#fff' : theme.textSecondary,
                  fontWeight: isActive ? '700' : '500',
                  textTransform: 'capitalize',
                  fontSize: 14,
                }}>{cat}</Text>
              </TouchableOpacity>
            );
          }}
        />

        {isLoading && (
          <ActivityIndicator size="large" color={theme.primary} style={{ marginVertical: 20 }} />
        )}
      </View>
    );
  };

  renderItem = ({ item }) => {
    const { theme } = this.props;
    return (
      <NewsCard
        article={item}
        theme={theme}
        onPress={() => this.openLink(item.url)}
        onBookmark={() => this.toggleBookmark(item)}
        isBookmarked={this.isBookmarked(item.url)}
      />
    );
  };

  render() {
    const { articles, errors, refreshing } = this.state;
    const { theme, isDark, onToggleTheme } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <Header theme={theme} isDark={isDark} onToggleTheme={onToggleTheme} />

        {errors && (
          <Text style={{ color: "red", textAlign: "center", marginTop: 18, fontSize: 15 }}>
            Failed to load news. Pull to refresh.
          </Text>
        )}

        <FlatList
          data={articles}
          keyExtractor={(item, index) => item.url || index.toString()}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
              colors={[theme.primary]}
              tintColor={theme.primary}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 16,
  },
  categoryPill: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 10,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
