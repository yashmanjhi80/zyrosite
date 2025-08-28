import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Music, Video, Info } from "lucide-react";

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-secondary p-4 rounded-lg my-4">
    <pre><code className="text-sm font-code text-foreground">{children}</code></pre>
  </div>
);

export default function Documentation() {
  return (
    <section id="documentation" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
              <span role="img" aria-label="headphones" className="mr-2">🎧</span> YouTube Download API
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Download YouTube Audio (MP3) and Video (MP4 up to 480p) with ease.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <KeyRound className="mr-3 text-primary" />
                Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Every request must include a valid API key in the <code>x-api-key</code> header.
              </p>
              <CodeBlock>
                {`x-api-key: <your_api_key>`}
              </CodeBlock>
              <p className="text-muted-foreground">
                If the key is missing, invalid, or expired, the API will respond with:
              </p>
              <CodeBlock>
                {`{
  "status": "error",
  "message": "Invalid or expired API key"
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Music className="mr-3 text-primary" />
                Get Audio (MP3)
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center mb-2">
                    <Badge variant="secondary">GET</Badge>
                    <p className="ml-2 font-code">/audio/&lt;video_id&gt;</p>
                </div>
              <p className="text-muted-foreground mb-4">
                Starts or fetches the download of a YouTube video’s audio track in MP3 (192 kbps) format.
              </p>
              
              <h4 className="font-semibold mt-6 mb-2">✅ Success Response (already downloaded)</h4>
              <CodeBlock>
                {`{
  "status": "success",
  "audio_url": "<base64_encoded_download_url>"
}`}
              </CodeBlock>

              <h4 className="font-semibold mt-6 mb-2">⏳ In Progress Response</h4>
              <CodeBlock>
                {`{
  "status": "downloading",
  "progress": 42.7,
  "cookies": "<base64_encoded_cookie_file>",
  "video_id": "dQw4w9WgXcQ"
}`}
              </CodeBlock>
              
              <h4 className="font-semibold mt-6 mb-2">🔴 Error Response</h4>
              <CodeBlock>
                {`{
  "status": "error",
  "message": "Some error details"
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Video className="mr-3 text-primary" />
                Get Video (MP4 ≤480p)
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center mb-2">
                    <Badge variant="secondary">GET</Badge>
                    <p className="ml-2 font-code">/beta/&lt;video_id&gt;</p>
                </div>
                <p className="text-muted-foreground mb-4">
                    Starts or fetches the download of a YouTube video in MP4 format (480p or lower).
                </p>

                <h4 className="font-semibold mt-6 mb-2">✅ Success Response (already downloaded)</h4>
                <CodeBlock>
                {`{
  "status": "success",
  "video_sd": "<base64_encoded_download_url>"
}`}
                </CodeBlock>

                <h4 className="font-semibold mt-6 mb-2">⏳ In Progress Response</h4>
                <CodeBlock>
                {`{
  "status": "downloading",
  "progress": 65.3,
  "cookies": "<base64_encoded_cookie_file>",
  "video_id": "dQw4w9WgXcQ"
}`}
                </CodeBlock>

                <h4 className="font-semibold mt-6 mb-2">🔴 Error Response</h4>
                <CodeBlock>
                {`{
  "status": "error",
  "message": "Some error details"
}`}
                </CodeBlock>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Info className="mr-3 text-primary" />
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li><code>audio_url</code> and <code>video_sd</code> values are <strong>base64-encoded URLs</strong>. You must decode them before use.</li>
                    <li><code>cookies</code> is a base64-encoded cookie file for client-side fallback downloads.</li>
                    <li>Polling an endpoint multiple times will update the <code>progress</code> field until the download is complete.</li>
                </ul>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}
