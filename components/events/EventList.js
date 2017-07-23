import React, { Component } from "react";
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class EventList extends Component {
	constructor(props) {
		super(props);
		var events = [
			{	"id": 1,
				"name": "Test Event",
				"description": "Test event for development purposes",
				"start_time": "2017-06-19 18:00:00",
				"end_time": "2017-06-19 22:00:00",
				"status": 0
			},
			{	
				"id": 2,
				"name": "Test Event2",
				"description": "Test event2 for development purposes",
				"start_time": "2017-06-20 18:00:00",
				"end_time": "2017-06-20 22:00:00",
				"status": 0
			}
		]
	}

	render() {
		return (
			<ScrollView>
				<List>
					{events.map((event) => (
						<ListItem
							key={event.id}
							title={event.name}
							subtitle={event.description}
							onPress={() => this.onLearnMore(event)}
						/>
					))}
					</List>
			</ScrollView>
		);
	}
	
	onLearnMore = (event) => {
		//this.props.navigation.navigate('Details', { ...event });
	};
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		backgroundColor: "#cccccc"
		
	}
}); 