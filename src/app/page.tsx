import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import DashboardGrid from "@/components/DashboardGrid/DashboardGrid";
export default function Home() {
  return (
    <div style={{ backgroundColor: "transparent", minHeight: "100vh", color: "#fff" }}>
      {/* Container utama diubah jadi full width */}
      <div style={{ width: "100%", display: "flex" }}>
        
        {/* Sidebar dipaksa Fix di pingkiri kiri (Fixed) */}
        <div style={{ width: "330px", flexShrink: 0, position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 1000 }}>
          <Sidebar />
        </div>
        
        {/* Main Content di offset 330px ke kanan agar tidak tertindih layar Sidebar */}
        <div style={{ flexGrow: 1, marginLeft: "330px", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          
          {/* Padding top ditambahkan (6rem) untuk memberi ruang kosong di bawah Navbar yang sekarang Fix juga */}
          <main style={{ padding: "6rem 2rem 2rem 2rem", overflowX: "hidden" }}>
            {/* Feed — Section pertama yang muncul saat halaman dibuka */}
            <section id="feed">
              <DashboardGrid />
            </section>
          </main>
        </div>

      </div>
    </div>
  );
}
