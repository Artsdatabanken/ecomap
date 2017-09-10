import React from 'react'
import PropTypes from 'prop-types'

function increment (state) { return { loading: state.loading + 1 } }
function decrement (state) { return { loading: state.loading - 1 } }

function checkStatus (r) {
  if (r.status !== 200) { throw new Error(r.statusText + ' (HTTP ' + r.status + ')') }
  return r
}

class FetchContainer extends React.Component {
  state = { loading: 0 }

  render () {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        isLoading: this.state.loading > 0,
        message: this.state.message
      })
    )

    return <div>
      <div>{childrenWithProps}</div>
    </div>
  }

  static childContextTypes = {
    fetchJson: PropTypes.func,
    fetchImage: PropTypes.func
  }

  getChildContext = () => ({
    fetchJson: this.handleFetchJson,
    fetchImage: this.handleFetchImage
  })

  handleFetchImage = (description, url, callback) => {
    let img = new Image()
    var ctx = this.ctx
    img.onload = function () {
      console.log('img', img)
      callback(img)
//      console.log('this.ctx', ctx)
      //      var canvas = document.getElementById('body')
  //    console.log(canvas)
//      var ctx = canvas.getContext('2d')
 //     ctx.drawImage(img, 0, 0)
  //    console.log(ctx)
//      this.setState('img', ctx)
   //   return ctx
//        callback(canvas)
    }
    img.src = url// 'http://myserver/nextimage.cgi'
  /*  this.handleFetch(description, url, response => {
      const image = new Image(response.blob())
      copyCanvas(image)
//      image.src = URL.createObjectURL(response.blob())
//      var canvas = document.getElementById('canvas');
      callback(image)
    }) */
  }

  handleFetchJson = (description, url, callback) => {
    this.handleFetch(description, url, response => {
      const json = response.json()
      callback(json)
    })
  }

  handleFetch = (description, url, callback) => {
    this.flashMessage(`Loading ${description}...`)
    this.setState(increment)
    fetch(url)
      .then(checkStatus)
      .then(response => {
        if (!response.ok) throw new Error(response)
        callback(response)
        this.setState(decrement)
      }).catch(error => {
        this.setState(decrement)
        const message = description + ': ' + error.message
        console.error(message)
        this.flashMessage(message)
      })
  }

  flashMessage (message) {
    this.setState({ message })
    clearTimeout(this.messageTimer)
    this.messageTimer = window.setTimeout(() => this.setState({ message: null }), 3500)
  }
}

export default FetchContainer
