import './index.scss';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="client-layout">
      <div className="client-content scrollbar-hide">
        {children}
      </div>
    </div>
  );
}

export default ClientLayout;