import UIProvider from '@/provider/UIProvider';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <UIProvider>{children}</UIProvider>;
};

export default PageWrapper;
