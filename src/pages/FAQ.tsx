
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MessageCircle, Mail } from 'lucide-react';
import { useFAQ } from '@/hooks/useFAQ';
import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { FAQCategoryFilter } from '@/components/faq/FAQCategoryFilter';

const FAQ = () => {
  const {
    categories,
    faqs,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    totalFAQs
  } = useFAQ();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-trailflow-medium to-trailflow-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Perguntas Frequentes
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Encontre respostas para as principais dúvidas sobre o Nuflow Pass
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Buscar por uma pergunta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-4 text-lg bg-white/95 border-0 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Category Filter */}
              <FAQCategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  {searchTerm ? (
                    <>Encontradas <span className="font-semibold">{faqs.length}</span> perguntas para "{searchTerm}"</>
                  ) : (
                    <>Mostrando <span className="font-semibold">{faqs.length}</span> {selectedCategory === 'todos' ? `de ${totalFAQs}` : ''} perguntas</>
                  )}
                </p>
              </div>

              {/* FAQ Accordion */}
              <FAQAccordion faqs={faqs} />

              {/* Contact Section */}
              <div className="mt-16 bg-white rounded-xl border border-gray-200 p-8 text-center">
                <h3 className="text-2xl font-bold text-trailflow-dark mb-4">
                  Ainda tem dúvidas?
                </h3>
                <p className="text-gray-600 mb-6">
                  Nossa equipe está pronta para ajudar você
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="accent" size="lg">
                    <Link to="/contato" className="flex items-center gap-2">
                      <MessageCircle size={20} />
                      Fale Conosco
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg">
                    <a 
                      href="mailto:suporte@nuflowpass.com"
                      className="flex items-center gap-2"
                    >
                      <Mail size={20} />
                      suporte@nuflowpass.com
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
