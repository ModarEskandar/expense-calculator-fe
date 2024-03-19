import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            {children}          </section>
          
        </>
      
    
  );
}
