/*===== SIDEBAR SHOW =====*/
const showSidebar = (toggleId, sidebarId) => {
    const toggle = document.getElementById(toggleId),
    sidebar = document.getElementById(sidebarId)

    if(toggle && sidebar){
        toggle.addEventListener('click', ()=>{
            sidebar.classList.toggle('show')
        })
    }
}
showSidebar('sidebar-toggle','sidebar')

/*==================== REMOVE SIDEBAR MOBILE ====================*/
const sidebarLink = document.querySelectorAll('.sidebar__link')

function sidebarLinkAction(){
    const sidebar = document.getElementById('sidebar')
    // When we click on each sidebar__link, we remove the show class
    sidebar.classList.remove('show')
}
sidebarLink.forEach(n => n.addEventListener('click', sidebarLinkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        const sidebarLink = document.querySelector('.sidebar a[href*=' + sectionId + ']')
        if(sidebarLink){
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                sidebarLink.classList.add('active')
            }else{
                sidebarLink.classList.remove('active')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .blog__card, .contact__input',{interval: 200}); 

// ===== Dashboard Script =====

// Chart.js setup
(function loadChartJs() {
  if (!document.getElementById('chartjs-cdn')) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
    s.id = 'chartjs-cdn';
    s.defer = true;
    document.head.appendChild(s);
  }
})();

function renderQAMetricsChart() {
  const ctx = document.getElementById('qaMetricsChart');
  if (!ctx || typeof Chart === 'undefined') return;

  // Destroy existing chart if it exists
  if (ctx.chart) {
    ctx.chart.destroy();
  }

  const isMobile = window.innerWidth <= 576;
  const chartSize = isMobile ? 180 : 250;

  ctx.chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Automated', 'Manual'],
      datasets: [{
        label: 'Test Coverage',
        data: [85, 15],
        backgroundColor: ['#36a2eb','#ff6384'],
        hoverBackgroundColor: ['#1e78d2','#d8476c'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: isMobile ? 'bottom' : 'bottom',
          labels: {
            padding: isMobile ? 10 : 20,
            font: {
              size: isMobile ? 11 : 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(ctx){
              return `${ctx.label}: ${ctx.parsed}%`;
            }
          },
          titleFont: {
            size: isMobile ? 12 : 14
          },
          bodyFont: {
            size: isMobile ? 11 : 12
          }
        }
      },
      layout: {
        padding: isMobile ? 10 : 20
      }
    }
  });

  // Handle window resize
  const resizeHandler = () => {
    const newIsMobile = window.innerWidth <= 576;
    if (newIsMobile !== isMobile) {
      renderQAMetricsChart(); // Re-render with new settings
    }
  };

  window.addEventListener('resize', resizeHandler);
}

function setupGithubCalendar() {
  const container = document.getElementById('github-calendar-wrap');
  if (!container) return;

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/gh/Bloggify/github-calendar/dist/github-calendar.min.js';
  script.defer = true;
  script.onload = () => {
    if (typeof GitHubCalendar === 'function') {
      container.innerHTML = '<div id="github-calendar"></div>';
      GitHubCalendar('#github-calendar', 'fadlian17', { responsive: true, tooltips: true });
    } else {
      container.querySelector('.placeholder').textContent = 'Library GitHub Calendar gagal dimuat.';
    }
  };
  script.onerror = () => {
    if (container.querySelector('.placeholder')) {
      container.querySelector('.placeholder').textContent = 'Tidak bisa memuat GitHub Calendar.';
    }
  };
  document.head.appendChild(script);

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://cdn.jsdelivr.net/gh/Bloggify/github-calendar/dist/github-calendar.css';
  document.head.appendChild(css);
}

function initDashboardWidgets() {
  setupGithubCalendar();
  renderQAMetricsChart();
  // Jika ingin set progress bar anim saat section muncul:
  document.querySelectorAll('.progress span').forEach((bar) => {
    const value = getComputedStyle(bar).getPropertyValue('--p') || 0;
    bar.style.width = `${parseInt(value, 10)}%`;
  });
}

window.addEventListener('DOMContentLoaded', function() {
  // Dashboard temporarily disabled
  // setTimeout(initDashboardWidgets, 280);
});

/* ===== SCROLL REVEAL ANIMATION ===== */
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        // Optional: Stop observing after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with class 'section-content'
  const sectionContents = document.querySelectorAll('.section-content');
  sectionContents.forEach(content => {
    observer.observe(content);
  });
});
