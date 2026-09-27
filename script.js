// Fungsi sederhana untuk menjalankan Time Tracker pada dashboard
document.addEventListener("DOMContentLoaded", () => {
    const timerDisplay = document.getElementById('systemTimer');
    
    // Setel waktu dummy (misal sistem sudah jalan 1 jam, 24 menit, 8 detik)
    let hours = 1;
    let minutes = 24;
    let seconds = 8;

    function formatTime(val) {
        return val < 10 ? `0${val}` : val;
    }

    function updateTimer() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        
        timerDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }

    // Perbarui timer setiap 1 detik
    const timerInterval = setInterval(updateTimer, 1000);
});


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