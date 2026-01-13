'use client';

import { useFAQ } from '@/context/FAQContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FAQPage() {
  const { faqs } = useFAQ();
  const publishedFaqs = faqs.filter(f => f.published);
  const categories = Array.from(new Set(publishedFaqs.map(f => f.category)));

  return (
    <>
      <Navbar />
      <main className="faq-page">
        <header className="page-hero">
          <div className="container">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about your orders, products, and more.</p>
          </div>
        </header>

        <section className="container content">
          {categories.map(cat => (
            <div key={cat} className="faq-section">
              <h2 className="cat-title">{cat}</h2>
              <div className="faq-grid">
                {publishedFaqs.filter(f => f.category === cat).map(faq => (
                  <details key={faq.id} className="faq-item">
                    <summary className="question">
                      {faq.question}
                      <span className="material-symbols-outlined icon">expand_more</span>
                    </summary>
                    <div className="answer">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          {publishedFaqs.length === 0 && (
             <div className="empty-state">
               <p>No FAQs available at the moment. Please check back later.</p>
             </div>
          )}
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .faq-page { min-height: 80vh; background: #f9fafb; padding-bottom: 4rem; }
        .container { max-width: 1000px; margin: 0 auto; padding: 0 1.5rem; }

        .page-hero { background: #1a1a1a; color: white; padding: 4rem 0; text-align: center; margin-bottom: 3rem; }
        .page-hero h1 { font-family: var(--font-playfair); font-size: 2.5rem; margin-bottom: 1rem; }
        .page-hero p { color: #aaa; font-size: 1.1rem; }

        .faq-section { margin-bottom: 3rem; }
        .cat-title { font-family: var(--font-playfair); color: #d32f2f; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid #eee; font-size: 1.5rem; }

        .faq-item { background: white; border-radius: 12px; border: 1px solid #eee; margin-bottom: 1rem; overflow: hidden; transition: all 0.3s ease; }
        .faq-item[open] { box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-color: transparent; }

        .question { padding: 1.2rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: 600; background: white; list-style: none; user-select: none; }
        .question::-webkit-details-marker { display: none; }
        .question .icon { transition: transform 0.3s; color: #888; }
        .faq-item[open] .question .icon { transform: rotate(180deg); color: #d32f2f; }
        .faq-item[open] .question { color: #d32f2f; }

        .answer { padding: 0 1.2rem 1.2rem 1.2rem; border-top: 1px solid transparent; color: #555; line-height: 1.6; }
        .faq-item[open] .answer { border-top-color: #f5f5f5; }

        .empty-state { text-align: center; padding: 4rem; color: #999; }
      `}</style>
    </>
  );
}
