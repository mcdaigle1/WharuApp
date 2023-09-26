import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { TestTabs } from './Router';
import HashStore from "../utilities/HashStore"
import EventHelper from "../utilities/EventHelper"
import GreyComponent from "./test/GreyComponent"
import BlackComponent from "./test/BlackComponent"

/* 
 * Main application component
 */
export default class App extends Component {
	constructor(props) {
		super(props);
		
		let loginInfo = {
			userEmail: "mcdaigle1@gmail.com",
			userId: 2
		}
		
		//this.state = {loginInfo: HashStore.getValue("loginInfo")}
		this.state = {loginInfo: loginInfo}
	}
	
	render() {
		return (
		    <TestTabs />
		);
	}
	
	/*
	 * Get the user events for this user and add it to the hash store.  
	 */
	componentWillMount() {
		let hashStore = new HashStore();
		hashStore.removeValue('WA:userEvents');
		this.state.loginInfo != null && EventHelper.getUserEventsForUser(this.state.loginInfo.userId);
	}
}

const appStyles = StyleSheet.create({
	container: {
	}
})  