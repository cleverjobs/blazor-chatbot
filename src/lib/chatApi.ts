export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// This interface is based on the provided API spec.
// Note that the API expects a slightly different message format in the request.
interface ApiRequestMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function getChatResponse(messages: Message[]): Promise<string> {
  const apiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL || 'http://localhost:8000/v1/chat';

  // The RAG API expects only the message history, not timestamps.
  const apiMessages: ApiRequestMessage[] = messages.map(({ role, content }) => ({
    role,
    content,
  }));

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // The backend expects an object with a "messages" key.
      body: JSON.stringify({ messages: apiMessages }), 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    // According to the spec, the response is in `data.response.content`
    if (typeof data.response?.content !== 'string') {
        throw new Error('Invalid response format from API');
    }

    return data.response.content;
  } catch (error) {
    console.error('Error fetching chat response:', error);
    // Re-throw the error to be handled by the calling function
    throw error;
  }
}
