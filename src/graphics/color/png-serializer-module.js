module.exports = {
  print (val, serialize, indent) {
//    console.log("____")
    return serialize(val)
  },

  test (val) {
    console.log(val)
    const r = val && val.hasOwnProperty('Stream')
//    console.log("!!!"+r)
    return r
  }
}
