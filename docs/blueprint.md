# **App Name**: Blazor Chat UI

## Core Features:

- Chat Window Display: Display messages in a scrollable chat window with user/assistant bubbles and timestamps.
- Message Input: Multiline text area for composing and sending messages with ⌘-Enter / Ctrl-Enter submit.
- Code Block Rendering: Render fenced code blocks from assistant replies with syntax highlighting using `react-syntax-highlighter`.
- State Persistence: Persist chat history to localStorage to restore the session on refresh.
- Loading State: Loading indicator shown while awaiting a response from the local REST endpoint.
- Accessibility Support: Ensure all interactive elements have proper aria-labels, focus rings, and live-region announcements for new assistant messages for improved accessibility.
- API Communication: Thin fetch helper reads `NEXT_PUBLIC_CHAT_API_URL` so the base URL can be swapped easily to send the POST request to the local RAG backend.

## Style Guidelines:

- Primary color: Deep indigo (#4F46E5), evoking focus and knowledge.
- Background color: Light gray (#F9FAFB), providing a clean, unobtrusive backdrop.
- Accent color: Teal (#38BDF8), highlighting interactive elements.
- Body and headline font: 'Inter', a grotesque-style sans-serif, to ensure readability.
- Code font: 'Source Code Pro' for displaying code snippets.
- Utilize `shadcn/ui` primitives for consistent cards, buttons, and inputs styled with Tailwind CSS. The chat window employs a scrollable flex column for message display.
- Implement subtle animations for loading states to enhance user experience during message processing.