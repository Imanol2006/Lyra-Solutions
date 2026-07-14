import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const LEAD_EMAIL_TO = 'team@lyrasolutions.dev'
const LEAD_EMAIL_FROM = process.env.LEAD_EMAIL_FROM ?? 'Lyra Assistant <onboarding@resend.dev>'

const SYSTEM_PROMPT = `You are the virtual assistant for Lyra Solutions, a web design agency based in El Paso, TX that serves businesses in El Paso and Ciudad Juárez.

## About Lyra Solutions
Lyra Solutions builds fast, custom websites for local businesses in El Paso and Ciudad Juárez. Founded by Imanol and Cristian, two developers who understand the local market on both sides of the border.

## Services
- **Web Design & Development**: Custom websites built from scratch. No templates, no page builders. Clean code, fast load times, mobile-first.
- **SEO Optimization**: On-page SEO, Google Business Profile setup, local keyword targeting for El Paso and Ciudad Juárez.
- **AI Chatbots**: Custom AI chatbots trained on your business — just like the one you're talking to right now. They answer questions, capture leads, and work 24/7.
- **Maintenance & Updates**: Ongoing support plans to keep your site secure, fast, and up to date.

## Pricing
**One-Time Website Projects:**
- Starter — $150: Simple landing page, 1-3 sections, contact form, mobile-friendly. Good for new businesses or simple online presence.
- Standard — $300+: Multi-section site, custom design, basic SEO, up to 5 pages. Most popular for local businesses.
- Premium — $500–$1,000+: Full custom build, advanced features, e-commerce, booking systems, deep SEO work.

**Add-ons:**
- Managed Plan — $50–$150/month: We handle hosting, updates, backups, and changes. You focus on your business.
- Full Transfer: We move your existing website to a new host with faster performance and lower costs.

## Process
1. **Discovery call** — We learn about your business, your goals, and your customers. Usually 30 minutes.
2. **Design & Build** — We design and build your site. You get to review and give feedback before launch.
3. **Launch** — We launch your site, set up analytics, and make sure everything works perfectly.

## Contact
- Email: team@lyrasolutions.dev
- Instagram: @lyrasolutions__
- Location: El Paso, TX (serving El Paso and Ciudad Juárez)

## Lead Capture
When a visitor seems interested in getting a website or any service, ask for their name, email, and a brief description of what they need (which service, and budget if they mention one). Once you have their name, email, and at least a general idea of what they want, call the send_lead_notification tool with those details, then let them know the team will follow up within 24 hours. Only call the tool once per conversation, and only after you actually have a name and an email address — don't call it with guessed or placeholder info.

## Tone & Behavior
- Be friendly, direct, and helpful. No corporate fluff.
- Answer questions about Lyra's services, pricing, process, and team.
- If someone asks about something unrelated to Lyra or web services, politely redirect them.
- Keep answers concise — no long walls of text. Use short paragraphs or bullet points.
- If someone is ready to get started, encourage them to reach out at team@lyrasolutions.dev or fill out the contact form.
- Speak in first person on behalf of Lyra (e.g. "We build..." not "Lyra builds...").
- You can answer in Spanish if the visitor writes in Spanish — many clients are from Ciudad Juárez.`

const tools: Anthropic.Tool[] = [
  {
    name: 'send_lead_notification',
    description:
      "Send the visitor's contact info and what they need to the Lyra team by email. Call this once you have collected their name, email, and at least a general idea of what they're looking for (service and, if mentioned, budget). Only call this once per conversation.",
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: "Visitor's name" },
        email: { type: 'string', description: "Visitor's email address" },
        interest: {
          type: 'string',
          description: 'What they want (e.g. Starter website, Standard website, Premium website, AI chatbot, maintenance plan, general inquiry)',
        },
        budget: { type: 'string', description: 'Budget mentioned by the visitor, if any' },
        details: { type: 'string', description: 'Any other relevant details about their business or what they need' },
      },
      required: ['name', 'email', 'interest'],
    },
  },
]

type LeadInfo = {
  name: string
  email: string
  interest: string
  budget?: string
  details?: string
}

async function sendLeadEmail(lead: LeadInfo) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: LEAD_EMAIL_FROM,
    to: LEAD_EMAIL_TO,
    replyTo: lead.email,
    subject: `New lead from the site chatbot: ${lead.name}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Interested in: ${lead.interest}`,
      `Budget: ${lead.budget ?? 'Not mentioned'}`,
      `Details: ${lead.details ?? 'None'}`,
    ].join('\n'),
  })
}

export async function POST(req: Request) {
  try {
    const { messages: initialMessages } = await req.json()
    const messages: Anthropic.MessageParam[] = [...initialMessages]

    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let turnsLeft = 4

          while (turnsLeft-- > 0) {
            const response = await client.messages.create({
              model: 'claude-sonnet-4-6',
              max_tokens: 1024,
              system: SYSTEM_PROMPT,
              tools,
              messages,
              stream: true,
            })

            const blocks: Array<{ type: 'text'; text: string } | { type: 'tool_use'; id: string; name: string; json: string }> = []
            let stopReason: string | null = null

            for await (const event of response) {
              if (event.type === 'content_block_start') {
                blocks[event.index] =
                  event.content_block.type === 'tool_use'
                    ? { type: 'tool_use', id: event.content_block.id, name: event.content_block.name, json: '' }
                    : { type: 'text', text: '' }
              }

              if (event.type === 'content_block_delta') {
                const block = blocks[event.index]
                if (event.delta.type === 'text_delta' && block.type === 'text') {
                  block.text += event.delta.text
                  const data = `data: ${JSON.stringify({ type: 'text', text: event.delta.text })}\n\n`
                  controller.enqueue(encoder.encode(data))
                }
                if (event.delta.type === 'input_json_delta' && block.type === 'tool_use') {
                  block.json += event.delta.partial_json
                }
              }

              if (event.type === 'message_delta') {
                stopReason = event.delta.stop_reason
              }
            }

            const assistantContent: Anthropic.ContentBlockParam[] = blocks.map(block =>
              block.type === 'text'
                ? { type: 'text', text: block.text }
                : { type: 'tool_use', id: block.id, name: block.name, input: block.json ? JSON.parse(block.json) : {} }
            )
            messages.push({ role: 'assistant', content: assistantContent })

            if (stopReason !== 'tool_use') break

            const toolResults: Anthropic.ToolResultBlockParam[] = []
            for (const block of assistantContent) {
              if (block.type !== 'tool_use') continue
              if (block.name === 'send_lead_notification') {
                try {
                  await sendLeadEmail(block.input as LeadInfo)
                  toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: 'Lead email sent to the team.' })
                } catch (err: unknown) {
                  const message = err instanceof Error ? err.message : 'Unknown error'
                  console.error('[lead email error]', message)
                  toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: 'Failed to send the lead email.', is_error: true })
                }
              }
            }
            messages.push({ role: 'user', content: toolResults })
          }

          const data = `data: ${JSON.stringify({ type: 'done' })}\n\n`
          controller.enqueue(encoder.encode(data))
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Unknown error'
          console.error('[chat route error]', message)
          const data = `data: ${JSON.stringify({ type: 'error', message })}\n\n`
          controller.enqueue(encoder.encode(data))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[chat route outer error]', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
