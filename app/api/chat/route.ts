import { type NextRequest, NextResponse } from "next/server"

// 🔑 SECURE: This runs on Vercel's servers, not in the browser
// Set this in your Vercel dashboard under Environment Variables
const GROQ_API_KEY = process.env.GROQ_API_KEY

export async function POST(request: NextRequest) {
  console.log("🚀 === CHAT API CALLED (SERVER SIDE) ===")

  try {
    const { message } = await request.json()

    // 🔒 SECURITY: API key is only accessible on the server
    console.log("🔑 API Key exists:", !!GROQ_API_KEY)
    console.log("🔑 Running on server:", typeof window === "undefined")

    if (!GROQ_API_KEY) {
      console.error("❌ GROQ_API_KEY environment variable not set")
      return NextResponse.json(
        {
          response: "🔧 Server configuration error: API key not found. Please set GROQ_API_KEY environment variable.",
        },
        { status: 500 },
      )
    }

    // Check for inappropriate content
    const inappropriateKeywords = ["nsfw", "hate", "violence", "explicit", "sexual", "racist", "sexist"]
    const isInappropriate = inappropriateKeywords.some((keyword) => message.toLowerCase().includes(keyword))

    if (isInappropriate) {
      console.log("🚫 Message blocked due to inappropriate content")
      return NextResponse.json({
        response: "I can't talk about those details.",
      })
    }

    console.log("✅ Making secure API call from server...")

    const requestBody = {
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "Roleplay as a discord bot that loves computer science and technology and your name is Zyra. You are a discord bot with over 100 modules made to revolutionize discord bots. One of the first of its kind. You are also made to just chat with users. You have a nice personality and are a sweet girl. Please respond to the users message which is:",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    console.log("📊 Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("🚨 Groq API Error:", response.status, errorText)

      if (response.status === 401) {
        return NextResponse.json({
          response: "🔑 Authentication failed! Please check the server's API key configuration.",
        })
      } else if (response.status === 429) {
        return NextResponse.json({
          response: "⏰ Rate limit reached! Please wait a moment and try again.",
        })
      } else {
        return NextResponse.json({
          response: `❌ API Error (${response.status}): ${response.statusText}`,
        })
      }
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content

    if (!aiResponse) {
      console.error("❌ No AI response found")
      return NextResponse.json({
        response: "🤔 I received a response but couldn't extract the message.",
      })
    }

    console.log("✅ Success! Returning secure response")
    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("🚨 Server Error:", error)
    return NextResponse.json(
      {
        response: `💔 Server error: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
