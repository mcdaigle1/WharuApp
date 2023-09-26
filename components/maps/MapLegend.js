import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import MapLegendItem from './MapLegendItem';

export default class MapLegend extends Component {
	constructor(props) {
		super(props);
		
		this.state = {event: this.props.event, eventUserEvents: this.props.eventUserEvents}
	}

	render() {
		try {
			let returnValue = 
				<ScrollView style={styles.container}>
					<List style={styles.itemList}>
						{this.state.eventUserEvents.map((userEvent) => (
							<MapLegendItem key={userEvent.id} eventId={this.state.event.id} userEvent={userEvent} />
						))}
					</List>
				</ScrollView>
	
			return (returnValue)
		} catch(e) {
			console.log("Error in MapLegend.render: " + e)
			return null
		}
	}
}

const styles = StyleSheet.create({
	container: {
	},
	itemList: {
		flex: 1,
		justifyContent: 'flex-start'
	}
}); 