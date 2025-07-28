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
  const baseUrl = process.env.NEXT_PUBLIC_CHAT_API_URL || 'http://localhost:8000';
  const apiUrl = `${baseUrl}/v1/chat`;

  // The RAG API expects only the latest user message, not the full history
  const latestMessage = messages[messages.length - 1];
  
  try {
    console.log('Making API request to:', apiUrl);
    console.log('Request body:', JSON.stringify({ query: latestMessage.content }));
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // The backend expects an object with a "query" key
      body: JSON.stringify({ query: latestMessage.content }), 
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    
    // According to the API spec, the response is in `data.answer`
    if (typeof data.answer !== 'string') {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format from API');
    }

    return data.answer;
  } catch (error) {
    console.error('Error fetching chat response:', error);
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    // Re-throw the error to be handled by the calling function
    throw error;
  }
}
