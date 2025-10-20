# API Contract Documentation

## Overview
The AI Summarization Proxy API provides a single endpoint for text summarization using large language models.

## Base URL
```
http://localhost:3000
```

---

## Endpoints

### POST /api/summarize

Accepts text input and returns a structured summary with title, key points, sentiment, and keywords.

#### Request

**URL**: `/api/summarize`  
**Method**: `POST`  
**Content-Type**: `application/json`

**Request Body Schema**:
```json
{
  "text": "string (required, 1-50000 characters)"
}
```

**Example Request**:
```json
{
  "text": "Artificial intelligence (AI) is transforming industries worldwide. From healthcare to finance, AI technologies are enabling automation, improving decision-making, and creating new opportunities. Machine learning algorithms can now analyze vast amounts of data in seconds, identifying patterns that humans might miss. However, the rapid advancement of AI also raises important ethical questions about privacy, job displacement, and algorithmic bias that society must address."
}
```

#### Response

**Success Response** (200 OK):
```json
{
  "title": "string",
  "summary": "string",
  "keywords": ["string", "string", ...],
  "sentiment": "positive" | "negative" | "neutral" | "mixed"
}
```

**Example Success Response**:
```json
{
  "title": "AI Transformation and Ethical Challenges",
  "summary": "Artificial intelligence is revolutionizing multiple industries by enabling automation and enhanced decision-making through machine learning. While AI offers tremendous opportunities, it also presents significant ethical challenges regarding privacy, employment, and algorithmic fairness.",
  "keywords": ["artificial intelligence", "machine learning", "automation", "ethics", "privacy", "job displacement"],
  "sentiment": "mixed"
}
```

#### Error Responses

**400 Bad Request** - Invalid input:
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid request parameters",
    "details": "Text field is required"
  }
}
```

**413 Payload Too Large** - Token limit exceeded:
```json
{
  "error": {
    "code": "TOKEN_LIMIT_EXCEEDED",
    "message": "Input exceeds maximum token limit of 10,000 tokens",
    "details": "Current input: 12,500 tokens"
  }
}
```

**500 Internal Server Error**:
```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

**502 Bad Gateway** - LLM service error:
```json
{
  "error": {
    "code": "LLM_SERVICE_ERROR",
    "message": "External LLM service error",
    "details": "Failed to connect to Hugging Face API"
  }
}
```

**503 Service Unavailable** - LLM service unavailable:
```json
{
  "error": {
    "code": "LLM_SERVICE_UNAVAILABLE",
    "message": "LLM service temporarily unavailable",
    "details": "Please retry in a few moments"
  }
}
```

---

## Error Codes Reference

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Invalid request parameters or malformed JSON |
| `TEXT_EMPTY` | 400 | Text field is missing or empty |
| `TEXT_TOO_LONG` | 413 | Text exceeds maximum character limit (50,000) |
| `TOKEN_LIMIT_EXCEEDED` | 413 | Input exceeds maximum token limit (10,000) |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error |
| `LLM_SERVICE_ERROR` | 502 | Error from external LLM service |
| `LLM_SERVICE_UNAVAILABLE` | 503 | LLM service is temporarily unavailable |

---

## Performance Requirements

- **Latency**: ≤ 5 seconds for inputs up to 10,000 tokens
- **Availability**: Best-effort (dependent on LLM service availability)
- **Maximum Input**: 10,000 tokens (~50,000 characters)

---

## Notes

- The API enforces a maximum input size of 10,000 tokens to ensure sub-5-second response times
- Summaries are factual and based solely on the provided text (no hallucinations)
- The sentiment field provides a general assessment: `positive`, `negative`, `neutral`, or `mixed`
- Keywords are extracted from the source text and represent main topics/concepts
