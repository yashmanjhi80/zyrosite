import Header from '@/components/header';
import Footer from '@/components/footer';
import Documentation from '@/components/documentation';

export default function DocumentationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Documentation />
      </main>
      <Footer />
    </div>
  );
}
