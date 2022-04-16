import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler'
import Svg, { Line } from 'react-native-svg'
import { View, Text } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';

export default function AnimatedStyleUpdateExample() {
    const [lineX2, setLineX2] = useState(0);
    const [lineY2, setLineY2] = useState(0);

    const posX = useSharedValue(0);
    const posY = useSharedValue(0);

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(event, ctx: any) {
            ctx.posX = posX.value
            ctx.posY = posY.value
        },
        onActive(event, ctx: any) {
            posX.value = ctx.posX + event.translationX;
            posY.value = ctx.posY + event.translationY;
        },
        onEnd() {
            posX.value = withSpring(0, { mass: 2, damping: 20, stiffness: 500, restDisplacementThreshold: 0.05, restSpeedThreshold: 2 }),
            posY.value = withSpring(0, { mass: 2, damping: 20, stiffness: 500, restDisplacementThreshold: 0.05, restSpeedThreshold: 2 })
        }
    })

    const style = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: posX.value },
                { translateY: posY.value },
            ],
        };
    });

    useEffect(() => {
        setLineX2(posX.value)
        setLineY2(posY.value)
    }, [posX.value, posY.value])
    
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Svg height="100" width="100">
                <Line x1="0" y1="0" x2={lineX2} y2={lineY2} stroke="yellow" strokeWidth="5" />
            </Svg>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[{
                        width: 150,
                        height: 150,
                        backgroundColor: 'blue',
                        borderRadius: 100,
                        borderColor: 'black',
                        borderWidth: 2,
                        shadowColor: '#171717',
                        shadowOpacity: 0.9,
                        shadowRadius: 5,
                    },
                        style]}
                >
                    <Text style={{
                        marginTop: 57,
                        textAlign: 'center',
                        fontSize: 25,
                        fontFamily: "Times New Roman",
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        color: 'white',

                    }}>
                        Drag-me
                    </Text>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
}