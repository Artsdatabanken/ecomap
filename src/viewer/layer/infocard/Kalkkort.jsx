import PropTypes from 'prop-types'
import React from 'react'
import {
  Card,
  CardActions,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

const koder = {
  'KA-1': {
    kode: 'KA-a',
    tittel: 'Svært kalkfattig',
    ingress:
      'i skogsmark karakterisert ved liten artspool med vanlige, nøysomme og vidt utbredte arter og forekomst av typiske podsolprofiler; jord typisk dannet av kvartsitt og sparagmitt (og gneis og granitt; anortositt på Sørvestlandet)',
    mertekst: 'masse tekst.',
    url: '',
    foto:
      'https://www.ngu.no/sites/default/files/styles/profilbilde/public/NGUW10303.jpg?itok=XmM5cPuK'
  },
  'KA-2': {
    kode: 'KA-b',
    tittel: 'litt kalkfattig',
    ingress:
      'I skogsmark karakterisert ved forekomst av typiske podsolprofiler; jord typisk dannet av gneis og granitt (grunnfjellsbergarter).',
    mertekst: 'masse tekst.',
    foto:
      'http://www.ngu.no/sites/default/files/styles/fullstorrelse/public/NGUW10494.jpg?itok=4nqvIvWd'
  },
  'KA-3': {
    kode: 'KA-d',
    tittel: 'intermediær',
    ingress:
      'i skogsmark karakterisert ved forekomst av podsol-liknende jordprofiler; jord typisk dannet av fattigere skiferbergarter, amfibolitt og sandstein',
    mertekst: 'masse tekst.',
    foto:
      'http://www.ngu.no/sites/default/files/styles/fullstorrelse/public/NGUW10493.jpg?itok=5CkQBhD0'
  },
  'KA-4': {
    kode: 'KA-g',
    tittel: 'temmelig kalkrik',
    ingress:
      'I skogsmark karakterisert ved forekomst av ekte brunjordsprofiler; jord typisk dannet av glimmerskifer og fyllitter.',
    mertekst: 'masse tekst.',
    foto:
      'https://www.ngu.no/sites/default/files/styles/profilbilde/public/NGUW10357.jpg?itok=8Pjz_yas'
  },
  'KA-5': {
    kode: 'KA-h',
    tittel: 'svært kalkrik',
    ingress:
      'Karakterisert ved forekomst svært stor artspool med mange mindre vanlige arter; jord typisk dannet av reine karbonatbergarter som kalkstein, dolomitt og marmor; ekstremtrinnet (i) omfatter steder med direkte innflytelse fra karbonatbergarter, f.eks. nakent kalkberg.',
    mertekst: 'masse tekst.',
    foto:
      'https://www.ngu.no/sites/default/files/styles/profilbilde/public/NGUW10365.jpg?itok=7OB7Mllf'
  }
}

class Kalkkort extends React.Component {
  static propTypes = {
    kode: PropTypes.string.isRequired,
    properties: PropTypes.any.isRequired
  }
  static listProperties (props) {
    return Object.keys(props)
      .filter(x => props[x])
      .filter(
        x =>
          'TEGNFORKLA_SHAPE_Area_SHAPE_Leng_OBJECTID_OBJEKTTYPE'.indexOf(x) < 0
      )
      .map(key =>
        <TableRow key={key}>
          <TableRowColumn>
            {Kalkkort.prettifyKey(key)}
          </TableRowColumn>
          <TableRowColumn>
            <b>
              {Kalkkort.describe(key, props[key])}
            </b>
          </TableRowColumn>
        </TableRow>
      )
  }

  static describe (key, value) {
    switch (key) {
      case 'HOVEDBER_1':
      case 'TILLEGGS_1':
      case 'TILLEGGS_3':
        const url = 'https://www.ngu.no/emne/' + value.toLowerCase()
        return (
          <a target='#top' href={url}>
            {Kalkkort.encodingHack(value)}
          </a>
        )
      default:
        return value
    }
  }

  static prettifyKey (key) {
    switch (key) {
      case 'HOVEDBERGA':
        return 'Hovedbergart nr'
      case 'HOVEDBER_1':
        return 'Hovedbergart'
      case 'TILLEGGSBE':
        return 'Tilleggsbergart nr'
      case 'TILLEGGS_1':
        return 'Tilleggsbergart'
      case 'TILLEGGS_2':
        return 'Tilleggsbergart 2 nr'
      case 'TILLEGGS_3':
        return 'Tilleggsbergart 2'
      case 'KALKINNHOL':
        return 'Kalkinnhold (1-5)'
      case 'KALKINNH_1':
        return 'Kalkinnhold tilleggsbergart (1-5)'
      case 'KALKINNH_2':
        return 'Kalkinnhold tilleggsbergart 2 (1-5)'
      default:
        return key
    }
  }

  static encodingHack (input) {
    return input.replace('�', 'å').replace('�', 'ø').replace('�', 'ø')
  }
  render () {
    const data = koder[this.props.kode]
    if (!data) {
      return <span />
    }
    const kprops = this.props.properties
    const title = Kalkkort.encodingHack(kprops.TEGNFORKLA)
    //    const title = kprops.UNDERBER_1 ? kprops.HOVEDBER_1 + " med " + kprops.UNDERBER_1 : kprops.HOVEDBER_1
    const subtitle = 'Kalkinnhold: ' + data.tittel + ' (' + data.kode + ')'
    return (
      <Card>
        <CardMedia
          actAsExpander
          showExpandableButton
          overlay={<CardTitle title={title} subtitle={subtitle} />}
        >
          <img src={data.foto} width={'25%'} alt='todo' />
        </CardMedia>
        <CardText expandable>
          {data.ingress}
          <br />
          <a target='#top' href='http://artsdatabanken.no/Pages/179743'>
            http://artsdatabanken.no/Pages/179743
          </a>
        </CardText>
        <CardText expandable>
          <div style={{ textAlign: 'center' }}>
            Data levert 2016 av<br />
            <a href='http://www.ngu.no/' target='#top'>
              <img
                width='25%'
                src='https://www.ngu.no/sites/all/themes/ngu/images/ngulogo.svg'
                alt='logo'
              />
            </a>
          </div>
        </CardText>
        <CardText expandable>
          <Table multiSelectable={false}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableHeaderColumn>Egenskap</TableHeaderColumn>
              <TableHeaderColumn>Verdi</TableHeaderColumn>
            </TableHeader>
            <TableBody displayRowCheckbox={false} stripedRows>
              {Kalkkort.listProperties(this.props.properties)}
            </TableBody>
          </Table>
        </CardText>
        <CardActions expandable>
          <FlatButton label='Gjør noe' />
          <FlatButton label='Eller ikke' />
        </CardActions>
      </Card>
    )
  }
}

export default Kalkkort
