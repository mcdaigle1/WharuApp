import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class MyMenu extends Component {
  render() {
    return (
        <View style={styles.container}>
	        <Text style={styles.testText} onPress={() => Actions.grey()}>
	        	grey screen
	        </Text>
		    <Text style={styles.welcome} onPress={() => Actions.black()}>
	        	black screen
	        </Text>
    	</View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		height: 20,
	},
	testText: {
		
	}
});  