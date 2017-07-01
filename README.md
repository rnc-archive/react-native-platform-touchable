# `<Touchable>`

A wrapper around the various `Touchable*` components built into React Native core in order to use `TouchableNativeFeedback` whenever possible, provide an easier interface to using it, and flatten out API differences between the Touchable components.

- iOS: Defaults to `TouchableOpacity` with default `activeOpacity`.
- Android: Defaults to `TouchableNativeFeedback` with background from Android app style, unless Android API <= 20 / Android < 5.0, then defaults to `TouchableOpacity`.
- `Touchable` requires exactly one child, for example:

  ```javascript
  // Good
  <Touchable>
    <Child>
      <GrandChild />
      <GrandChild />
    </Child>
  </Touchable>

  // Bad
  <Touchable>
    <Child />
    <Child />
  </Touchable>
  ```

## Usage

```
npm i react-native-platform-touchable --save

 # or

yarn add react-native-platform-touchable
```

```javascript
import React from 'react';
import { Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Touchable
          onPress={() => console.log('hello!')}
          style={{
            backgroundColor: '#eee',
            paddingVertical: 30,
            paddingHorizontal: 80,
          }}
          background={Touchable.Ripple('blue')}>
          <Text>Hello there!</Text>
        </Touchable>
      </View>
    );
  }
}
```

## Statics

- `Touchable.SelectableBackground()` - creates an object that represents android theme's default background for selectable elements
- `Touchable.SelectableBackgroundBorderless()` - creates an object that represent android theme's default background for borderless selectable elements.
- `Touchable.Ripple(color: string, borderless: boolean)` - creates an object that represents ripple drawable with specified color (as a string). If property borderless evaluates to true the ripple will render outside of the view bounds.

## props

You can use the same props as you would use on `TouchableOpacity`, `TouchableHighlight`, `TouchableNativeFeedback`, and `TouchableWithoutFeedback`. Listed below.

- `fallback` - If `TouchableNativeFeedback` is not available (on iOS and on Android API <= 20 / Android < 5.0), the component specified in this prop is used instead. Defaults to `TouchableOpacity`.

- `hitSlop` - use this! pass in an object of the format `{ top: number, left: number, right: number, bottom: bottom }`, this makes the `Touchable` easier to press by expanding the touchable area by the number of points that you specify on each side, without having to change the layout of the `Touchable`, eg: by adding padding.
- `onPress` - fired when you press (touch in, release within bounds).
- `onPressIn` - fired immediately on press in (like `onmousedown` on web)
- `onPressOut` - fired immediately on press out (like `onmouseout` on web)
- `onLongPress` -   fired when you press and hold.
- `delayLongPress` - time to wait for `onLongPress` to fire.
- `delayPressIn` - time to wait for `onPressIn` to fire
- `delayPressOut` - time to wait for `onPressOut` to fire
- `disabled` - default `false`, when `true` the button is disabled.
- `onLayout` - see [onLayout documentation on View](http://facebook.github.io/react-native/releases/0.45/docs/view.html#onlayout)
- `accessibilityComponentType` - see [Accessibility guide](https://facebook.github.io/react-native/docs/accessibility.html)
- `accessibilityTraits` - see [Accessibility guide](https://facebook.github.io/react-native/docs/accessibility.html)
- `pressRetentionOffset` - see [React Native
  documentation](https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html#pressretentionoffset).

### Additional props used by TouchableOpacity (default iOS)

- `activeOpacity` - sets the opacity to animate to when touch is active.

### Additional props used by TouchableNativeFeedback  (default Android)

- `background` - customize the touch effect with `Touchable.SelectableBackground`, `SelectableBackgroundBorderless`, or `Touchable.Ripple(color: string, borderless: boolean)`.
- `foreground` - same as `background`, should be used instead of background if the `Touchable` has any images as children and you want the ripple to be rendered above the image (if the image is not opaque, `background` will not be visibl, you must use foreground)

### Additional props used by TouchableHighlight

- `underlayColor` - the color of the background when touch is active.
- `onHideUnderlay` - fired immediately after the underlay is hidden
- `onShowUnderlay` - fired immediately after the underlay is shown

## Rounded corners on Touchables with TouchableNativeFeedback behavior

- See [this example on Snack](https://snack.expo.io/B1ENztH4-) that demonstrates how to have `Touchable` with `TouchableNativeFeedback` behavior respect rounded corners from `borderRadius`.
