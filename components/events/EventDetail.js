import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import HashStore from '../../utilities/HashStore'
import EventHelper from '../../utilities/EventHelper'
import Map from '../maps/Map'
import MapLegend from '../maps/MapLegend'

/*
 * Displays the detail page for a single event
 */
export default class EventDetail extends Component {
	constructor(props) {
		super(props);
		
		let event = this.props.navigation.state.params;
		
		this.state = {event: event, eventUserEvents: null}
	}

	render() {
		let returnValue;
		if (this.state.eventUserEvents == null) {
			returnValue = <Text style={styles.gettingMapText}>Getting Event Map ...</Text>
		} else {
			returnValue = 
				<View style={styles.container}>
					<View style={styles.mapSection}>
						<Map event={this.state.event} eventUserEvents={this.state.eventUserEvents} />
					</View>
					<View style={styles.mapLegend}>
						<MapLegend event={this.state.event} eventUserEvents={this.state.eventUserEvents} />
					</View>
				</View>
		}
		return (returnValue);
	}
	
	/*
	 * Add listener for WA:{event_id}:eventUserEvents.  In the case that the user events change for this event,
	 * (like a new coordinate is registered for a user), the map should be re-rendered
	 */
    componentWillMount() {
    	let hashStore = new HashStore();
    	this.eventUserEventsSubscription = hashStore.addListener('WA:' + this.state.event.id + ':eventUserEvents', () => {
    		let eventUserEventsJson = hashStore.getValue('WA:' + this.state.event.id + ':eventUserEvents')
    		this.setState({eventUserEvents: JSON.parse(eventUserEventsJson)})
    	});
    }
	
    /*
     * Once this component has mounted, get the user events from the server for this event
     */
	componentDidMount() {
		// async call to get user events for this event.  Once the events are retrieved from
		// the server, they will be stored in the HashStore and a 'WA:{event_id}:eventUserEvents' event
		// will be emitted.
		EventHelper.getUserEventsForEvent(this.state.event.id);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	mapSection: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	mapLegend: {
		flex: 2,
	},
	gettingMapText: {
		marginTop: 50,
		marginLeft: 100,
		fontSize: 15
	}
}); 