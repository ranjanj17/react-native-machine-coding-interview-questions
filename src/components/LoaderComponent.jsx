import { useEffect, useRef } from "react";
import { View, StyleSheet, Button, Animated, Easing } from "react-native"

const LoaderComponent = () => {
    const rotateValue = useRef(new Animated.Value(0)).current;

    const spin = () => {
        rotateValue.setValue(0);
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(({ finished }) => finished && spin());
    }

    useEffect(() => {
        spin();
        return () => {
            rotateValue.stopAnimation();
        }

    }, [])

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    });
    return (
        <View>
            <Animated.View
                style={[styles.loader,
                {
                    transform: [{ rotate }]
                }
                ]}
            />
            <Button
                title="Submit"
                color="green"
                onPress={() => console.log("Ranjan Clicked the Button")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loader: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderTopColor: "red",
        borderBottomColor: "green",
        borderLeftColor: "yellow",
        borderRightColor: "blue",
        marginTop: 50,
        marginBottom: 50
    }

})

export default LoaderComponent;