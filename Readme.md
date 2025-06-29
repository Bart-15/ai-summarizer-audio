# 🔊 AI Audio Summarizer with AWS CDK, OpenAI, Polly, and S3

A lightweight and serverless app that summarizes user input text using **OpenAI GPT-3.5**, converts the summary to speech with **Amazon Polly**, and securely stores the audio in **Amazon S3** with a **pre-signed URL** for playback.

---

## 📦 Tech Stack

- [AWS CDK (TypeScript)](https://docs.aws.amazon.com/cdk/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Amazon Polly](https://aws.amazon.com/polly/)
- [Amazon S3](https://aws.amazon.com/s3/)
- [API Gateway](https://aws.amazon.com/api-gateway/)
- [OpenAI GPT-3.5](https://platform.openai.com/)
- TypeScript

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Bart-15/ai-summarizer-audio.git
cd ai-audio-summarizer
```

### 2. Set Up Environment Variables

> Create a `.env` file inside the `cdk/` folder:

```env
OPENAI_API_KEY=your_openai_api_key
```

️⃣ **Note**: Do **not** set `AWS_REGION` manually — it’s reserved by the Lambda runtime.

---

## 🔧 Build & Deploy

### Install dependencies

```bash
cd cdk
npm install
```

### Synthesize & Deploy

```bash
# Generate CloudFormation
tsx bin/app.ts && npx cdk synth

# Deploy stack
cdk deploy
```

---

## 📬 API Usage

### **POST** `/summarize`

**Request Body:**

```json
{
  "text": "Your input text here...",
  "context": "Summarize this text in 3 sentences."
}
```

**Response:**

```json
{
  "summary": "Generated summary here...",
  "audioUrl": "https://your-bucket.s3.amazonaws.com/summary.mp3?...signed"
}
```

---

## 🌐 Example CURL Request

```bash
curl -X POST https://your-api-id.execute-api.amazonaws.com/prod/summarize \
  -H "Content-Type: application/json" \
  -d '{"text":"Sample text to summarize.","context":"Summarize in 3 short lines."}'
```

---

## 👨‍💻 Author

Made by [Bart Tabusao](https://github.com/Bart-15) — Powered by OpenAI + AWS ☁️
