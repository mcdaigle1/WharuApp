import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

import HashStore from '../../utilities/HashStore'

export default class MapLegendItem extends Component {
	constructor(props) {
		super(props);
		
		this.state = {eventId: this.props.eventId, userEvent: this.props.userEvent}
	}

	render() {
		try {
			let userEvent = this.state.userEvent
			let iconName = (userEvent.isShown == null || userEvent.isShown == true) ? 'check-box' : 'check-box-outline-blank'
			let returnValue = 
				<View style={styles.container} >		
					<Icon name={iconName} 
						  size={20} 
						  color={'#' + userEvent.color}
					      onPress={() => this.onToggleUser(userEvent.user.id)}/>
					<Text style={styles.userName}
						  key={userEvent.id} 
					      onPress={() => this.onToggleUser(userEvent.user.id)}>
						{userEvent.user.displayName}
					</Text>
				</View>
			return (returnValue)
		} catch(e) {
			console.log("Error in MapLegendItem.render: " + e)
			return null
		}
	}
	
	onToggleUser(userId) {
		try {
			let hashStore = new HashStore()
			
			let eventUserEventsJson = hashStore.getValue('WA:' + this.state.eventId + ':eventUserEvents')
			let eventUserEvents = JSON.parse(eventUserEventsJson)
			eventUserEvents.filter(userEvent =>
				userEvent.user.id == userId
			).map(userEvent => {
				userEvent.isShown = (!("isShown" in userEvent) || userEvent.isShown == true) ? false : true
				this.setState({userEvent: userEvent})
			})
			hashStore.addValue('WA:' + this.state.eventId + ':eventUserEvents', JSON.stringify(eventUserEvents))
		} catch(e) {
			console.log("Error in MapLegendItem.onToggleUser: " + e)
			console.error(e)
			throw e
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: .5,
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 5
	},
	userName: {
		paddingLeft: 5,
		paddingTop: 2
	}
}); 