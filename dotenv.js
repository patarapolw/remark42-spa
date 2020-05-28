const fs = require('fs')
const { spawnSync } = require('child_process')
fs.readFileSync('.env', 'utf8').split('\n').map((kv) => {
  const [k, v] = kv.split(/=(.+)$/)
  if (!v) {
    return
  }

  spawnSync('qovery', ['application', 'env', 'add', k, v], {
    stdio: 'inherit'
  })
})