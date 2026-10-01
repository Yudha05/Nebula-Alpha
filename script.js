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

// ====== THEME (GELAP / TERANG) TOGGLE ======
(function () {
    const root = document.documentElement;
    const STORAGE_KEY = 'nebula-theme';

    function currentTheme() {
        return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }

    // Sinkronkan ikon: mode gelap menampilkan matahari, terang menampilkan bulan.
    function syncIcon(btn) {
        if (!btn) return;
        const icon = btn.querySelector('i');
        if (!icon) return;
        icon.className = currentTheme() === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
        document.querySelectorAll('.theme-toggle, .login-theme-toggle').forEach(syncIcon);
    }

    document.querySelectorAll('.theme-toggle, .login-theme-toggle').forEach((btn) => {
        syncIcon(btn);
        btn.addEventListener('click', () => {
            applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
        });
    });
})();

// ====== SEGMENTED CONTROL (Rentang waktu grafik) ======
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.segmented button');
    if (!btn || !btn.parentElement) return;
    btn.parentElement.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
});