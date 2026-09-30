document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.querySelector('.sidebar');

    // Membuka sidebar saat hamburger diklik
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    // Menutup sidebar saat tombol X diklik
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // Menutup sidebar otomatis saat pengguna mengklik area luar menu
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
});

// ====== FUNGSI POP-UP LOGOUT ======
document.addEventListener('DOMContentLoaded', () => {
    
    const logoutBtn = document.querySelector('.logout'); 
    const logoutModal = document.getElementById('logoutModal');
    const cancelLogout = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');

    // Mencegah error jika elemen tidak ada di halaman tertentu
    if (logoutBtn && logoutModal) {
        // Tampilkan Modal
        logoutBtn.addEventListener('click', () => {
            logoutModal.classList.add('active');
        });

        // Tutup Modal via tombol Batal
        cancelLogout.addEventListener('click', () => {
            logoutModal.classList.remove('active');
        });

        // Proses Keluar & Arahkan ke Login
        confirmLogout.addEventListener('click', () => {
            window.location.href = 'login.html';
        });

        // Tutup Modal jika area luar kotak diklik
        window.addEventListener('click', (e) => {
            if (e.target === logoutModal) {
                logoutModal.classList.remove('active');
            }
        });
    }
});