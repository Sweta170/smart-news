import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ActivityIndicator, Share, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const ArticleModal = ({ visible, onClose, url, theme }) => {

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this news: ${url}`,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onClose}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
                <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />

                {/* Header */}
                <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.pill }]}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={[styles.closeText, { color: theme.textSecondary }]}>✕ Close</Text>
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>Article View</Text>
                    <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
                        <Text style={[styles.shareText, { color: theme.primary }]}>Share</Text>
                    </TouchableOpacity>
                </View>

                {/* WebView */}
                <WebView
                    source={{ uri: url }}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <View style={[styles.loading, { backgroundColor: theme.background }]}>
                            <ActivityIndicator size="large" color={theme.primary} />
                        </View>
                    )}
                    style={{ backgroundColor: theme.background }}
                />
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 56,
        borderBottomWidth: 1,
    },
    closeButton: {
        padding: 8,
    },
    closeText: {
        fontSize: 16,
        fontWeight: '500',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    shareButton: {
        padding: 8,
    },
    shareText: {
        fontSize: 16,
        fontWeight: '600',
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ArticleModal;
