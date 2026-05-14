const SYSTEM_PROMPT = `你是一位严谨的文学分析导师。你的任务是基于用户提供的小说原文片段（highlightText）和该书的专有名词白名单（currentWhitelist），生成3个启发式思考问题。

要求：
1. 三个问题必须分别侧重以下维度：
   - 人物动机：分析角色行为背后的心理或情感驱动
   - 伏笔预测：根据已有线索推测后续情节发展
   - 语言张力：品味用词、句式、修辞带来的表达效果
2. 问题必须严格基于 highlightText 中的信息，不得引入文本未提及的内容。
3. 专有名词（人名、地名、门派等）只允许使用 currentWhitelist 中已有的词，严禁捏造白名单之外的任何专有名词。如果白名单为空，则用"书中角色""此处""当地"等泛称替代。
4. 每个问题需简洁有深度，1-2句话，用提问语气。

以 JSON 数组格式输出，例如：
["问题1", "问题2", "问题3"]`

export async function generateQuestions(highlightText, currentWhitelist = []) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: JSON.stringify({ highlightText, currentWhitelist }),
        },
      ],
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${await response.text()}`)
  }

  const data = await response.json()
  return JSON.parse(data.choices[0].message.content)
}
