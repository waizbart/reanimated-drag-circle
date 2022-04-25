import React from 'react';
import { useEffect, useState } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    interpolate
} from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg'
import { View, Text, StyleSheet, StatusBar } from 'react-native';


export default function Login() {
    const titlePosition = useSharedValue(50)
    const titleOpacity = useSharedValue(0)

    useEffect(() => {

        titlePosition.value = withTiming(0, { 
            duration: 1000,
            easing: Easing.bounce
        })

        // titleOpacity.value = withTiming(1, { 
        //     duration: 1000,
        //     easing: Easing.bounce
        // })

    }, [])

    const titleStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: titlePosition.value }
            ],
            opacity: interpolate(titlePosition.value, [30, 0], [0, 1])
        }
    })

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#13131A" />

            <Animated.Text style={[styles.title, titleStyle]}>Seja bem vindo!</Animated.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#13131A',
    },

    title: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#fff',
    },
})