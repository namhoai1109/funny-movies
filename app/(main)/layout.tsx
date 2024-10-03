import Navbar from "./components/Navbar";

function MainLayout({ children }: ILayoutProps) {
  return (
    <div className="w-screen">
      <Navbar />
      <main className="mt-[48px] min-[440px]:mt-[60px] flex-center w-screen">
        <div className="w-[1024px] px-4 flex justify-center">{children}</div>
      </main>
    </div>
  );
}

export default MainLayout;
