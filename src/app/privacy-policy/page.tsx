import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/footer';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Samuel Oluwasegun',
  description: 'Privacy Policy for Samuel Oluwasegun portfolio website',
};

export default function PrivacyPolicy() {
  const lastUpdated = 'April 2026';

  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main className='pt-32 pb-20'>
        <article className='max-w-3xl mx-auto px-6'>
          {/* Header */}
          <div className='mb-12'>
            <h1 className='text-4xl font-bold text-foreground mb-4'>
              Privacy Policy
            </h1>
            <p className='text-muted-foreground'>Last updated: {lastUpdated}</p>
          </div>

          {/* Content */}
          <div className='prose prose-invert max-w-none space-y-8'>
            {/* Introduction */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Introduction
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                Welcome to Samuel Oluwasegun's portfolio website. We are
                committed to protecting your privacy and ensuring you have a
                positive experience on our website. This Privacy Policy explains
                how we collect, use, disclose, and otherwise handle your
                information when you visit our website, including any other
                media form, media channel, mobile website, or mobile
                application.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Information We Collect
              </h2>
              <div className='space-y-4'>
                <div>
                  <h3 className='text-lg font-semibold text-foreground mb-2'>
                    1. Information You Provide
                  </h3>
                  <p className='text-muted-foreground leading-relaxed'>
                    When you contact us through the contact form, we may collect
                    personal information such as:
                  </p>
                  <ul className='list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1'>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Message content</li>
                    <li>Any other information you choose to provide</li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-lg font-semibold text-foreground mb-2'>
                    2. Automatically Collected Information
                  </h3>
                  <p className='text-muted-foreground leading-relaxed'>
                    When you visit our website, we automatically collect certain
                    information about your device and browsing behavior,
                    including:
                  </p>
                  <ul className='list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1'>
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on each page</li>
                    <li>Referring URL</li>
                    <li>Device type and screen resolution</li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-lg font-semibold text-foreground mb-2'>
                    3. Cookies
                  </h3>
                  <p className='text-muted-foreground leading-relaxed'>
                    We use cookies to enhance your experience on our website.
                    Cookies are small files stored on your device that help us
                    remember your preferences and improve our services. You can
                    control cookie settings through your browser.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                How We Use Your Information
              </h2>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                We use the information we collect for the following purposes:
              </p>
              <ul className='list-disc list-inside text-muted-foreground leading-relaxed space-y-2'>
                <li>
                  To respond to your inquiries and provide customer support
                </li>
                <li>To improve and optimize our website and user experience</li>
                <li>To analyze website traffic and usage patterns</li>
                <li>To send you updates and promotional materials</li>
                <li>To comply with legal obligations</li>
                <li>To prevent fraud and enhance security</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Sharing Your Information
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                We do not sell, trade, or rent your personal information to
                third parties. We may share information only in the following
                circumstances:
              </p>
              <ul className='list-disc list-inside text-muted-foreground leading-relaxed mt-4 space-y-2'>
                <li>
                  With service providers who assist us in operating our website
                  and conducting business
                </li>
                <li>
                  When required by law or to protect our legal rights and safety
                </li>
                <li>With your consent</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Data Security
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no
                method of transmission over the Internet is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Your Privacy Rights
              </h2>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                Depending on your location, you may have certain rights
                regarding your personal information:
              </p>
              <ul className='list-disc list-inside text-muted-foreground leading-relaxed space-y-2'>
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to request deletion of your data</li>
                <li>Right to opt-out of marketing communications</li>
                <li>Right to data portability</li>
              </ul>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Third-Party Links
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices of these external
                sites. We encourage you to review their privacy policies before
                providing any personal information.
              </p>
            </section>

            {/* Contact Us */}
            <section className='bg-secondary/30 border border-border/50 rounded-lg p-6'>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Contact Us
              </h2>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                If you have questions about this Privacy Policy or our privacy
                practices, please contact us at:
              </p>
              <div className='space-y-2 text-muted-foreground'>
                <p>
                  <strong className='text-foreground'>Email:</strong>{' '}
                  oluwasegunsam56@gmail.com
                </p>
                <p>
                  <strong className='text-foreground'>Phone:</strong>{' '}
                  +2349048095407
                </p>
                <p>
                  <strong className='text-foreground'>Location:</strong> Nigeria
                </p>
              </div>
            </section>

            {/* Updates to Policy */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Updates to This Privacy Policy
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or applicable laws. We will notify you
                of any material changes by updating the "Last updated" date at
                the top of this page. Your continued use of our website
                following the posting of revised Privacy Policy means that you
                accept and agree to the changes.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
