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

// ====== Tutup modal apa pun saat area gelap (overlay) di klik ======
document.addEventListener('click', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});
// ====== DROPDOWN TOPBAR: NOTIFIKASI & PROFIL ======
(function () {
    const topbarRight = document.querySelector('.topbar-right');
    const notifBtn = document.querySelector('.notif-btn');
    const profileBtn = document.querySelector('.user-profile');
    if (!topbarRight || (!notifBtn && !profileBtn)) return;

    const panels = [];
    let notifPanel = null;
    let profilePanel = null;

    function closeAll() {
        panels.forEach((p) => p.classList.remove('open'));
        if (notifBtn) notifBtn.classList.remove('open');
        if (profileBtn) profileBtn.classList.remove('open');
    }

    function createPanel(modifier, html) {
        const panel = document.createElement('div');
        panel.className = 'topbar-dropdown ' + modifier;
        panel.innerHTML = html;
        topbarRight.appendChild(panel);
        panels.push(panel);
        return panel;
    }

    // Tombol notifikasi (lonceng)
    if (notifBtn) {
        notifPanel = createPanel('dropdown-notif',
            '<div class="dropdown-head">' +
                '<h4>Notifikasi</h4>' +
                '<span class="dropdown-count">3 baru</span>' +
            '</div>' +
            '<ul class="dropdown-list">' +
                '<li class="dropdown-item">' +
                    '<span class="dropdown-item-icon"><i class="fa-solid fa-car-side"></i></span>' +
                    '<span class="dropdown-item-text"><strong>Kepadatan tinggi di Simpang Lima</strong><small>5 menit lalu</small></span>' +
                '</li>' +
                '<li class="dropdown-item">' +
                    '<span class="dropdown-item-icon"><i class="fa-solid fa-wind"></i></span>' +
                    '<span class="dropdown-item-text"><strong>Kualitas udara membaik (AQI 42)</strong><small>32 menit lalu</small></span>' +
                '</li>' +
                '<li class="dropdown-item">' +
                    '<span class="dropdown-item-icon"><i class="fa-solid fa-satellite-dish"></i></span>' +
                    '<span class="dropdown-item-text"><strong>Sensor IoT-08 kembali online</strong><small>1 jam lalu</small></span>' +
                '</li>' +
            '</ul>'
        );

        notifBtn.addEventListener('click', () => {
            const willOpen = !notifPanel.classList.contains('open');
            closeAll();
            if (willOpen) {
                notifPanel.classList.add('open');
                notifBtn.classList.add('open');
            }
        });
    }

    // Tombol profil (avatar + chevron)
    if (profileBtn) {
        const img = profileBtn.querySelector('img');
        const nameEl = profileBtn.querySelector('.user-name');
        const emailEl = profileBtn.querySelector('.user-email');
        const avatar = img ? img.getAttribute('src') : '';
        const name = nameEl ? nameEl.textContent.trim() : 'Admin Smart City';
        const email = emailEl ? emailEl.textContent.trim() : 'admin@nebula.gov';

        profilePanel = createPanel('dropdown-profile',
            '<div class="dropdown-head dropdown-profile-head">' +
                '<img src="' + avatar + '" alt="">' +
                '<span class="dropdown-item-text"><strong>' + name + '</strong><small>' + email + '</small></span>' +
            '</div>' +
            '<ul class="dropdown-list">' +
                '<li class="dropdown-item" data-nav="pengaturan.html">' +
                    '<span class="dropdown-item-icon"><i class="fa-solid fa-user"></i></span>' +
                    '<span class="dropdown-item-text"><strong>Profil Saya</strong></span>' +
                '</li>' +
                '<li class="dropdown-item" data-nav="pengaturan.html">' +
                    '<span class="dropdown-item-icon"><i class="fa-solid fa-gear"></i></span>' +
                    '<span class="dropdown-item-text"><strong>Pengaturan</strong></span>' +
                '</li>' +
                '<li class="dropdown-item" data-nav="bantuan.html">' +
                    '<span class="dropdown-item-icon"><i class="fa-regular fa-circle-question"></i></span>' +
                    '<span class="dropdown-item-text"><strong>Bantuan</strong></span>' +
                '</li>' +
                '<li class="dropdown-item logout-item" data-action="logout">' +
                    '<i class="fa-solid fa-arrow-right-from-bracket"></i><span>Keluar</span>' +
                '</li>' +
            '</ul>'
        );

        profileBtn.addEventListener('click', () => {
            const willOpen = !profilePanel.classList.contains('open');
            closeAll();
            if (willOpen) {
                profilePanel.classList.add('open');
                profileBtn.classList.add('open');
            }
        });

        profilePanel.addEventListener('click', (e) => {
            const item = e.target.closest('.dropdown-item');
            if (!item) return;
            const nav = item.getAttribute('data-nav');
            const action = item.getAttribute('data-action');
            closeAll();
            if (nav) { window.location.href = nav; return; }
            if (action === 'logout') {
                const modal = document.getElementById('logoutModal');
                if (modal) modal.classList.add('active');
                else window.location.href = 'login.html';
            }
        });
    }

    // Tutup saat klik di luar panel atau tekan Escape
    document.addEventListener('click', (e) => {
        if (!topbarRight.contains(e.target)) closeAll();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAll();
    });
})();