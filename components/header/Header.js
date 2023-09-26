import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import HeaderLogo from "./HeaderLogo"

export default class Header extends Component {
  render() {
    return (
    	<View style={headerStyles.container}>
    		<HeaderLogo/> 
    	</View>
    );
  }
}

const headerStyles = StyleSheet.create({
	container: {
		marginTop: 25,
		height: 30,
	}
});  		
    		