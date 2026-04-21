import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/footer';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Samuel Oluwasegun',
  description: 'Terms & Conditions for Samuel Oluwasegun portfolio website',
};

export const dynamic = 'force-dynamic';

export default function TermsAndConditions() {
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
              Terms & Conditions
            </h1>
            <p className='text-muted-foreground'>Last updated: {lastUpdated}</p>
          </div>

          {/* Content */}
          <div className='prose prose-invert max-w-none space-y-8'>
            {/* Agreement */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Agreement to Terms
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
                Samuel Oluwasegun reserves the right to revise these terms of
                service for its website at any time without notice.
              </p>
            </section>

            {/* Use License */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Use License
              </h2>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                Permission is granted to temporarily download one copy of the
                materials (information or software) on Samuel Oluwasegun's
                website for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul className='list-disc list-inside text-muted-foreground leading-relaxed space-y-2'>
                <li>Modifying or copying the materials</li>
                <li>
                  Using the materials for any commercial purpose or for any
                  public display
                </li>
                <li>
                  Attempting to decompile or reverse engineer any software
                  contained on the website
                </li>
                <li>
                  Transferring the materials to another person or "mirroring"
                  the materials on any other server
                </li>
                <li>Removing any copyright or other proprietary notations</li>
                <li>
                  Transferring the materials to another person or "mirroring"
                  the materials on any other server
                </li>
              </ul>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Disclaimer
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                The materials on Samuel Oluwasegun's website are provided on an
                'as is' basis. Samuel Oluwasegun makes no warranties, expressed
                or implied, and hereby disclaims and negates all other
                warranties including, without limitation, implied warranties or
                conditions of merchantability, fitness for a particular purpose,
                or non-infringement of intellectual property or other violation
                of rights.
              </p>
            </section>

            {/* Limitations */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Limitations
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                In no event shall Samuel Oluwasegun or his suppliers be liable
                for any damages (including, without limitation, damages for loss
                of data or profit, or due to business interruption) arising out
                of the use or inability to use the materials on Samuel
                Oluwasegun's website, even if Samuel Oluwasegun or an authorized
                representative has been notified orally or in writing of the
                possibility of such damage.
              </p>
            </section>

            {/* Accuracy of Materials */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Accuracy of Materials
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                The materials appearing on Samuel Oluwasegun's website could
                include technical, typographical, or photographic errors. Samuel
                Oluwasegun does not warrant that any of the materials on his
                website are accurate, complete, or current. Samuel Oluwasegun
                may make changes to the materials contained on his website at
                any time without notice.
              </p>
            </section>

            {/* Links */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Links
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                Samuel Oluwasegun has not reviewed all of the sites linked to
                his website and is not responsible for the contents of any such
                linked site. The inclusion of any link does not imply
                endorsement by Samuel Oluwasegun of the site. Use of any such
                linked website is at the user's own risk.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Modifications
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                Samuel Oluwasegun may revise these terms of service for his
                website at any time without notice. By using this website, you
                are agreeing to be bound by the then current version of these
                terms of service.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Governing Law
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                These terms and conditions are governed by and construed in
                accordance with the laws of Nigeria, and you irrevocably submit
                to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Intellectual Property Rights
              </h2>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                All content on this website, including but not limited to text,
                graphics, logos, images, audio clips, and software, is the
                property of Samuel Oluwasegun or its suppliers and is protected
                by international copyright laws. The compilation of all content
                on this website is the exclusive property of Samuel Oluwasegun
                and is protected by international copyright laws.
              </p>
              <p className='text-muted-foreground leading-relaxed'>
                You may not reproduce, distribute, or transmit the content
                without prior written permission from Samuel Oluwasegun.
              </p>
            </section>

            {/* User Content */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                User Content
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                If you submit, post, or display content on or through the
                website, you grant Samuel Oluwasegun a worldwide, non-exclusive,
                royalty-free license to use, copy, reproduce, process, adapt,
                modify, publish, transmit, display and distribute such content
                in any media or medium and for any purposes.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Limitation of Liability
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                In no event shall Samuel Oluwasegun be liable for any indirect,
                incidental, special, consequential, or punitive damages,
                including without limitation, damages for loss of profits, data,
                or other intangible losses, arising out of or in connection with
                your use of or inability to use this website or any linked
                website.
              </p>
            </section>

            {/* Contact */}
            <section className='bg-secondary/30 border border-border/50 rounded-lg p-6'>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Contact Information
              </h2>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                If you have any questions about these Terms & Conditions, please
                contact us:
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

            {/* Severability */}
            <section>
              <h2 className='text-2xl font-semibold text-foreground mb-4'>
                Severability
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                If any provision of these terms and conditions is found to be
                invalid or unenforceable by a court of competent jurisdiction,
                the remaining provisions shall continue in full force and
                effect.
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
