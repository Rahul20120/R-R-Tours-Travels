/* ==========================================
   R & R Tours & Travels V2
   Foundation JavaScript
========================================== */

/*=========================================
        GLOBAL HELPERS
=========================================*/

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

/*=========================================
        SAFE EVENT LISTENER
=========================================*/

function on(element, event, callback, options = false){

    if(element){

        element.addEventListener(event, callback, options);

    }

}

/*=========================================
        SAFE OBSERVER
=========================================*/

function observe(elements, callback, threshold = 0.15){

    const observer = new IntersectionObserver(callback, {

        threshold

    });

    elements.forEach(el => {

        if(el){

            observer.observe(el);

        }

    });

    return observer;

}

"use strict";

/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

        loader.style.transition = "0.5s ease";

        setTimeout(function () {

            loader.remove();

        }, 500);

    }

});

/* ==========================================
   SMOOTH SCROLL (Anchor Links)
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});

/* ==========================================
   CURRENT YEAR
========================================== */

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}

/* ==========================================
   PAGE LOADED
========================================== */

console.log("====================================");
console.log("R & R Tours & Travels V2 Loaded");
console.log("Foundation Ready");
console.log("====================================");

/*=========================================
        HEADER JAVASCRIPT
=========================================*/

const header = document.getElementById("header");

window.addEventListener("scroll", function () {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/*=========================================
        MOBILE MENU
=========================================*/

const menuToggle = document.querySelector(".menu-toggle");

const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function () {

        navbar.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navbar.classList.contains("active")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}

/*=========================================
    CLOSE MENU AFTER CLICK
=========================================*/

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navbar) {

            navbar.classList.remove("active");

        }

        const icon = menuToggle?.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

});

/*=========================================
        ACTIVE MENU
=========================================*/

const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(function (link) {

    const href = link.getAttribute("href");

    if (
        href === currentPage ||
        (currentPage === "" && href === "index.html")
    ) {

        navLinks.forEach(function (item) {

            item.classList.remove("active");

        });

        link.classList.add("active");

    }

});

/*=========================================
        BOOKING ENGINE JAVASCRIPT
=========================================*/

// Booking Tabs

const tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        tabButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const searchBtn = document.querySelector(".search-btn");

        if (!searchBtn) return;

        const text = this.textContent.trim();

        switch (text) {

            case "Flights":
                searchBtn.innerHTML =
                    '<i class="fa-solid fa-magnifying-glass"></i> Search Flights';
                break;

            case "Hotels":
                searchBtn.innerHTML =
                    '<i class="fa-solid fa-magnifying-glass"></i> Search Hotels';
                break;

            case "Bus":
                searchBtn.innerHTML =
                    '<i class="fa-solid fa-magnifying-glass"></i> Search Bus';
                break;

            case "Train":
                searchBtn.innerHTML =
                    '<i class="fa-solid fa-magnifying-glass"></i> Search Train';
                break;

            case "Cab":
                searchBtn.innerHTML =
                    '<i class="fa-solid fa-magnifying-glass"></i> Search Cab';
                break;

        }

    });

});

/*=========================================
        TRIP TYPE
=========================================*/

const tripTypes = document.querySelectorAll('input[name="trip"]');

const returnInput = document.querySelectorAll(".input-box input[type='date']")[1];

tripTypes.forEach(function (trip) {

    trip.addEventListener("change", function () {

        if (!returnInput) return;

        const label = this.parentElement.textContent.trim();

        if (label === "One Way") {

            returnInput.parentElement.style.display = "none";

        } else {

            returnInput.parentElement.style.display = "block";

        }

    });

});

// Hide Return field initially

if (returnInput) {

    returnInput.parentElement.style.display = "none";

}

/*=========================================
        SEARCH VALIDATION
=========================================*/

const bookingForm = document.querySelector(".booking-form");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const inputs = bookingForm.querySelectorAll("input");

        let valid = true;

        inputs.forEach(function (input) {

            if (
                input.type !== "date" &&
                input.value.trim() === ""
            ) {

                valid = false;

            }

        });

        if (!valid) {

            alert("Please fill all required fields.");

            return;

        }

        const button = bookingForm.querySelector(".search-btn");

        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Searching...';

        button.disabled = true;

        setTimeout(function () {

            button.innerHTML =
                '<i class="fa-solid fa-circle-check"></i> Search Completed';

            setTimeout(function () {

                button.innerHTML =
                    '<i class="fa-solid fa-magnifying-glass"></i> Search Flights';

                button.disabled = false;

            }, 2000);

        }, 2000);

    });

}

/*=========================================
        INPUT HIGHLIGHT
=========================================*/

const bookingInputs = document.querySelectorAll(".input-box input, .input-box select");

bookingInputs.forEach(function (field) {

    field.addEventListener("focus", function () {

        this.parentElement.style.borderColor = "#00B8FF";

    });

    field.addEventListener("blur", function () {

        this.parentElement.style.borderColor = "rgba(255,255,255,.10)";

    });

});

/*=========================================
      POPULAR ROUTES JAVASCRIPT
=========================================*/

// Route Cards

const routeCards = document.querySelectorAll(".route-card");

routeCards.forEach((card, index) => {

    // Initial Animation

    card.style.opacity = "0";

    card.style.transform = "translateY(60px)";

    setTimeout(() => {

        card.style.transition = ".6s ease";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    }, index * 150);

    // Hover Effect

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0) scale(1)";

    });

});


/*=========================================
        BUTTON RIPPLE EFFECT
=========================================*/

const routeButtons = document.querySelectorAll(".route-btn");

routeButtons.forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        ripple.style.position = "absolute";

        ripple.style.width = "12px";

        ripple.style.height = "12px";

        ripple.style.borderRadius = "50%";

        ripple.style.background = "rgba(255,255,255,.6)";

        ripple.style.left = (e.clientX - rect.left) + "px";

        ripple.style.top = (e.clientY - rect.top) + "px";

        ripple.style.transform = "translate(-50%,-50%)";

        ripple.style.pointerEvents = "none";

        ripple.style.transition = ".6s";

        ripple.style.zIndex = "10";

        this.style.position = "relative";

        this.style.overflow = "hidden";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.style.width="350px";

            ripple.style.height="350px";

            ripple.style.opacity="0";

        },10);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


/*=========================================
        ACTIVE CARD
=========================================*/

routeCards.forEach(card=>{

    card.addEventListener("click",()=>{

        routeCards.forEach(item=>{

            item.classList.remove("active-card");

        });

        card.classList.add("active-card");

    });

});


/*=========================================
        AUTO GLOW EFFECT
=========================================*/

let activeIndex = 0;

setInterval(()=>{

    routeCards.forEach(card=>{

        card.classList.remove("active-card");

    });

    if(routeCards.length){

        routeCards[activeIndex].classList.add("active-card");

        activeIndex++;

        if(activeIndex>=routeCards.length){

            activeIndex=0;

        }

    }

},3000);


/*=========================================
        CONSOLE MESSAGE
=========================================*/

console.log("Popular Routes Ready");

/*=========================================
      HOLIDAY PACKAGES JAVASCRIPT
=========================================*/

// Package Cards

const packageCards = document.querySelectorAll(".package-card");

packageCards.forEach((card, index) => {

    /* Entry Animation */

    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";

    setTimeout(() => {

        card.style.transition = ".6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, index * 180);

    /* Hover Effect */

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0) scale(1)";

    });

});


/*=========================================
      PACKAGE BUTTON EFFECT
=========================================*/

const packageButtons = document.querySelectorAll(".package-btn");

packageButtons.forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        const originalText = this.innerHTML;

        this.innerHTML =

        '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';

        this.style.pointerEvents = "none";

        setTimeout(()=>{

            this.innerHTML =

            '<i class="fa-solid fa-circle-check"></i> Package Ready';

        },1200);

        setTimeout(()=>{

            this.innerHTML = originalText;

            this.style.pointerEvents = "auto";

        },2500);

    });

});


/*=========================================
      IMAGE PARALLAX
=========================================*/

packageCards.forEach(card=>{

    const image = card.querySelector("img");

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;

        const y = (e.clientY - rect.top) / rect.height;

        image.style.transform =

        `scale(1.08) translate(${(x-.5)*10}px, ${(y-.5)*10}px)`;

    });

    card.addEventListener("mouseleave",()=>{

        image.style.transform="scale(1)";

    });

});


/*=========================================
      AUTO HIGHLIGHT
=========================================*/

let packageIndex = 0;

setInterval(()=>{

    packageCards.forEach(card=>{

        card.classList.remove("active-package");

    });

    if(packageCards.length){

        packageCards[packageIndex].classList.add("active-package");

        packageIndex++;

        if(packageIndex >= packageCards.length){

            packageIndex = 0;

        }

    }

},3500);


/*=========================================
      CONSOLE
=========================================*/

console.log("Holiday Packages Ready");

/*=========================================
        DESTINATIONS JAVASCRIPT
=========================================*/

const destinationCards = document.querySelectorAll(".destination-card");

/*=========================================
        ENTRY ANIMATION
=========================================*/

destinationCards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";

    setTimeout(() => {

        card.style.transition = "all .7s ease";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    }, index * 180);

});

/*=========================================
        MOUSE TILT EFFECT
=========================================*/

destinationCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;

        const rotateX = ((rect.height / 2 - y) / rect.height) * 10;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

});

/*=========================================
        BUTTON CLICK EFFECT
=========================================*/

document.querySelectorAll(".destination-overlay a").forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        const text = this.innerHTML;

        this.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';

        this.style.pointerEvents = "none";

        setTimeout(()=>{

            this.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> Opening';

        },1000);

        setTimeout(()=>{

            this.innerHTML = text;

            this.style.pointerEvents = "auto";

        },2200);

    });

});

/*=========================================
        AUTO ACTIVE CARD
=========================================*/

let destinationIndex = 0;

setInterval(()=>{

    destinationCards.forEach(card=>{

        card.classList.remove("active-destination");

    });

    if(destinationCards.length){

        destinationCards[destinationIndex]
        .classList.add("active-destination");

        destinationIndex++;

        if(destinationIndex >= destinationCards.length){

            destinationIndex = 0;

        }

    }

},3000);

/*=========================================
        CONSOLE
=========================================*/

console.log("Destinations Ready");

/*=========================================
        WHY CHOOSE US JAVASCRIPT
=========================================*/

const featureCards = document.querySelectorAll(".feature-card");
const statBoxes = document.querySelectorAll(".stat-box");

/*=========================================
        FEATURE CARD ANIMATION
=========================================*/

featureCards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";

    setTimeout(() => {

        card.style.transition = "all .6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, index * 150);

});

/*=========================================
        STATS COUNTER
=========================================*/

const statValues = [
    { value: 15000, suffix: "+" },
    { value: 120, suffix: "+" },
    { value: 98, suffix: "%" },
    { value: 24, suffix: "/7" }
];

statBoxes.forEach((box, index) => {

    const heading = box.querySelector("h4");

    let count = 0;

    const target = statValues[index].value;

    const increment = Math.max(1, Math.ceil(target / 80));

    const counter = setInterval(() => {

        count += increment;

        if (count >= target) {

            count = target;

            clearInterval(counter);

        }

        if (index === 0) {

            heading.textContent = Math.floor(count / 1000) + "K" + statValues[index].suffix;

        } else {

            heading.textContent = count + statValues[index].suffix;

        }

    }, 20);

});

/*=========================================
        FEATURE HOVER EFFECT
=========================================*/

featureCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = ((rect.height / 2 - y) / rect.height) * 8;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

});

/*=========================================
        AUTO ACTIVE FEATURE
=========================================*/

let featureIndex = 0;

setInterval(() => {

    featureCards.forEach(card => {

        card.classList.remove("active-feature");

    });

    if (featureCards.length) {

        featureCards[featureIndex].classList.add("active-feature");

        featureIndex++;

        if (featureIndex >= featureCards.length) {

            featureIndex = 0;

        }

    }

}, 3000);

/*=========================================
        CONSOLE
=========================================*/

console.log("Why Choose Us Ready");

/*=========================================
        SPECIAL OFFERS JAVASCRIPT
=========================================*/

const offerCards = document.querySelectorAll(".offer-card");
const offerButtons = document.querySelectorAll(".offer-btn");

/*=========================================
        ENTRY ANIMATION
=========================================*/

offerCards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";

    setTimeout(() => {

        card.style.transition = "all .7s ease";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    }, index * 180);

});

/*=========================================
        BUTTON LOADING EFFECT
=========================================*/

offerButtons.forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        const originalText = this.innerHTML;

        this.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

        this.style.pointerEvents = "none";

        setTimeout(()=>{

            this.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> Redirecting';

        },1200);

        setTimeout(()=>{

            this.innerHTML = originalText;

            this.style.pointerEvents = "auto";

        },2500);

    });

});

/*=========================================
        IMAGE PARALLAX EFFECT
=========================================*/

offerCards.forEach(card=>{

    const image = card.querySelector("img");

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;

        const y = (e.clientY - rect.top) / rect.height;

        image.style.transform =

        `scale(1.08) translate(${(x-.5)*12}px, ${(y-.5)*12}px)`;

    });

    card.addEventListener("mouseleave",()=>{

        image.style.transform = "scale(1)";

    });

});

/*=========================================
        AUTO ACTIVE CARD
=========================================*/

let offerIndex = 0;

setInterval(()=>{

    offerCards.forEach(card=>{

        card.classList.remove("active-offer");

    });

    if(offerCards.length){

        offerCards[offerIndex].classList.add("active-offer");

        offerIndex++;

        if(offerIndex >= offerCards.length){

            offerIndex = 0;

        }

    }

},3000);

/*=========================================
        COUNTDOWN TIMER
=========================================*/

const countdownBadge = document.querySelectorAll(".offer-badge");

let offerTime = 72;

setInterval(()=>{

    offerTime--;

    if(offerTime <= 0){

        offerTime = 72;

    }

    countdownBadge.forEach((badge,index)=>{

        if(index === 0){

            badge.textContent = `${offerTime}H LEFT`;

        }

    });

},3600000);

/*=========================================
        CONSOLE
=========================================*/

console.log("Special Offers Ready");

/*=========================================
        TESTIMONIALS JAVASCRIPT
=========================================*/

const testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialStars = document.querySelectorAll(".testimonial-rating i");

/*=========================================
        ENTRY ANIMATION
=========================================*/

testimonialCards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";

    setTimeout(() => {

        card.style.transition = "all .7s ease";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    }, index * 180);

});

/*=========================================
        STAR ANIMATION
=========================================*/

testimonialCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        const stars = card.querySelectorAll(".testimonial-rating i");

        stars.forEach((star, index) => {

            setTimeout(() => {

                star.style.transform = "scale(1.35) rotate(12deg)";

            }, index * 70);

        });

    });

    card.addEventListener("mouseleave", () => {

        const stars = card.querySelectorAll(".testimonial-rating i");

        stars.forEach(star => {

            star.style.transform = "scale(1) rotate(0deg)";

        });

    });

});

/*=========================================
        3D TILT EFFECT
=========================================*/

testimonialCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((rect.height / 2 - y) / rect.height) * 8;
        const rotateY = ((x / rect.width) - 0.5) * 8;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

});

/*=========================================
        AUTO ACTIVE CARD
=========================================*/

let testimonialIndex = 0;

setInterval(() => {

    testimonialCards.forEach(card => {

        card.classList.remove("active-testimonial");

    });

    if (testimonialCards.length) {

        testimonialCards[testimonialIndex]
            .classList.add("active-testimonial");

        testimonialIndex++;

        if (testimonialIndex >= testimonialCards.length) {

            testimonialIndex = 0;

        }

    }

}, 3000);

/*=========================================
        REVIEW CLICK EFFECT
=========================================*/

testimonialCards.forEach(card => {

    card.addEventListener("click", () => {

        card.style.transition = ".25s";

        card.style.transform = "scale(.97)";

        setTimeout(() => {

            card.style.transform = "scale(1)";

        }, 180);

    });

});

/*=========================================
        CONSOLE
=========================================*/

console.log("Testimonials Ready");

/*=========================================
        TRAVEL BLOG JAVASCRIPT
=========================================*/

const blogCards = document.querySelectorAll(".blog-card");
const blogButtons = document.querySelectorAll(".blog-btn");

/*=========================================
        ENTRY ANIMATION
=========================================*/

blogCards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";

    setTimeout(() => {

        card.style.transition = "all .7s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, index * 180);

});

/*=========================================
        READ MORE BUTTON
=========================================*/

blogButtons.forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        const originalText = this.innerHTML;

        this.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Opening...';

        this.style.pointerEvents = "none";

        setTimeout(() => {

            this.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> Ready';

        },1000);

        setTimeout(() => {

            this.innerHTML = originalText;

            this.style.pointerEvents = "auto";

        },2200);

    });

});

/*=========================================
        3D HOVER EFFECT
=========================================*/

blogCards.forEach(card => {

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width)-0.5)*8;
        const rotateX = ((rect.height/2-y)/rect.height)*8;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
        `;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

});

/*=========================================
        AUTO ACTIVE BLOG
=========================================*/

let blogIndex = 0;

setInterval(()=>{

    blogCards.forEach(card=>{

        card.classList.remove("active-blog");

    });

    if(blogCards.length){

        blogCards[blogIndex].classList.add("active-blog");

        blogIndex++;

        if(blogIndex >= blogCards.length){

            blogIndex = 0;

        }

    }

},3000);

/*=========================================
        IMAGE PARALLAX
=========================================*/

blogCards.forEach(card=>{

    const image = card.querySelector("img");

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = (e.clientX-rect.left)/rect.width;
        const y = (e.clientY-rect.top)/rect.height;

        image.style.transform =
        `scale(1.08) translate(${(x-.5)*12}px, ${(y-.5)*12}px)`;

    });

    card.addEventListener("mouseleave",()=>{

        image.style.transform = "scale(1)";

    });

});

/*=========================================
        CONSOLE
=========================================*/

console.log("Travel Blog Ready");

/*=========================================
        NEWSLETTER JAVASCRIPT
=========================================*/

const newsletterForm = document.querySelector(".newsletter-form");
const newsletterButton = document.querySelector(".newsletter-btn");

/*=========================================
        INPUT FOCUS EFFECT
=========================================*/

document.querySelectorAll(".newsletter-form input").forEach(input => {

    input.addEventListener("focus", () => {

        input.parentElement.classList.add("active-input");

    });

    input.addEventListener("blur", () => {

        if(input.value.trim() === ""){

            input.parentElement.classList.remove("active-input");

        }

    });

});

/*=========================================
        FORM SUBMIT
=========================================*/

if(newsletterForm){

newsletterForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const name =
    newsletterForm.querySelector('input[type="text"]').value.trim();

    const email =
    newsletterForm.querySelector('input[type="email"]').value.trim();

    const phone =
    newsletterForm.querySelector('input[type="tel"]').value.trim();

    if(name === ""){

        alert("Please enter your full name.");

        return;

    }

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){

        alert("Please enter a valid email address.");

        return;

    }

    if(!/^[0-9]{10}$/.test(phone)){

        alert("Please enter a valid 10 digit mobile number.");

        return;

    }

    const originalText = newsletterButton.innerHTML;

    newsletterButton.disabled = true;

    newsletterButton.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Subscribing...';

    setTimeout(()=>{

        newsletterButton.innerHTML =
        '<i class="fa-solid fa-circle-check"></i> Successfully Subscribed';

    },1500);

    setTimeout(()=>{

        newsletterButton.disabled = false;

        newsletterButton.innerHTML = originalText;

        newsletterForm.reset();

        document
        .querySelectorAll(".form-group")
        .forEach(group=>{

            group.classList.remove("active-input");

        });

    },3000);

});

}

/*=========================================
        BUTTON HOVER EFFECT
=========================================*/

newsletterButton?.addEventListener("mouseenter",()=>{

    newsletterButton.style.transform="translateY(-4px) scale(1.02)";

});

newsletterButton?.addEventListener("mouseleave",()=>{

    newsletterButton.style.transform="translateY(0) scale(1)";

});

/*=========================================
        CONSOLE
=========================================*/

console.log("Newsletter Ready");

/*=========================================
            FOOTER JAVASCRIPT
=========================================*/

const backToTop = document.getElementById("backToTop");
const footerSocialLinks = document.querySelectorAll(".footer-social a");
const footerNavLinks = document.querySelectorAll(".footer-column a");

/*=========================================
        BACK TO TOP VISIBILITY
=========================================*/

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        backToTop?.classList.add("show");

    }else{

        backToTop?.classList.remove("show");

    }

});

/*=========================================
        BACK TO TOP CLICK
=========================================*/

backToTop?.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*=========================================
        SOCIAL ICON HOVER
=========================================*/

footerSocialLinks.forEach(icon => {

    icon.addEventListener("mouseenter", () => {

        icon.style.transform = "translateY(-8px) rotate(10deg) scale(1.08)";

    });

    icon.addEventListener("mouseleave", () => {

        icon.style.transform = "";

    });

});

/*=========================================
        FOOTER LINK RIPPLE EFFECT
=========================================*/

footerNavLinks.forEach(link => {

    link.addEventListener("click", function(){

        this.style.transition = "all .25s ease";

        this.style.transform = "translateX(10px)";

        setTimeout(() => {

            this.style.transform = "translateX(0)";

        },250);

    });

});

/*=========================================
        FOOTER FADE-IN
=========================================*/

const footer = document.getElementById("footer");

if(footer){

    const footerObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                footer.style.opacity = "1";
                footer.style.transform = "translateY(0)";

            }

        });

    },{

        threshold:0.2

    });

    footer.style.opacity = "0";
    footer.style.transform = "translateY(60px)";
    footer.style.transition = "all .8s ease";

    footerObserver.observe(footer);

}

/*=========================================
        CONSOLE
=========================================*/

console.log("Footer Ready");

/*=========================================
        FINAL WEBSITE ENHANCEMENTS
=========================================*/

/*=========================================
        SCROLL PROGRESS BAR
=========================================*/

const progressBar = document.createElement("div");

progressBar.id = "scrollProgress";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / pageHeight) * 100;

    progressBar.style.width = progress + "%";

});

/*=========================================
        GLOBAL SCROLL REVEAL
=========================================*/

const revealElements = document.querySelectorAll(

    "section,.package-card,.route-card,.destination-card,.feature-card,.offer-card,.testimonial-card,.blog-card,.newsletter-wrapper,.footer-column"

);

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("reveal-active");

        }

    });

},{

    threshold:0.15

});

revealElements.forEach(el=>{

    el.classList.add("reveal-hidden");

    revealObserver.observe(el);

});

/*=========================================
        ACTIVE NAVIGATION
=========================================*/

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll",()=>{

    let currentSection = "";

    sections.forEach(section=>{

        const top = section.offsetTop - 140;
        const height = section.offsetHeight;

        if(window.scrollY >= top &&
           window.scrollY < top + height){

            currentSection = section.id;

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + currentSection){

            link.classList.add("active");

        }

    });

});

/*=========================================
        IMAGE LAZY LOADING
=========================================*/

document.querySelectorAll("img").forEach(img=>{

    img.setAttribute("loading","lazy");

});

/*=========================================
        BUTTON RIPPLE EFFECT
=========================================*/

document.querySelectorAll("button,.btn").forEach(button=>{

    button.addEventListener("click",(e)=>{

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = button.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";

        button.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/*=========================================
        PAGE LOADED CLASS
=========================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("page-loaded");

});

/*=========================================
        PERFORMANCE
=========================================*/

window.addEventListener("pageshow",()=>{

    document.body.classList.remove("page-loading");

});

/*=========================================
        CONSOLE
=========================================*/

console.log("Website Fully Optimized 🚀");