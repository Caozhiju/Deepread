param($BodyPath, $ResultPath)
$key = "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"
$body = Get-Content -Path $BodyPath -Raw -Encoding UTF8
try {
  $r = Invoke-WebRequest -Uri "https://integrate.api.nvidia.com/v1/chat/completions" -Method POST -Body $body -ContentType "application/json" -Headers @{Authorization = "Bearer $key"} -UseBasicParsing -TimeoutSec 120
  $r.Content | Out-File -FilePath $ResultPath -Encoding UTF8
  exit 0
} catch {
  "ERROR: $($_.Exception.Message)" | Out-File -FilePath $ResultPath -Encoding UTF8
  exit 1
}
