import getMuiTheme from 'material-ui/styles/getMuiTheme'

const mui = {
  appBar: {
    color: '#2196f3',
    textColor: '#ffffff',
    height: 64,
    titleFontWeight: 400,
    padding: 24
  },
  avatar: {
    color: '#ffffff',
    backgroundColor: 'rgb(188, 188, 188)'
  },
  badge: {
    color: '#ffffff',
    textColor: 'rgba(0, 0, 0, 0.87)',
    primaryColor: '#2196f3',
    primaryTextColor: '#ffffff',
    secondaryColor: '#f36e21',
    secondaryTextColor: '#ffffff',
    fontWeight: 500
  },
  bottomNavigation: {
    backgroundColor: '#ffffff',
    unselectedColor: 'rgba(0, 0, 0, 0.54)',
    selectedColor: '#2196f3',
    height: 56,
    unselectedFontSize: 12,
    selectedFontSize: 14
  },
  button: {
    height: 36,
    minWidth: 88,
    iconButtonSize: 48
  },
  card: {
    titleColor: 'rgba(0, 0, 0, 0.87)',
    subtitleColor: 'rgba(0, 0, 0, 0.54)',
    fontWeight: 500
  },
  cardMedia: {
    color: 'rgba(255, 255, 255, 0.87)',
    overlayContentBackground: 'rgba(0, 0, 0, 0.54)',
    titleColor: 'rgba(255, 255, 255, 0.87)',
    subtitleColor: 'rgba(255, 255, 255, 0.54)'
  },
  cardText: {
    textColor: 'rgba(0, 0, 0, 0.87)'
  },
  checkbox: {
    boxColor: 'rgba(0, 0, 0, 0.87)',
    checkedColor: '#2196f3',
    requiredColor: '#2196f3',
    disabledColor: 'rgba(0, 0, 0, 0.3)',
    labelColor: 'rgba(0, 0, 0, 0.87)',
    labelDisabledColor: 'rgba(0, 0, 0, 0.3)'
  },
  chip: {
    backgroundColor: 'rgb(224, 224, 224)',
    deleteIconColor: 'rgba(0, 0, 0, 0.26)',
    textColor: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    fontWeight: 400,
    shadow:
      '0 1px 6px rgba(0, 0, 0, 0.12),\n        0 1px 4px rgba(0, 0, 0, 0.12)'
  },
  datePicker: {
    color: '#2196f3',
    textColor: '#ffffff',
    calendarTextColor: 'rgba(0, 0, 0, 0.87)',
    selectColor: '#1976d2',
    selectTextColor: '#ffffff',
    calendarYearBackgroundColor: '#ffffff',
    headerColor: '#2196f3'
  },
  dialog: {
    titleFontSize: 22,
    bodyFontSize: 16,
    bodyColor: 'rgba(0, 0, 0, 0.6)'
  },
  dropDownMenu: {
    accentColor: '#e0e0e0'
  },
  enhancedButton: {
    tapHighlightColor: 'rgba(0, 0, 0, 0)'
  },
  flatButton: {
    color: 'rgba(0, 0, 0, 0)',
    buttonFilterColor: '#999999',
    disabledTextColor: 'rgba(0, 0, 0, 0.3)',
    textColor: 'rgba(0, 0, 0, 0.87)',
    primaryTextColor: '#2196f3',
    secondaryTextColor: '#f36e21',
    fontSize: 14,
    fontWeight: 500
  },
  floatingActionButton: {
    buttonSize: 56,
    miniSize: 40,
    color: '#2196f3',
    iconColor: '#ffffff',
    secondaryColor: '#f36e21',
    secondaryIconColor: '#ffffff',
    disabledTextColor: 'rgba(0, 0, 0, 0.3)',
    disabledColor: 'rgb(224, 224, 224)'
  },
  gridTile: {
    textColor: '#ffffff'
  },
  icon: {
    color: '#ffffff',
    backgroundColor: '#2196f3'
  },
  inkBar: {
    backgroundColor: '#f36e21'
  },
  drawer: {
    width: 256,
    color: '#ffffff'
  },
  listItem: {
    nestedLevelDepth: 18,
    secondaryTextColor: 'rgba(0, 0, 0, 0.54)',
    leftIconColor: '#757575',
    rightIconColor: '#757575'
  },
  menu: {
    backgroundColor: '#ffffff',
    containerBackgroundColor: '#ffffff'
  },
  menuItem: {
    dataHeight: 32,
    height: 48,
    hoverColor: 'rgba(0, 0, 0, 0.1)',
    padding: 24,
    selectedTextColor: '#f36e21',
    rightIconDesktopFill: '#757575'
  },
  menuSubheader: {
    padding: 24,
    borderColor: '#e0e0e0',
    textColor: '#2196f3'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.54)'
  },
  paper: {
    color: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: '#ffffff',
    zDepthShadows: [
      '0 1px 6px rgba(0, 0, 0, 0.12),\n         0 1px 4px rgba(0, 0, 0, 0.12)',
      '0 3px 10px rgba(0, 0, 0, 0.16),\n         0 3px 10px rgba(0, 0, 0, 0.23)',
      '0 10px 30px rgba(0, 0, 0, 0.19),\n         0 6px 10px rgba(0, 0, 0, 0.23)',
      '0 14px 45px rgba(0, 0, 0, 0.25),\n         0 10px 18px rgba(0, 0, 0, 0.22)',
      '0 19px 60px rgba(0, 0, 0, 0.3),\n         0 15px 20px rgba(0, 0, 0, 0.22)'
    ]
  },
  radioButton: {
    borderColor: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: '#ffffff',
    checkedColor: '#2196f3',
    requiredColor: '#2196f3',
    disabledColor: 'rgba(0, 0, 0, 0.3)',
    size: 24,
    labelColor: 'rgba(0, 0, 0, 0.87)',
    labelDisabledColor: 'rgba(0, 0, 0, 0.3)'
  },
  raisedButton: {
    color: '#ffffff',
    textColor: 'rgba(0, 0, 0, 0.87)',
    primaryColor: '#2196f3',
    primaryTextColor: '#ffffff',
    secondaryColor: '#f36e21',
    secondaryTextColor: '#ffffff',
    disabledColor: 'rgb(229, 229, 229)',
    disabledTextColor: 'rgba(0, 0, 0, 0.3)',
    fontSize: 14,
    fontWeight: 500
  },
  refreshIndicator: {
    strokeColor: '#e0e0e0',
    loadingStrokeColor: '#2196f3'
  },
  ripple: {
    color: 'rgba(0, 0, 0, 0.87)'
  },
  slider: {
    trackSize: 2,
    trackColor: '#bdbdbd',
    trackColorSelected: '#9e9e9e',
    handleSize: 12,
    handleSizeDisabled: 8,
    handleSizeActive: 18,
    handleColorZero: '#bdbdbd',
    handleFillColor: '#ffffff',
    selectionColor: '#2196f3',
    rippleColor: '#2196f3'
  },
  snackbar: {
    textColor: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
    actionColor: '#f36e21'
  },
  subheader: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontWeight: 500
  },
  stepper: {
    backgroundColor: 'transparent',
    hoverBackgroundColor: 'rgba(0, 0, 0, 0.06)',
    iconColor: '#2196f3',
    hoveredIconColor: '#616161',
    inactiveIconColor: '#9e9e9e',
    textColor: 'rgba(0, 0, 0, 0.87)',
    disabledTextColor: 'rgba(0, 0, 0, 0.26)',
    connectorLineColor: '#bdbdbd'
  },
  svgIcon: {
    color: 'rgba(0, 0, 0, 0.87)'
  },
  table: {
    backgroundColor: '#ffffff'
  },
  tableFooter: {
    borderColor: '#e0e0e0',
    textColor: '#9e9e9e'
  },
  tableHeader: {
    borderColor: '#e0e0e0'
  },
  tableHeaderColumn: {
    textColor: '#9e9e9e',
    height: 56,
    spacing: 24
  },
  tableRow: {
    hoverColor: '#f5f5f5',
    stripeColor: 'rgba(127, 221, 233, 0.4)',
    selectedColor: '#e0e0e0',
    textColor: 'rgba(0, 0, 0, 0.87)',
    borderColor: '#e0e0e0',
    height: 48
  },
  tableRowColumn: {
    height: 48,
    spacing: 24
  },
  tabs: {
    backgroundColor: '#2196f3',
    textColor: 'rgba(255, 255, 255, 0.7)',
    selectedTextColor: '#ffffff'
  },
  textField: {
    textColor: 'rgba(0, 0, 0, 0.87)',
    hintColor: 'rgba(0, 0, 0, 0.3)',
    floatingLabelColor: 'rgba(0, 0, 0, 0.3)',
    disabledTextColor: 'rgba(0, 0, 0, 0.3)',
    errorColor: '#f44336',
    focusColor: '#2196f3',
    backgroundColor: 'transparent',
    borderColor: '#e0e0e0'
  },
  timePicker: {
    color: '#ffffff',
    textColor: '#ffffff',
    accentColor: '#2196f3',
    clockColor: 'rgba(0, 0, 0, 0.87)',
    clockCircleColor: 'rgba(0, 0, 0, 0.07)',
    headerColor: '#2196f3',
    selectColor: '#1976d2',
    selectTextColor: '#ffffff'
  },
  toggle: {
    thumbOnColor: '#2196f3',
    thumbOffColor: '#f5f5f5',
    thumbDisabledColor: '#e0e0e0',
    thumbRequiredColor: '#2196f3',
    trackOnColor: 'rgba(0, 188, 212, 0.5)',
    trackOffColor: '#bdbdbd',
    trackDisabledColor: '#bdbdbd',
    labelColor: 'rgba(0, 0, 0, 0.87)',
    labelDisabledColor: 'rgba(0, 0, 0, 0.3)',
    trackRequiredColor: 'rgba(0, 188, 212, 0.5)'
  },
  toolbar: {
    color: 'rgba(0, 0, 0, 0.54)',
    hoverColor: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: 'rgb(232, 232, 232)',
    height: 56,
    titleFontSize: 20,
    iconColor: 'rgba(0, 0, 0, 0.4)',
    separatorColor: 'rgba(0, 0, 0, 0.175)',
    menuHoverColor: 'rgba(0, 0, 0, 0.1)'
  },
  tooltip: {
    color: '#ffffff',
    rippleBackgroundColor: '#616161'
  },
  zIndex: {
    menu: 1000,
    appBar: 1100,
    drawerOverlay: 1200,
    drawer: 1300,
    dialogOverlay: 1400,
    dialog: 1500,
    layer: 2000,
    popover: 2100,
    snackbar: 2900,
    tooltip: 3000
  },
  isRtl: false,
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56
  },
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: '#2196f3',
    primary2Color: '#1976d2',
    primary3Color: '#bdbdbd',
    accent1Color: '#f36e21',
    accent2Color: '#f5f5f5',
    accent3Color: '#9e9e9e',
    textColor: 'rgba(0, 0, 0, 0.87)',
    secondaryTextColor: 'rgba(0, 0, 0, 0.54)',
    alternateTextColor: '#ffffff',
    canvasColor: '#ffffff',
    borderColor: '#e0e0e0',
    disabledColor: 'rgba(0, 0, 0, 0.3)',
    pickerHeaderColor: '#2196f3',
    clockCircleColor: 'rgba(0, 0, 0, 0.07)',
    shadowColor: 'rgba(0, 0, 0, 1)'
  },
  themeName: 'Light Theme',
  baseTheme: {
    spacing: {
      iconSize: 24,
      desktopGutter: 24,
      desktopGutterMore: 32,
      desktopGutterLess: 16,
      desktopGutterMini: 8,
      desktopKeylineIncrement: 64,
      desktopDropDownMenuItemHeight: 32,
      desktopDropDownMenuFontSize: 15,
      desktopDrawerMenuItemHeight: 48,
      desktopSubheaderHeight: 48,
      desktopToolbarHeight: 56
    },
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: '#2196f3',
      primary2Color: '#1976d2',
      primary3Color: '#bdbdbd',
      accent1Color: '#f36e21',
      accent2Color: '#f5f5f5',
      accent3Color: '#9e9e9e',
      textColor: 'rgba(0, 0, 0, 0.87)',
      secondaryTextColor: 'rgba(0, 0, 0, 0.54)',
      alternateTextColor: '#ffffff',
      canvasColor: '#ffffff',
      borderColor: '#e0e0e0',
      disabledColor: 'rgba(0, 0, 0, 0.3)',
      pickerHeaderColor: '#2196f3',
      clockCircleColor: 'rgba(0, 0, 0, 0.07)',
      shadowColor: 'rgba(0, 0, 0, 1)'
    }
  },
  rawTheme: {
    spacing: {
      iconSize: 24,
      desktopGutter: 24,
      desktopGutterMore: 32,
      desktopGutterLess: 16,
      desktopGutterMini: 8,
      desktopKeylineIncrement: 64,
      desktopDropDownMenuItemHeight: 32,
      desktopDropDownMenuFontSize: 15,
      desktopDrawerMenuItemHeight: 48,
      desktopSubheaderHeight: 48,
      desktopToolbarHeight: 56
    },
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: '#2196f3',
      primary2Color: '#1976d2',
      primary3Color: '#bdbdbd',
      accent1Color: '#f36e21',
      accent2Color: '#f5f5f5',
      accent3Color: '#9e9e9e',
      textColor: 'rgba(0, 0, 0, 0.87)',
      secondaryTextColor: 'rgba(0, 0, 0, 0.54)',
      alternateTextColor: '#ffffff',
      canvasColor: '#ffffff',
      borderColor: '#e0e0e0',
      disabledColor: 'rgba(0, 0, 0, 0.3)',
      pickerHeaderColor: '#2196f3',
      clockCircleColor: 'rgba(0, 0, 0, 0.07)',
      shadowColor: 'rgba(0, 0, 0, 1)'
    }
  }
}

const theme = getMuiTheme(mui)

export default theme
