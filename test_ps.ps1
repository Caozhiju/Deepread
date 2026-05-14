$body = '{"model":"moonshotai/kimi-k2.6","messages":[{"role":"user","content":"hi"}]}'
$key = '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'
try {
  $r = Invoke-WebRequest -Uri 'https://integrate.api.nvidia.com/v1/chat/completions' -Method POST -Body $body -ContentType 'application/json' -Headers @{Authorization = "Bearer $key"} -UseBasicParsing -TimeoutSec 30
  Write-Host 'OK:' $r.Content.Substring(0, [Math]::Min(100, $r.Content.Length))
} catch {
  Write-Host 'FAIL:' $_.Exception.Message
}
