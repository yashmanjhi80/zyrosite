import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Cog, Cookie, Download, List, Film, Music, Info, Search, Server } from "lucide-react";

const CodeBlock = ({ children, lang }: { children: React.ReactNode, lang?: string }) => (
    <div className="bg-secondary p-4 rounded-lg my-4 relative">
        {lang && <Badge variant="outline" className="absolute top-2 right-2">{lang}</Badge>}
        <pre><code className={`text-sm font-code text-foreground ${lang ? `language-${lang}` : ''}`}>{children}</code></pre>
    </div>
);

export default function BotDocumentation() {
  return (
    <section id="documentation" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                    <Bot className="inline-block mr-3 text-primary h-10 w-10" />
                    Telegram Bot Documentation
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A guide for developers on the bot's architecture, features, and download logic.
                </p>
            </div>

            <p className="text-muted-foreground mb-8 text-center">
                This bot integrates with the YouTube Download API and uses cookies for reliable downloads. It provides video/audio downloading, playlist parsing, format selection, and metadata fetching for YouTube links.
            </p>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center text-2xl"><Cog className="mr-3 text-primary" />Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                    <h4 className="font-semibold mb-2">Environment Variables</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                        <li><code>BASE_API_URL</code>: API server URL (e.g., `http://0.0.0.0:5000`)</li>
                        <li><code>BASE_API_KEY</code>: API Key for authentication.</li>
                        <li><code>DOWNLOAD_DIR</code>: Directory to store downloaded files.</li>
                    </ul>

                    <h4 className="font-semibold mt-6 mb-2">Dependencies</h4>
                    <CodeBlock lang="bash">
{`pip install pyrogram yt-dlp requests youtubesearchpython`}
                    </CodeBlock>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center text-2xl"><Cookie className="mr-3 text-primary" />Cookie Handling</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">The bot uses cookies for reliable downloads. It can fetch cookies from the server, report dead ones, and save new ones from API responses.</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li><b className="text-foreground">cookie_txt_file()</b>: Picks a random cookie file or fetches a new one from the API.</li>
                        <li><b className="text-foreground">get_cookies_from_server()</b>: Calls the `/cookies` endpoint to get a new cookie file.</li>
                        <li><b className="text-foreground">report_dead_cookie_to_server()</b>: Reports a broken cookie file to the API.</li>
                        <li><b className="text-foreground">save_cookies_from_response()</b>: Saves a new base64-encoded cookie from the API.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center text-2xl"><Server className="mr-3 text-primary" />YouTubeAPI Class</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">This class handles all video and audio operations for YouTube.</p>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold flex items-center mb-2"><Search className="mr-2 h-4 w-4" />Video Metadata</h4>
                            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                                <li>`exists()`: Checks if a link is a valid YouTube URL.</li>
                                <li>`details()`: Returns title, duration, thumbnail, etc.</li>
                                <li>`slider()`: Returns search results for browsing.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold flex items-center mb-2"><List className="mr-2 h-4 w-4" />Playlist Handling</h4>
                             <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                                <li>`playlist()`: Fetches all video IDs from a playlist URL.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold flex items-center mb-2"><Film className="mr-2 h-4 w-4" />Formats & Streaming</h4>
                             <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                                <li>`video()`: Returns a direct stream URL for a video.</li>
                                <li>`formats()`: Returns all available download formats.</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center text-2xl"><Download className="mr-3 text-primary" />Downloading Logic</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">The bot uses two download strategies for resilience:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Card className="bg-secondary/50">
                            <CardHeader>
                                <CardTitle className="text-lg">1. Server-Assisted (Preferred)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Calls `/audio` or `/beta` on the API server. If the server is already processing, it provides cookies for the bot to attempt an independent download.</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-secondary/50">
                            <CardHeader>
                                <CardTitle className="text-lg">2. Independent (Fallback)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Uses `yt-dlp` with cookies provided by the API to download directly from YouTube if the server-side method fails or is in progress.</p>
                            </CardContent>
                        </Card>
                    </div>
                     <h4 className="font-semibold mt-6 mb-2">`download(...)` Function</h4>
                    <p className="text-muted-foreground mb-4">This is the main function for handling all download requests. It orchestrates the download flow, manages different formats (audio, video, custom), and saves the file.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-2xl"><Info className="mr-3 text-primary" />Download Flow</CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                        <li>User sends a YouTube link to the bot.</li>
                        <li>Bot extracts the URL and calls the `download()` function.</li>
                        <li>**Attempt 1:** The bot calls the API server (`/audio` or `/beta`).</li>
                        <li>**If API is downloading:** The bot receives cookies and attempts an `independent_download_with_cookies()`.</li>
                        <li>**If API succeeds:** The bot retrieves the final file URL and downloads it.</li>
                        <li>The final file is saved to the `downloads/` directory and sent to the user.</li>
                    </ol>
                </CardContent>
            </Card>

        </div>
      </div>
    </section>
  )
}
