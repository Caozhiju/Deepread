const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')

const b = path.join(os.tmpdir(), 'tb.json')
const r = path.join(os.tmpdir(), 'tr.txt')
fs.writeFileSync(b, JSON.stringify({ model: 'moonshotai/kimi-k2.6', messages: [{ role: 'user', content: 'hi' }] }))

const c = spawn('powershell.exe', [
  '-NoProfile', '-ExecutionPolicy', 'Bypass',
  '-File', 'D:\\deepread\\proxy.ps1', b, r
])

let e = ''
c.stderr.on('data', d => e += d)
c.on('close', code => {
  let o
  try { o = fs.readFileSync(r, 'utf8') } catch {}
  fs.unlinkSync(b)
  try { fs.unlinkSync(r) } catch {}
  console.log('exit', code)
  if (o) console.log('result:', o.slice(0, 300))
  if (e) console.log('stderr:', e.slice(0, 100))
})
