import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import HashStore from "../utilities/HashStore"
import Header from "./header/Header"
import Menu from "./menu/MyMenu"
import GreyComponent from "./test/GreyComponent"
import BlackComponent from "./test/BlackComponent"
import { TestTabs } from './Router';

export default class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {loginInfo: HashStore.getValue("loginInfo")}
	}

//	render() {
//		return (
//			<View style={appStyles.container}>
//				<Header />
//				{this.state.loginInfo == null && <MyMenu />}	
//				<MyMenu />
//			    <Router>
//			    	<Scene key="root">
//			        	<Scene 
//			        		key="black"
//			        		component={BlackComponent}
//			        		title="Black"
//			        		initial
//			        	/>
//			        	<Scene
//			        		key="grey"
//			        		component={GreyComponent}
//			        		title="Grey"
//			        	/>
//			        </Scene>
//			    </Router>
//			</View>
//		);
//	}
	
	render() {
		return (
		    <TestTabs />
		);
	}
}

const appStyles = StyleSheet.create({
	container: {
	}
})  