import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const NewsCard = ({ article, onPress, onBookmark, isBookmarked, theme }) => {
  const { title, urlToImage, publishedAt, source } = article;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.container, { backgroundColor: theme.card, shadowColor: theme.shadow }]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: (urlToImage && urlToImage.startsWith('http'))
              ? urlToImage
              : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
          }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />

        {/* Bookmark Button */}
        <TouchableOpacity
          style={[styles.bookmarkButton, { backgroundColor: 'rgba(0,0,0,0.3)' }]}
          onPress={onBookmark}
        >
          <Text style={[styles.bookmarkIcon, { color: isBookmarked ? theme.primary : '#fff' }]}>
            {isBookmarked ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>

        {/* Content overlaid on image (bottom) */}
        <View style={styles.contentOverlay}>
          {source && source.name && (
            <View style={[styles.tag, { backgroundColor: theme.primary }]}>
              <Text style={styles.tagText}>{source.name}</Text>
            </View>
          )}
          <Text numberOfLines={3} style={[styles.title, { fontFamily: theme.serifFont }]}>
            {title}
          </Text>
          <Text style={styles.date}>
            {publishedAt ? new Date(publishedAt).toLocaleDateString() : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    marginHorizontal: 12,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 0.85, // Taller card for magazine-style look
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  contentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    lineHeight: 28,
  },
  date: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  bookmarkIcon: {
    fontSize: 24,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  }
});

export default NewsCard;
