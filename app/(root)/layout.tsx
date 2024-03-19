
import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import TopBar from "@/components/shared/TopBar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
<div className="w-full md:flex h-screen">
          <TopBar />
          <LeftSideBar />
          <section className="flex flex-1">
{children}          </section>
          <BottomBar />
        </div>       
        
      );
}
