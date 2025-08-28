import Header from '@/components/header';
import Footer from '@/components/footer';
import BotDocumentation from '@/components/bot-documentation';

export default function BotDocumentationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BotDocumentation />
      </main>
      <Footer />
    </div>
  );
}
