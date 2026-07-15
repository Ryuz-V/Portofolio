import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import About from "@/components/About/About";

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "transparent", minHeight: "100vh", color: "#fff" }}>
      <div style={{ width: "100%", display: "flex" }}>
        
        <div style={{ width: "330px", flexShrink: 0, position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 1000 }}>
          <Sidebar />
        </div>
        
        <div style={{ flexGrow: 1, marginLeft: "330px", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          
          <main style={{ padding: "6rem 2rem 2rem 2rem", overflowX: "hidden" }}>
            <section id="about">
              <About />
            </section>
          </main>
        </div>

      </div>
    </div>
  );
}
