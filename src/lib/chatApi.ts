export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export async function getChatResponse(messages: Message[]): Promise<string> {
  const apiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL || 'http://localhost:8000/api/chat';

  // TODO: Implement WebSocket streaming for real-time updates
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // The backend expects the full conversation history to maintain context.
      body: JSON.stringify({ messages }), 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    // Assuming the API returns a JSON object like { "response": "The answer is..." }
    const data = await response.json();
    
    if (typeof data.response !== 'string') {
        throw new Error('Invalid response format from API');
    }

    return data.response;
  } catch (error) {
    console.error('Error fetching chat response:', error);
    // Re-throw the error to be handled by the calling function
    throw error;
  }
}
