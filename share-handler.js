function handleSharedText() {
  const params = new URLSearchParams(window.location.search)
  const sharedText = params.get('text')
  const sharedTitle = params.get('title')
  const sharedUrl = params.get('url')

  if (sharedText) {
    console.log('收到分享文本:', sharedText)
    console.log('分享标题:', sharedTitle || '(无)')
    console.log('分享链接:', sharedUrl || '(无)')
  }
}

handleSharedText()
