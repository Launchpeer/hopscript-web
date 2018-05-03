/* eslint-disable */

var Colors = {
  // Brand
  brandPrimary: '#00CDAC',
  brandPurple: '#553982',
  stripe: '#6772E5',

  // Basic Tachyon
  black: '#000000',
  darkGray: '#333333',
  gray: '#777777',
  silver: '#999999',
  moonGray: '#CCCCCC',
  lightGray: '#EEEEEE',
  white: '#ffffff',
  darkRed: '#D0021B'
}

Colors.inputFontColor = Colors.black
Colors.inputBorderColor = Colors.silver

/* These colors affect the UI of InputMultiSelect */
Colors.multiSelectActive = Colors.brandPrimary
Colors.multiSelectInactive = Colors.white
Colors.multiSelectFontColorActive = Colors.white
Colors.multiSelectFontColorInactive = Colors.silver

var Fonts = {
  iosFont: 'Helvetica Neue',
  androidFont: 'sans-serif'
}

var Icons = {
  home: 'home',
  profile: 'user',
  map: 'map',
  calendar: 'calendar-o'
}

var BorderRadius = {
  none: 'none',
  all: '4px',
  top: '4px 4px 0px 0px',
  bottom: '0px 0px 4px 4px'
}

var MaxWidth = {
  mobile: '504px'
}

module.exports = {
  Colors,
  Icons,
  Fonts,
  BorderRadius,
  MaxWidth
}
