import Navbar from "../Navbar";

interface ILayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <div className="w-screen">
      <Navbar />
      <main className="mt-[60px] flex-center w-screen">
        <div className="w-[1024px] px-10">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
