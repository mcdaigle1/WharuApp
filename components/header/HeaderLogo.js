import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

export default class HeaderLogo extends Component {
  render() {
    return (
    	<View style={headerLogoStyles.container}>
    		<Image style={headerLogoStyles.logoImage}
    			source={require("../../resources/images/wharu_logo.png")}
    		/> 
    	</View>
    );
  }
}

const headerLogoStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	logoImage: {
		height: 25,
		width: 128
	}
});  