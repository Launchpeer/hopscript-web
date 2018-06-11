/* eslint-disable */

var Colors = {
  // Brand
  brandPrimary: '#6772e5',
  brandPrimaryShade: '#5c66d5',
  brandSecondary: '#3943a5',
  brandGreen: '#00cd6a',
  brandRed: '#ff5628',
  brandNearBlack: '#3e3e3e',
  
  stripe: '#6772E5',

  // Basic Tachyon
  black: '#000000',
  darkGray: '#333333',
  gray: '#777777',
  silver: '#999999',
  moonGray: '#CCCCCC',
  lightGray: '#EEEEEE',
  nearWhite: '#f4f4f4',
  white: '#ffffff',
  mediumRed: '#e7040f',
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
  all: '.25rem',
  top: '0px',
  bottom: '0px'
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
