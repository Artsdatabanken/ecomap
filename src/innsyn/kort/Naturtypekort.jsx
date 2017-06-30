import PropTypes from 'prop-types'
import React from 'react'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import ThumbL1 from './L1.jpg'
import ThumbT4 from './T4.jpg'
import ThumbT44 from './T44.jpg'

const ninkoder = {
  L1: {
    ninkode: 'L1',
    tittel: 'Grunn limnisk fastbunn',
    ingress: 'Eufotisk fast ferskvannsbunn omfatter elvebunn og innsjøbunn med stabilt bunnsub' +
      'strat og tilstrekkelig lysinnstråling til at nettofotosyntesen er positiv.',
    mertekst: 'Eufotisk fast ferskvannsbunn omfatter fast fjell og, i innsjøer og elver med sva' +
      'k strøm, også blokk- og steindominert bunn. Karplantevegetasjon mangler vanligvi' +
      's. Påvekstsamfunnene domineres av moser og/eller grønnalger. Samfunn av insekter' +
      ', f.eks. steinfluer Plecoptera og vårfluer Trichoptera, kan forekomme.',
    foto: ThumbL1
  },
  T4: {
    ninkode: 'T4',
    tittel: 'Skogsmark',
    ingress: 'Skogsmark omfatter alle fastmarksarealer som tilfredsstiller skogsmarksdefinisjo' +
      'nen og som ikke påvirkes av flom.',
    mertekst: 'Skogsmark er naturlig mark som er sterkt preget av langvarig innflytelse fra træ' +
      'r og som ved et gitt tidspunkt er tresatt eller som i nær fortid har vært og i n' +
      'ær framtid forventes igjen å være tresatt. Mark der gjentatte forstyrrelser, inn' +
      'grep eller liknende over lengre tid har forhindret utvikling av ny tresatt mark ' +
      'er ikke skogsmark. Fastmarksskogsmark omfatter nesten all skogsmark på fastmark ' +
      'i Norge, og dekker dermed størstedelen av landarealet under skoggrensa. Skogbruk' +
      'saktivitet og annen bruk gir opphav til stor variasjon langs tilstandsøkokliner ' +
      'og i objektinnhold. Skogsmarksøkosystemets strukturkompleksitet (sjiktning, fore' +
      'komst av livsmedier på levende og død ved etc.) gjør at det huser en betydelig a' +
      'ndel av organismemangfoldet i Norge. Mange arter er spesifikt knyttet til fastma' +
      'rksskogsmark.',
    foto: ThumbT4
  },
  T44: {
    ninkode: 'T44',
    tittel: 'Åker',
    ingress: 'Åker er fulldyrket mark som er pløyd og tilsådd, oftest også gjødslet og/eller s' +
      'prøytet, der det dyrkes mat- eller fôrvekster, gjerne i monokultur. Åker omfatte' +
      'r jordbruksmark med intensiv hevd og hyppig markbearbeiding, og har en artssamme' +
      'nsetning av «ville» arter som hovedsakelig består av ettårige eller kortlevete u' +
      'gras.',
    mertekst: '– Oppløyd mark som tilplantes med trær og busker for bioenergiproduksjon, produk' +
      'sjon av prydplanter, f.eks. juletreplantasjer på tidligere kornåkrer, skal tilor' +
      'dnes T38 Treplantasje.<br/>– «Kultureng» (jf. Norderhaug et al. 1999), i betydni' +
      'ngen fulldyrket eng der det dyrkes grasvekster, skal typifiseres som Åker når de' +
      'n inngår i regelmessig rotasjon med korn.</br>– Et åkerareal under gjengroing sk' +
      'al tilordnes T44 inntil en ettersuksesjonstilstand er nådd, det vil si når artss' +
      'ammensetning og økologiske prosesser typisk for skogsmark er etablert. Dersom gj' +
      'engroingssuksesjonen går via faser med stor busk- og/eller tresjiktstetthet elle' +
      'r andre flaskehalser for nye arters etablering slik at artssammensetningen ikke ' +
      'gir grunnlag for å avgjøre om ettersuksesjonstilstanden er nådd, skal et gjengro' +
      'ingsareal tilordnes skogsmarkshovedtypen når skogbestandet tilfredsstiller krite' +
      'riene for gammel normalskog (7SD–NS∙5).',
    foto: ThumbT44
  },
  'KA-1': {
    ninkode: 'KA-a',
    tittel: 'Svært kalkfattig',
    ingress: 'ingress...',
    mertekst: 'masse tekst.',
    foto: 'https://www.ngu.no/sites/default/files/styles/profilbilde/public/NGUW10303.jpg?itok=XmM5cPuK'
  },
  'KA-2': {
    ninkode: 'KA-b',
    tittel: 'litt kalkfattig',
    ingress: 'ingress...',
    mertekst: 'masse tekst.',
    foto: 'http://www.ngu.no/sites/default/files/styles/fullstorrelse/public/NGUW10494.jpg?itok=4nqvIvWd'
  },
  'KA-3': {
    ninkode: 'KA-d',
    tittel: 'intermediær',
    ingress: 'ingress...',
    mertekst: 'masse tekst.',
    foto: 'http://www.ngu.no/sites/default/files/styles/fullstorrelse/public/NGUW10493.jpg?itok=5CkQBhD0'
  },
  'KA-4': {
    ninkode: 'KA-g',
    tittel: 'temmelig kalkrik',
    ingress: 'ingress...',
    mertekst: 'masse tekst.',
    foto: 'https://www.ngu.no/sites/default/files/styles/profilbilde/public/NGUW10357.jpg?itok=8Pjz_yas'
  },
  'KA-5': {
    ninkode: 'KA-h',
    tittel: 'svært kalkrik',
    ingress: 'ingress...',
    mertekst: 'masse tekst.',
    foto: 'https://www.ngu.no/sites/default/files/styles/profilbilde/public/NGUW10365.jpg?itok=7OB7Mllf'
  }
}

class Naturtypekort extends React.Component {
  static propTypes = {
    ninkode: PropTypes.string.isRequired,
    properties: PropTypes.any.isRequired
  };
  static listProperties (props) {
    return Object
      .keys(props)
      .map(key => (
        <TableRow key={key}>
          <TableRowColumn>
            { key }
          </TableRowColumn>
          <TableRowColumn>
            <b>{ props[key] }</b>
          </TableRowColumn>
        </TableRow>
      ))
  }

  render () {
    console.log(this.props.ninkode)
    const data = ninkoder[this.props.ninkode]
    if (!data) {
      return <span />
    }
    return (
      <Card>
        <CardMedia
          actAsExpander
          showExpandableButton overlay={
            <CardTitle title={data.tittel} subtitle={data.ninkode} />}
        >
          <img src={data.foto} width={340} alt='todo' />
        </CardMedia>
        <CardText expandable>
          { data.ingress }
        </CardText>
        <CardText expandable>
          <Table multiSelectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
              <TableHeaderColumn>Prop</TableHeaderColumn>
              <TableHeaderColumn>Val</TableHeaderColumn>
            </TableHeader>
            <TableBody displayRowCheckbox={false} stripedRows>
              { Naturtypekort.listProperties(this.props.properties) }
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

export default Naturtypekort
