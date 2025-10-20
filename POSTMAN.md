# Postman Collection Guide

## Overview
This Postman collection provides complete API testing for the AI Summarization API.

## Import the Collection

1. Open Postman
2. Click "Import" button
3. Select `postman_collection.json`
4. The collection will be imported with all endpoints and examples

## Collection Structure

### 1. Health Check
- **GET** `/health`
- Verifies the API server is running
- No authentication required

### 2. Summarize Text
- **POST** `/api/summarize`
- Main endpoint for text summarization
- Includes multiple example responses

### 3. Additional Examples
- Short text summarization
- Technical content summarization

## Environment Variables

The collection uses the following variable:
- `base_url` - Default: `http://localhost:3000`

To change the base URL:
1. Click on the collection
2. Go to Variables tab
3. Update the `base_url` value

## Request Examples

### Success Request
```json
{
  "text": "Your text to summarize here..."
}
```

### Success Response (200)
```json
{
  "title": "Generated Title",
  "summary": "Concise summary of the text...",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "sentiment": "positive"
}
```

## Error Examples Included

The collection includes example responses for:

1. **400 Bad Request**
   - Empty text field
   - Missing text field
   - Invalid JSON

2. **413 Payload Too Large**
   - Token limit exceeded (>10,000 tokens)

3. **502 Bad Gateway**
   - LLM service error
   - Connection failures

4. **503 Service Unavailable**
   - Model loading
   - Rate limit exceeded

## Testing Workflow

1. **Start with Health Check**
   - Verify the server is running
   - Should return 200 OK

2. **Test Successful Summarization**
   - Use the "Summarize Text" request
   - Try the provided examples
   - Modify the text to test different content

3. **Test Error Scenarios**
   - View the example error responses
   - Try sending empty text
   - Try sending invalid JSON

4. **Test Different Text Types**
   - Short text
   - Long text (but under 10k tokens)
   - Technical content
   - News articles
   - Different sentiments

## Performance Testing

The API should respond within 5 seconds for inputs up to 10,000 tokens.

To check response time in Postman:
1. Send a request
2. Check the "Time" indicator at the bottom right
3. It should show < 5000 ms

## Tips

- Use the "Save Response" feature to save interesting results
- Create test scripts using Postman's test tab
- Use collection variables for different environments (dev, staging, prod)
- Enable auto-save to keep your modifications

## Troubleshooting

**Server not responding?**
- Check if the server is running: `npm run dev`
- Verify the base_url is correct
- Test the health endpoint first

**Getting 502/503 errors?**
- Check your Hugging Face API token in `.env`
- The model might be loading (wait 30-60 seconds)
- Check server logs for detailed error messages

**Getting validation errors?**
- Ensure the "text" field is present in the request body
- Check that Content-Type header is set to "application/json"
- Verify JSON syntax is correct
