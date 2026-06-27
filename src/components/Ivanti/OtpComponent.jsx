import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const OtpComponent = ({ size }) => {
    const [otp, setOtp] = useState(Array.from({ length: size }).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current[0].focus();
    }, [])

    const handleInput = (text, index) => {
        if (!text || isNaN(Number(text))) {
            return;
        }

        if (text.length > 1) {
            text = text.slice(0, size);
            const newOtp = [...otp];

            for (let i = 0; i < text.length; i++) {
                newOtp[i] = text[i];
            }
            setOtp(newOtp);
            inputRefs.current[size - 1].focus();
            return;
        }
        setOtp((prev) => {
            const newOtp = [...prev];
            newOtp[index] = text;
            if (index < size - 1) {
                inputRefs.current[index + 1].focus();
            }
            return newOtp;
        })
    }
    const handleKeyPress = (e, index) => {
        switch (e.nativeEvent.key) {
            case "Backspace":
                if (otp[index]) {
                    const newOtp = [...otp];
                    newOtp[index] = "";
                    setOtp(newOtp);
                }
                else {
                    inputRefs.current[index - 1].focus();
                }
                break;
            case "ArrowLeft":
                if (index > 0) {
                    inputRefs.current[index - 1].focus();
                }
                break;
            case "ArrowRight":
                if (index < size - 1) {
                    inputRefs.current[index + 1].focus();
                }
                break;
        }
    }

    return (
        <View style={styles.container}>
            <Text>Input Otp</Text>
            <View style={styles.inputContainer}>
                {
                    otp.map((value, index) => (
                        <TextInput
                            key={index}
                            value={value}
                            onChangeText={(text) => handleInput(text, index)}
                            // maxLength={1}
                            style={styles.input}
                            ref={(el) => inputRefs.current[index] = el}
                            inputMode="numeric"
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            selectTextOnFocus={true}
                        />
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
    },

    inputContainer: {
        display: "flex",
        flexDirection: "row"
    },
    input: {
        borderWidth: 1,
        height: 40,
        width: 40,
        borderColor: "black",
        marginRight: 5,
        borderRadius: 5,
        marginTop: 40,
        padding: 5,
        textAlign: "center",
        backgroundColor: "white"
    }

})
export default OtpComponent;