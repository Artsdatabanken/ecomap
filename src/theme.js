import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { cyan500, darkBlack, fullBlack } from 'material-ui/styles/colors'

const theme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#aFd0a0',
    primary2Color: '#FFE0B2',
    primary3Color: '#F57C00',
    accent1Color: '#795548',
    //    accent2Color: '#ff0000',//grey100,   accent3Color: '#00ff00',//grey500,
    textColor: '#777777',
    alternateTextColor: '#757575',
    canvasColor: '#ffffff',
    borderColor: '#BDBDBD',
    disabledColor: darkBlack,
    pickerHeaderColor: cyan500,
    clockCircleColor: darkBlack,
    shadowColor: fullBlack
  },
  appBar: {
    color: '#ffffff'
  }
})

export default theme
