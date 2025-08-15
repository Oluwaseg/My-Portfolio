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
    <Suspense fallback={<div>Loading...</div>}>
      <RoleContentInner>{children}</RoleContentInner>
    </Suspense>
  );
}
