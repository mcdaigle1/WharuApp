import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends Component {
	constructor(props) {
		super(props);
		
		this.state = {event: this.props.event, eventUserEvents: this.props.eventUserEvents}
	}

	render() {
		let shownUserEvents = this.state.eventUserEvents.filter(userEvent => {
			if(!("isShown" in userEvent) || userEvent.isShown == true) {
				return userEvent
			}
		})
		
		let middleLat, middleLong, latDelta, longDelta
		[middleLat, middleLong, latDelta, longDelta] = this.findLatLongBounderies(shownUserEvents);

		let returnValue = 
			<View style={styles.container}>	
				<MapView
					key={this.state.event.id}
				 	style={styles.map}
					region={
						{	
							latitude: middleLat,
							longitude: middleLong,
							latitudeDelta: latDelta,
							longitudeDelta: longDelta,
						}
					}
				>

					{
						shownUserEvents.map(userEvent => {
							return this.renderLines(userEvent)
						})
					}
					{
						shownUserEvents.map(userEvent => {
							return this.renderBigCircles(userEvent, latDelta)
						})
					}
					{
						shownUserEvents.map(userEvent => {	
							return this.renderInnerCircles(userEvent, latDelta)
						})
					}

				</MapView>	
			</View>

		return (returnValue)
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({ eventUserEvents: nextProps.eventUserEvents })
	}
	
	/*
	 * Calculate the middle point of the map using the min and max lat/longs in our event coordinates
	 * MCD TODO the event object from the server should eventually have a default location if there are
	 * no coordinates yet.  
	 */
	findLatLongBounderies(shownUserEvents) {
		let minLatitude = 90;
		let maxLatitude = -90;
		let minLongitude = 180;
		let maxLongitude = -180;
		
		shownUserEvents.map((userEvent) => {
			userEvent.mapCoordinates.map((mapCoordinate) => {
				mapCoordinate.latitude > maxLatitude && (maxLatitude = mapCoordinate.latitude);
				mapCoordinate.longitude > maxLongitude && (maxLongitude = mapCoordinate.longitude);
				mapCoordinate.latitude < minLatitude && (minLatitude = mapCoordinate.latitude);
				mapCoordinate.longitude < minLongitude && (minLongitude = mapCoordinate.longitude);
			});
		});

		// find the middle map coordinates base on the largest and smallest lat/longs in our coordinates
		let midLatitude = minLatitude + ((maxLatitude - minLatitude) / 2);
		let midLongitude = minLongitude + ((maxLongitude - minLongitude) / 2);
		// find the size (delta) of the map base on the largest and smallest lat/longs in our coordinates.
		// pad the edge of the map a bit.
		let latDelta = (maxLatitude - minLatitude) * 1.15;
		let longDelta = (maxLongitude - minLongitude) * 1.15;
		
		return [midLatitude, midLongitude, latDelta, longDelta];
	}
	
	renderBigCircles(userEvent, latDelta) {	
		return userEvent.mapCoordinates.map((mapCoordinate) => {
			return this.drawCircle(mapCoordinate, userEvent.color, latDelta)
		})
	}
	
	renderInnerCircles(userEvent, latDelta) {
		return userEvent.mapCoordinates.map((mapCoordinate, index) => {
			if (index == userEvent.mapCoordinates.length - 1) {
				return this.drawCenterCircle(mapCoordinate, latDelta)
			} else {
				return null
			}	
		})
	}
	
	renderLines(userEvent) {
		return userEvent.mapCoordinates.map((mapCoordinate, index) => {
			if (index != userEvent.mapCoordinates.length - 1) {
				return this.drawLine(userEvent.mapCoordinates[index], userEvent.mapCoordinates[index + 1], userEvent.color)
			} else {
				return null
			}
		})
	}
	
	drawCircle(mapCoordinate, color, latDelta) {
		return (
			<MapView.Circle
				key={mapCoordinate.id + "_circle"}
				center={
					{
			 			latitude: mapCoordinate.latitude,
			 			longitude: mapCoordinate.longitude
					}
			 	}
				radius={latDelta * 5000}
				strokeColor={'#000000'}
				fillColor={'#' + color}
				zIndex={1000}
			/>
		)
	}
	
	drawCenterCircle(mapCoordinate, latDelta) {
		return (
			<MapView.Circle
				key={mapCoordinate.id + "_centercircle"}
				center={
					{ latitude: mapCoordinate.latitude, longitude: mapCoordinate.longitude }
			 	}
				radius={latDelta * 2500}
				strokeColor={'#000000'}
				fillColor={'#f9f5ed'}
				zIndex={2000}
			/>
		)
	}
	
	drawLine(startMapCoordinate, endMapCoordinate, color) {
		return (
			<MapView.Polyline
				key={startMapCoordinate.id + "_line"}
				coordinates={[
					{ latitude: startMapCoordinate.latitude, longitude: startMapCoordinate.longitude },
					{ latitude: endMapCoordinate.latitude, longitude: endMapCoordinate.longitude }
				]}
				strokeColor={'#' + color}
				strokeWidth={2}
				zIndex={-10}
			/>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
}); 