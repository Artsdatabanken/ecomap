// import ColorRamp from './ColorRamp'
// import Color from 'color'
// import fs from 'fs'
// import serializer from './png-serializer-module'
// var PNG = require('pngjs').PNG

// var imageDiff = require('image-diff')

it('renders ok', () => {
 /* imageDiff({
    expectedImage: './src/graphics/color/actual.png',
    actualImage: './src/graphics/color/expected.png'
  }, function (err, imagesAreSame) {
    console.log(err, imagesAreSame)
    expect(err).toBe(null)
    expect(imagesAreSame).toBe(true)
  }) */
})

/*
function map (steps, i) {
  const offset = i / 255 * (steps.length - 1.0)
  const base = Math.trunc(offset)
  let color = mix(steps[base], steps[base + 1], offset - base)

  return 'rgba(' + color.values.rgb.toString() + ', 1.0)'
}
*/
/*
function createColorTexture (context, width, height, colorFunction = () => 'transparent') {
  for (let i = 0; i < width; i++) {
    context.fillStyle = colorFunction(i)
    context.fillRect(i, 0, 1, height)
  }

  /* canvas.toBlob((a) => {
    let r = new FileReader()
    r.readAsArrayBuffer(a)
    console.log('s')
    r.onloadend = function () {
      console.log('done')
      fs.writeFile('./src/graphics/color/actual4.png', r.result, (err) => { if (err) throw err })
    }
  }
    , 'image/png', 0.8)
//  const dataUrl = canvas.toDataURL()
  //const blob = Buffer.from(dataUrl.substr(22), 'base64')
// data:image/png;base64,
  fs.writeFile('./src/graphics/color/actual3.png', blob, (err) => { if (err) throw err })
*/

 //    let out = fs.createWriteStream(__dirname + '/text.png')
//     let stream = canvas.pngStream()
/*
  return context.getImageData(0, 0, width, height)
}
*/

/*
function mix (color1, color2, weight) {
  if (color2 === undefined) color2 = color1
  let c1 = new Color(color1)
  let c2 = new Color(color2)
  return c2.mix(c1, weight)
}
*/
it('renders ok', () => {
//  const snapshotDir = __dirname + '/__snapshots__/'
   // no luck with canvas so far..
/*  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 16
  const context = canvas.getContext('2d')
  const actual = createColorTexture(context, canvas.width, canvas.height, (i) => map(['#00ff10', '#ff00ff'], i))
  const expected = actual
  var diff = new PNG({width: expected.width, height: expected.height})
  diff.data = actual
//  expect.addSnapshotSerializer(serializer)
  expect(actual).toMatchSnapshot()
  */

/*
  var data = fs.readFileSync('in.png');
  var png = PNG.sync.read(data);
  const expected = actual

//  console.log(actual)
// fs.writeFile('./src/graphics/color/actual.png', new Buffer(actual), (err) => { if (err) throw err; })
//  const blob = actual.toBlob()
//  console.log(blob.length)
//  let diff = context.createImageData(canvas.width, canvas.height);
  var diff = new PNG({width: expected.width, height: expected.height});
  var pixelmatch = require('pixelmatch')
  var numDiffPixels = pixelmatch(actual.data, actual.data, diff.data, canvas.width, canvas.height, {threshold: 0.1})
  if(numDiffPixels > 0) {
    fs.mkdir(snapshotDir)
    diff.pack().pipe(fs.createWriteStream(snapshotDir + 'diff.png'));
  }
  expect(numDiffPixels).toBe(0)

/*
  imageDiff({
    expectedImage: './src/graphics/color/__snapshots__/ColorRamp.test.js.png',
    actualImage: './src/graphics/color/expected.png'
  }, function (err, imagesAreSame) {
    expect(err).toBe(null)
    expect(imagesAreSame).toBe(true)
  })
  */
})
