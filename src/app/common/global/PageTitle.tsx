import { useEffect } from 'react';
import { useLocation } from 'react-router';

interface PageTitleProps {
  title?: string;
}

export function PageTitle({ title = undefined }: PageTitleProps): null {
  const location = useLocation();

  useEffect(() => {
    document.title = `Tokenzyme${title ? ` · ${title}` : ''}`;
  }, [location, title]);

  return null;
}
