const host = process.env.REMARK42_HOST
const components = ['embed'] // Your choice of remark42 components

;(function (c) {
  for (let i = 0; i < c.length; i++) {
    const d = document
    const s = d.createElement('script')
    s.src = host + '/web/' + c[i] + '.js'
    s.defer = true
    ;(d.head || d.body).appendChild(s)
  }
})(components)
