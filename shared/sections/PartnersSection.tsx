'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Container } from '@/shared/ui/Container';

const partners = [
  { src: '/img/partners/logo_1.png', alt: 'Партнёр 1' },
  { src: '/img/partners/logo_2.png', alt: 'Партнёр 2' },
  { src: '/img/partners/logo_3.png', alt: 'Партнёр 3' },
  { src: '/img/partners/logo_4.png', alt: 'Партнёр 4' },
  { src: '/img/partners/logo_5.png', alt: 'Партнёр 5' },
  { src: '/img/partners/logo_6.png', alt: 'Партнёр 6' },
  { src: '/img/partners/logo_7.png', alt: 'Партнёр 7' },
  { src: '/img/partners/logo_8.png', alt: 'Партнёр 8' },
];

export function PartnersSection() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLDivElement>('.partner-item');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Staggered raise-in animation
            items.forEach((el, i) => {
              setTimeout(() => el.classList.add('show'), i * 150);
            });

            // Sequential color highlight: one-by-one for 1s each
            items.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('color');
                setTimeout(() => el.classList.remove('color'), 1000);
              }, i * 1000);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    const grid = document.querySelector('.partners-grid');
    if (grid) observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="con-container py-12 bg-white">
      <Container>
        <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">Наши партнеры</h2>
      
        <div className="partners-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
          {partners.map((p, i) => (
            <div
              key={i}
              className="partner-item flex justify-center items-center filter grayscale opacity-60 transform translate-y-6 transition duration-500 ease-out hover:grayscale-0 hover:opacity-100"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={390}
                height={160}
                className="object-contain "
              />
            </div>
          ))}
        </div>

        <style jsx>{`
          .partner-item.show {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          .partner-item.color {
            filter: none !important;
            opacity: 1 !important;
          }
        `}</style>
      </Container>
    </section>
  );
}
