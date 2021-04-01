import { useEffect } from 'react';

export const ScrollToTop = ({ children, location }: any) => {
    useEffect(() => window.scrollTo(0, 0), [location.pathname]);
    return children;
};
