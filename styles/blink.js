import React, { Component } from "react";
import { Animated, View,Text } from "react-native";

export default class Blink extends Component {
    constructor(props) {
        super(props);
        this.fadeAnimation = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.fadeAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(this.fadeAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(this.fadeAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }

    render() {
        return (
                <Animated.View style={{opacity: this.fadeAnimation, width: "25%", backgroundColor: "#FBF333", borderColor: "white"}}>
                    {this.props.children}
                </Animated.View>
        )
    }
}
