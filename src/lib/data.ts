import { Rocket, Gauge, ShieldCheck, LifeBuoy, type LucideIcon } from "lucide-react"

interface Plan {
  name: string
  ramGB: number
  vcpu: number
  storageGB: number
  priceINR: number
  priceUSD: number
  features: string[]
}

export const plans: Plan[] = [
  { name: "Dirt", ramGB: 1, vcpu: 1, storageGB: 10, priceINR: 99, priceUSD: 1.49, features: ["Paper/Purpur ready", "For 1-5 players"] },
  { name: "Stone", ramGB: 2, vcpu: 1, storageGB: 20, priceINR: 199, priceUSD: 2.49, features: ["Modpack friendly", "Great for starters"] },
  { name: "Iron", ramGB: 4, vcpu: 2, storageGB: 40, priceINR: 349, priceUSD: 4.49, features: ["Handles most mods", "Daily backups"] },
  { name: "Diamond", ramGB: 8, vcpu: 3, storageGB: 60, priceINR: 649, priceUSD: 7.99, features: ["For large communities", "1-click installers"] },
  { name: "Netherite", ramGB: 16, vcpu: 4, storageGB: 100, priceINR: 1199, priceUSD: 13.99, features: ["Heavy modpacks", "Priority support"] }
]

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export const features: Feature[] = [
  {
    icon: Rocket,
    title: "Instant Provisioning",
    description: "Your server is up and running minutes after payment. No waiting, just playing.",
  },
  {
    icon: Gauge,
    title: "Blazing-Fast Hardware",
    description: "We use high-performance Ryzen CPUs and NVMe SSDs to ensure zero lag for you and your players.",
  },
  {
    icon: ShieldCheck,
    title: "DDoS Protection",
    description: "Our network is equipped with robust DDoS mitigation to keep your server safe from attacks.",
  },
  {
    icon: LifeBuoy,
    title: "24/7 Expert Support",
    description: "Got an issue? Our team of Minecraft experts is available around the clock to help you out.",
  },
]

interface Faq {
  question: string
  answer: string
}

export const faqs: Faq[] = [
    {
        question: "How fast is the server setup?",
        answer: "Setup is fully automated and instant. Your Minecraft server will be ready just a few minutes after your payment is successfully processed. You'll receive an email with all the details you need to get started right away."
    },
    {
        question: "Can I upload my own modpacks or plugins?",
        answer: "Absolutely! You have full SFTP access to your server files. You can easily upload any modpacks, plugins, or custom worlds. We also offer one-click installers for popular modpacks like Forge and Fabric to make it even easier."
    },
    {
        question: "Is there DDoS protection included?",
        answer: "Yes, all our hosting plans come with enterprise-grade DDoS protection at no extra cost. This helps to keep your server online and protected from various types of network attacks, ensuring a smooth gameplay experience."
    },
    {
        question: "What kind of hardware do you use?",
        answer: "We use top-of-the-line hardware to ensure the best performance. Our nodes are powered by AMD Ryzen processors and enterprise NVMe SSDs, which means faster world loading, smoother gameplay, and better overall server responsiveness."
    },
    {
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 48-hour money-back guarantee on your first purchase. If you're not satisfied with our service for any reason, just contact our support team within the first two days for a full refund, no questions asked."
    },
]
