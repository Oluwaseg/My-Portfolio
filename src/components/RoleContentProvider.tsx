'use client';

import { Suspense } from 'react';
import { useRoleContent } from '@/hooks/useRoleContent';

interface RoleContentProviderProps {
  children: (content: ReturnType<typeof useRoleContent>) => React.ReactNode;
}

function RoleContentInner({ children }: RoleContentProviderProps) {
  const { content, roleKey, isCustomRole } = useRoleContent();
  return <>{children({ content, roleKey, isCustomRole })}</>;
}

export function RoleContentProvider({ children }: RoleContentProviderProps) {
  return (
    <Suspense fallback={
      <section className="min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background py-20 px-4 md:px-8 relative overflow-hidden flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-primary/40 mx-auto"></div>
        </div>
      </div>
    </section>
    }>
      <RoleContentInner>{children}</RoleContentInner>
    </Suspense>
  );
}
