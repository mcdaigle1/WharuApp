import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import BlackComponent from './test/BlackComponent';
import EventList from './events/EventList';
import EventDetail from './events/EventDetail';

export const EventStack = StackNavigator({
	EventList: {
		screen: EventList,
		navigationOptions: {
			title: 'Your Events'
		},
	},
	EventDetail: {
		screen: EventDetail,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.name}`,
		}),
	},
});

export const TestTabs = TabNavigator({
  EventStack: {
    screen: EventStack,
    navigationOptions: {
      tabBarLabel: 'Events',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  BlackComponent: {
    screen: BlackComponent,
    navigationOptions: {
      tabBarLabel: 'Account',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});

