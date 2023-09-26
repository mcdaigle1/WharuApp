import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class BlackComponent extends Component {
  render() {
    return (
    	<View style={styles.container}>
    		
    	</View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		height: 200,
		backgroundColor: "black"
	}
});  