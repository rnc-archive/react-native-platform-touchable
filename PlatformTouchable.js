import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

let TouchableComponent;

if (Platform.OS === 'android') {
  TouchableComponent =
    Platform.Version <= 20 ? TouchableOpacity : TouchableNativeFeedback;
} else {
  TouchableComponent = TouchableOpacity;
}

if (TouchableComponent !== TouchableNativeFeedback) {
  TouchableComponent.SelectableBackground = () => ({});
  TouchableComponent.SelectableBackgroundBorderless = () => ({});
  TouchableComponent.Ripple = () => ({});
  TouchableComponent.canUseNativeForeground = () => false;
}

export default class PlatformTouchable extends React.Component {
  static SelectableBackground = TouchableComponent.SelectableBackground;
  static SelectableBackgroundBorderless = TouchableComponent.SelectableBackgroundBorderless;
  static Ripple = TouchableComponent.Ripple;
  static canUseNativeForeground = TouchableComponent.canUseNativeForeground;

  render() {
    let {
      children,
      style,
      foreground,
      background,
      useForeground,
      ...props
    } = this.props;

    // Even though it works for TouchableWithoutFeedback and
    // TouchableNativeFeedback with this component, we want
    // the API to be the same for all components so we require
    // exactly one direct child for every touchable type.
    children = React.Children.only(children);

    if (TouchableComponent === TouchableNativeFeedback) {
      useForeground =
        foreground && TouchableNativeFeedback.canUseNativeForeground();

      if (foreground && background) {
        console.warn(
          'Specified foreground and background for Touchable, only one can be used at a time. Defaulted to foreground.'
        );
      }

      return (
        <TouchableComponent
          {...props}
          useForeground={useForeground}
          background={(useForeground && foreground) || background}>
          <View style={style}>
            {children}
          </View>
        </TouchableComponent>
      );
    } else if (TouchableComponent === TouchableWithoutFeedback) {
      return (
        <TouchableWithoutFeedback {...props}>
          <View style={style}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      let TouchableFallback = this.props.fallback || TouchableComponent;
      return (
        <TouchableFallback {...props} style={style}>
          {children}
        </TouchableFallback>
      );
    }
  }
}
