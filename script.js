/* ==========================================
   R & R TOURS & TRAVELS
   script.js - Part 1
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       ELEMENTS
    ====================================== */

    const header = document.querySelector(".header");
    const loader = document.querySelector(".page-loader");
    const menuBtn = document.querySelector(".menu-btn");
    const navbar = document.querySelector(".navbar");
    const backToTop = document.querySelector(".back-to-top");

    const cursor = document.querySelector(".cursor");
    const cursorBlur = document.querySelector(".cursor-blur");

    const revealItems = document.querySelectorAll(".reveal");

    /* ======================================
       PAGE LOADER
    ====================================== */
window.addEventListener("load", () => {

    const loader = document.querySelector(".page-loader");

    if(loader){

        loader.style.transition = "opacity .6s ease";

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.remove();

        },600);

    }

});
    /* ======================================
       STICKY HEADER
    ====================================== */

    function updateHeader(){

        if(!header) return;

        if(window.scrollY > 60){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader);

    /* ======================================
       MOBILE MENU
    ====================================== */

    if(menuBtn && navbar){

        menuBtn.addEventListener("click",()=>{

            navbar.classList.toggle("active");
            menuBtn.classList.toggle("active");

        });

    }

    /* Close menu after clicking a link */

    document.querySelectorAll(".navbar a").forEach(link=>{

        link.addEventListener("click",()=>{

            navbar?.classList.remove("active");
            menuBtn?.classList.remove("active");

        });

    });

    /* ======================================
       SMOOTH SCROLL
    ====================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            const target = document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",
                block:"start"

            });

        });

    });

    /* ======================================
       BACK TO TOP
    ====================================== */

    if(backToTop){

        backToTop.style.opacity = "0";
        backToTop.style.pointerEvents = "none";

        window.addEventListener("scroll",()=>{

            if(window.scrollY > 500){

                backToTop.style.opacity="1";
                backToTop.style.pointerEvents="auto";

            }else{

                backToTop.style.opacity="0";
                backToTop.style.pointerEvents="none";

            }

        });

    }

    /* ======================================
       CUSTOM CURSOR
    ====================================== */

    if(cursor && cursorBlur){

        window.addEventListener("mousemove",(e)=>{

            cursor.style.left=e.clientX+"px";
            cursor.style.top=e.clientY+"px";

            cursorBlur.style.left=e.clientX+"px";
            cursorBlur.style.top=e.clientY+"px";

        });

    }

    /* ======================================
       SCROLL REVEAL
    ====================================== */

    const revealObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{

        threshold:0.15

    });

    revealItems.forEach(item=>{

        revealObserver.observe(item);

    });

});

/* ==========================================
   booking.js - Part 2
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       BOOKING TABS
    ====================================== */

    const tabs = document.querySelectorAll(".booking-tabs .tab");
    const panels = document.querySelectorAll(".booking-panel");

    if (tabs.length) {

        tabs.forEach(tab => {

            tab.addEventListener("click", () => {

                tabs.forEach(item => item.classList.remove("active"));
                tab.classList.add("active");

                if (panels.length) {

                    const target = tab.dataset.tab;

                    panels.forEach(panel => {

                        panel.classList.remove("active");

                        if (panel.dataset.tab === target) {
                            panel.classList.add("active");
                        }

                    });

                }

            });

        });

    }

    /* ======================================
       SWAP FROM ↔ TO
    ====================================== */

    const swapButton = document.querySelector(".swap-button");

    const fromInput =
        document.querySelector('input[placeholder*="Mumbai"]');

    const toInput =
        document.querySelector('input[placeholder*="Dubai"]');

    if (swapButton && fromInput && toInput) {

        swapButton.addEventListener("click", () => {

            const temp = fromInput.value || fromInput.placeholder;

            fromInput.value = toInput.value || toInput.placeholder;

            toInput.value = temp;

        });

    }

    /* ======================================
       SEARCH BUTTON
    ====================================== */

    const bookingForm = document.querySelector(".booking-form");

    const searchBtn = document.querySelector(".search-btn");

    if (bookingForm && searchBtn) {

        bookingForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const requiredFields =
                bookingForm.querySelectorAll("input, select");

            let valid = true;

            requiredFields.forEach(field => {

                if (field.type !== "date" &&
                    field.tagName !== "SELECT" &&
                    field.value.trim() === "") {

                    valid = false;
                    field.classList.add("error");

                } else {

                    field.classList.remove("error");

                }

            });

            if (!valid) {

                alert("Please fill all required fields.");

                return;

            }

            const originalHTML = searchBtn.innerHTML;

            searchBtn.disabled = true;

            searchBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Searching...';

            setTimeout(() => {

                searchBtn.disabled = false;

                searchBtn.innerHTML = originalHTML;

                alert("Search feature will be connected to API.");

            }, 1800);

        });

    }

    /* ======================================
       REMOVE ERROR ON INPUT
    ====================================== */

    document.querySelectorAll("input, select").forEach(field => {

        field.addEventListener("input", () => {

            field.classList.remove("error");

        });

        field.addEventListener("change", () => {

            field.classList.remove("error");

        });

    });

});

/* ==========================================
   slider.js - Part 3
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       HERO SLIDER
    ====================================== */

    const heroSlides = document.querySelectorAll(".hero-slide");
    const nextBtn = document.querySelector(".hero-next");
    const prevBtn = document.querySelector(".hero-prev");

    let heroIndex = 0;
    let heroTimer;

    function showHeroSlide(index){

        if(!heroSlides.length) return;

        heroSlides.forEach(slide=>{
            slide.classList.remove("active");
        });

        heroSlides[index].classList.add("active");
    }

    function nextHero(){

        if(!heroSlides.length) return;

        heroIndex++;

        if(heroIndex >= heroSlides.length){

            heroIndex = 0;

        }

        showHeroSlide(heroIndex);

    }

    function prevHero(){

        if(!heroSlides.length) return;

        heroIndex--;

        if(heroIndex < 0){

            heroIndex = heroSlides.length - 1;

        }

        showHeroSlide(heroIndex);

    }

    function autoHero(){

        heroTimer = setInterval(nextHero,5000);

    }

    function resetHero(){

        clearInterval(heroTimer);

        autoHero();

    }

    nextBtn?.addEventListener("click",()=>{

        nextHero();
        resetHero();

    });

    prevBtn?.addEventListener("click",()=>{

        prevHero();
        resetHero();

    });

    if(heroSlides.length){

        showHeroSlide(heroIndex);
        autoHero();

    }

    /* ======================================
       TESTIMONIAL SLIDER
    ====================================== */

    const testimonialSlider =
        document.querySelector(".testimonial-slider");

    const testimonialCards =
        document.querySelectorAll(".testimonial-card");

    let testimonialIndex = 0;

    function updateTestimonials(){

        if(!testimonialSlider || !testimonialCards.length) return;

        const width =
            testimonialCards[0].offsetWidth + 30;

        testimonialSlider.style.transform =
            `translateX(-${testimonialIndex * width}px)`;

    }

    setInterval(()=>{

        if(testimonialCards.length <= 1) return;

        testimonialIndex++;

        if(testimonialIndex >= testimonialCards.length){

            testimonialIndex = 0;

        }

        updateTestimonials();

    },4500);

    /* ======================================
       TOUCH SWIPE
    ====================================== */

    let startX = 0;
    let endX = 0;

    const swipeArea =
        document.querySelector(".hero-slider");

    if(swipeArea){

        swipeArea.addEventListener("touchstart",(e)=>{

            startX = e.changedTouches[0].screenX;

        });

        swipeArea.addEventListener("touchend",(e)=>{

            endX = e.changedTouches[0].screenX;

            if(startX - endX > 50){

                nextHero();
                resetHero();

            }

            if(endX - startX > 50){

                prevHero();
                resetHero();

            }

        });

    }

    /* ======================================
       WINDOW RESIZE
    ====================================== */

    window.addEventListener("resize",()=>{

        updateTestimonials();

    });

});

/* ==========================================
   R & R Tours & Travels
   animation.js - Part 4
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       ANIMATED COUNTERS
    ====================================== */

    const counters = document.querySelectorAll(".counter-card h2");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const text = counter.textContent.trim();

            const target = parseInt(text.replace(/\D/g, ""), 10);

            if (isNaN(target)) return;

            const suffix = text.replace(/[0-9]/g, "");

            let current = 0;

            const increment = Math.max(1, Math.ceil(target / 100));

            const timer = setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.textContent = current + suffix;

            }, 20);

            counterObserver.unobserve(counter);

        });

    }, {
        threshold: 0.4
    });

    counters.forEach(counter => counterObserver.observe(counter));

    /* ======================================
       SCROLL PROGRESS BAR
    ====================================== */

    const progressBar = document.createElement("div");

    progressBar.className = "scroll-progress";

    document.body.appendChild(progressBar);

    function updateProgress() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress =
            (scrollTop / documentHeight) * 100;

        progressBar.style.width = progress + "%";

    }

    window.addEventListener("scroll", updateProgress);

    updateProgress();

    /* ======================================
       HERO PARALLAX
    ====================================== */

    const hero = document.querySelector(".hero");

    window.addEventListener("scroll", () => {

        if (!hero) return;

        hero.style.backgroundPositionY =
            `${window.scrollY * 0.4}px`;

    });

    /* ======================================
       FLOATING GLASS CARDS
    ====================================== */

    const floatCards = document.querySelectorAll(
        ".destination-card,.offer-card,.why-card"
    );

    floatCards.forEach((card, index) => {

        card.style.animationDelay = `${index * 0.15}s`;

    });

    /* ======================================
       MOUSE PARALLAX
    ====================================== */

    document.addEventListener("mousemove", (e) => {

        const blobs =
            document.querySelectorAll(".aurora-bg span");

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {

            const speed = (index + 1) * 12;

            blob.style.transform =
                `translate(${x * speed}px, ${y * speed}px)`;

        });

    });

    /* ======================================
       REVEAL ANIMATION
    ====================================== */

    const revealItems =
        document.querySelectorAll(".reveal");

    function revealOnScroll() {

        const trigger =
            window.innerHeight * 0.88;

        revealItems.forEach(item => {

            const top =
                item.getBoundingClientRect().top;

            if (top < trigger) {

                item.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();

    /* ======================================
       PAGE FADE-IN
    ====================================== */

    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition =
            "opacity .8s ease";

        document.body.style.opacity = "1";

    }, 100);

});