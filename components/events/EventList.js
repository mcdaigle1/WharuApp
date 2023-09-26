import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import HashStore from '../../utilities/HashStore'
import EventsHeader from './EventsHeader'

/*
 * Displays a list of events for a single user, including events they own and events they
 * belong to
 */
export default class EventList extends Component {
	constructor(props) {
		super(props);

		this.userEventsSubscription = null;
		let userEvents = [];
		this.state = {userEvents: userEvents};
	}

	/*
	 * Show a scroll view of events for the current user
	 */
	render() {
		return (
			<View style={styles.container}>	
				<EventsHeader style={styles.eventsHeader} />
				<ScrollView style={styles.eventsList}>
					<List>
						{this.state.userEvents.map((userEvent) => (
							<ListItem
								key={userEvent.event.id}
								title={userEvent.name}
								subtitle={userEvent.event.description}
								onPress={() => this.onShowEvent(userEvent.event)}
							  />
						))}
						</List>
				</ScrollView>
			</View>
		);
	}
	
	/*
	 * Add a listener for userEvents updates.  Re-render the events list on change.
	 */
    componentWillMount() {
    	let hashStore = new HashStore();
    	this.userEventsSubscription = hashStore.addListener('WA:userEvents', () => {
    		let userEventsJson = hashStore.getValue('WA:userEvents');
    		this.setState({userEvents: JSON.parse(userEventsJson)})
    	});
    }
	
    /*
     * If an event is selected from the user event list, navigate to the EventDetail page
     */
	onShowEvent = (event) => {
		this.props.navigation.navigate('EventDetail', { ...event });
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'green'
	},
	eventsHeader: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'blue'
	},
	eventsList: {
		flex: 5,
		backgroundColor: 'yellow'
	}
}); 