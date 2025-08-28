import { Code, DownloadCloud, Gauge, LifeBuoy, type LucideIcon } from "lucide-react"

interface Plan {
  name: string
  priceINR: number
  features: string[]
  recommended?: boolean
}

export const plans: Plan[] = [
  { 
    name: "Free", 
    priceINR: 0, 
    features: ["1,000 requests/month", "MP3 Audio Downloads", "MP4 Video (up to 480p)", "Community Support"],
  },
  { 
    name: "Pro", 
    priceINR: 499, 
    features: ["10,000 requests/month", "MP3 Audio Downloads", "MP4 Video (up to 4K)", "Email Support", "Access to Beta Features"],
    recommended: true
  },
  { 
    name: "Enterprise", 
    priceINR: 1999, 
    features: ["Unlimited requests", "MP3 Audio Downloads", "MP4 Video (up to 4K)", "Dedicated 24/7 Support", "Custom Integrations"],
  }
]

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export const features: Feature[] = [
  {
    icon: DownloadCloud,
    title: "High-Quality Downloads",
    description: "Easily download YouTube content as MP3 (192kbps) or MP4 (up to 4K) files for your application.",
  },
  {
    icon: Gauge,
    title: "Asynchronous Processing",
    description: "Requests are handled in the background. Poll the endpoint to get progress updates without blocking your app.",
  },
  {
    icon: Code,
    title: "Simple Integration",
    description: "With straightforward GET endpoints and clear documentation, you can integrate our API in minutes.",
  },
  {
    icon: LifeBuoy,
    title: "Reliable & Supported",
    description: "We provide robust infrastructure and multiple support tiers to ensure your service remains online and reliable.",
  },
]

interface Faq {
  question: string
  answer: string
}

export const faqs: Faq[] = [
    {
        question: "How do I authenticate my requests?",
        answer: "Every request to the API must include a valid API key in the 'x-api-key' header. You can get your key by signing up for a plan on our pricing page."
    },
    {
        question: "What video quality is supported?",
        answer: "Our Pro and Enterprise plans support video downloads up to 4K resolution. The Free plan is limited to 480p."
    },
    {
        question: "What does the 'downloading' status mean?",
        answer: "When you request a file that hasn't been downloaded yet, the API will start fetching it in the background. The status will be 'downloading', and the response will include a 'progress' field. You should poll the same endpoint until the status changes to 'success'."
    },
    {
        question: "What are the `audio_url` and `video_sd` values?",
        answer: "These are base64-encoded URLs that point to the final downloadable file. You need to decode the value from the API response before you can use the URL to download the MP3 or MP4 file."
    },
    {
        question: "What are the rate limits for the API?",
        answer: "Rate limits depend on the plan you choose. Our Free plan has a limit of 1,000 requests per month, while paid plans offer significantly more. Please check our pricing page for detailed information on rate limits and other features."
    },
]
