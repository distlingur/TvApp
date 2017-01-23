import 'react-native';
import React from 'react';
import ChannelScreen from '../app/ChannelScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <ChannelScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});