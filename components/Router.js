import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import BlackComponent from './test/BlackComponent';
import GreyComponent from './test/GreyComponent';

export const TestTabs = TabNavigator({
  GreyComponent: {
    screen: GreyComponent,
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