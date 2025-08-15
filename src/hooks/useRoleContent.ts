'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { roleContent, RoleKey } from '@/config/roleContent';

export function useRoleContent() {
  const searchParams = useSearchParams();
  
  const roleKey = useMemo((): RoleKey => {
    const roleParam = searchParams.get('role');
    const isFrontend = searchParams.has('frontend') || roleParam === 'frontend';
    const isBackend = searchParams.has('backend') || roleParam === 'backend';

    if (isFrontend) return 'frontend';
    if (isBackend) return 'backend';

    return 'fullstack';
  }, [searchParams]);

  const content = useMemo(() => roleContent[roleKey], [roleKey]);

  return {
    roleKey,
    content,
    isCustomRole: roleKey !== 'fullstack'
  };
} 