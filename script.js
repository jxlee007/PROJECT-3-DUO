locoScroll = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
locoScroll();

// -----------------------------------

dot = () => {
    var main = document.querySelector('#main');
    // var vid = document.querySelector('.page1 video')
    var dot = document.querySelector('#cursor');
    
    document.addEventListener('mousemove', function (dets) {
        // using gsap for smooth flow
        gsap.to(dot, {
            x: dets.x, // Adding 10 to dets.x
            y: dets.y,
            opacity: 1,
        })
    })
    
    main.addEventListener('mouseleave', function () {
        gsap.to(dot, {
            scale: 1,
            opacity: 0,
        })
    })
}
dot();

// ---------------------------------------------------------

cursor = () => {

    const button = document.querySelector('button');
    let boundingRect = button.getBoundingClientRect();

    window.addEventListener('resize', () => {
        boundingRect = button.getBoundingClientRect();
    });

    button.addEventListener('mousemove', (e) => {
        const mousePosX = e.pageX - boundingRect.left;
        const mousePosY = e.pageY - boundingRect.top;
        gsap.to(button, {
            x: (mousePosX - boundingRect.width / 2) * 0.4,
            y: (mousePosY - boundingRect.height / 2) * 0.4,
            duration: 0.8,
            });
            console.log("a")
        });

    button.addEventListener('mouseleave', () => {
    gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1,0.3)'
        });
    });

}
cursor();

// ----------------------------------------------------------

gsap.from(".page1 h1,.page1 h2", {
    y: 30,
    rotate: 10,
    opacity: 0,
    delay: 0.3,
    duration: 1
})

an = () => {

    var isMobile = window.innerWidth <= 768; // Change this value based on your mobile breakpoint

    var tl = gsap.timeline({
        scrollTrigger: {
            // trigger: '.page1 h1',
            trigger: '.page1 h1',
            scroller: '#main',
            // markers: true,
            scrub: 3,
            start: 'top 10%',
            end: 'top 0',
        }
    })
    
    if (isMobile) {
        // Mobile animations
        tl.to('.page1 h1', {
            x: 0, // Change these values as needed
            duration: 1,
        }, 'anim')
        tl.to('.page1 h2', {
            x: 0, // Change these values as needed
            duration: 1,
        }, 'anim')
        tl.to('.page1 video', {
            height: '100vh',
            delay: .1,
        },)
    } else {
        // Desktop animations
        tl.to('.page1 h1', {
            x: -100,
            duration: 1,
        }, 'anim')
        tl.to('.page1 h2', {
            x: 100,
            duration: 1,
        }, 'anim')
        tl.to('.page1 video', {
            width: '90%',
            delay: .1,
        },)
    }
    
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: '.page1 h1',
            scroller: '#main',
            // markers: true,
            scrub: 3,
            start: isMobile ? 'top -50%' : 'top -120%', // Adjust these values as needed
            end: isMobile ? 'top -60%' : 'top -130%', // Adjust these values as needed
        }
    })
    tl2.to('#main', {
        backgroundColor: '#fff',
    })
    
    var tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: '.page1 h1',
            scroller: '#main',
            // markers: true,
            scrub: 3,
            start: isMobile ? 'top -140%' : 'top -280%', // Adjust these values as needed
            end: isMobile ? 'top -150%' : 'top -300%', // Adjust these values as needed
        }
    })
    tl3.to('#main', {
        backgroundColor: '#0f0d0d',
        color: 'white',
    })
        
}
an();

// -------------------------------------------------------

vid = () => {
    // var p1 = document.querySelector('page1')
    var vid = document.querySelector('.page1 video')
    var dot = document.querySelector('#cursor');
    
    // const transVal = dot.style.transition;
    
    
    vid.addEventListener('mouseenter', function () {
        dot.innerHTML = "sound on";
        dot.style.width = '7%';
        dot.style.display = 'flex';
        dot.style.alignItems = 'center';
        dot.style.justifyContent = 'center';
        dot.style.fontSize = '12px';
        dot.style.padding = ' 0px 15px';
        dot.style.borderRadius = '50px';
        dot.style.color = '#000';
        // dot.style.transition = '0.3s ease-in'
    });
    
    vid.addEventListener('click', function () {
        if (vid.muted) {
            vid.muted = false;
            dot.innerHTML = "sound off";
        } else {
            vid.muted = true;
            dot.innerHTML = "";
        }
    });
    
    vid.addEventListener('mouseleave', function () {
        dot.innerHTML = ""; // Clear the content of the dot element
        dot.style.width = '0'; // Reset the width of the dot element
        dot.style.width = '30px';
        dot.style.display = 'block';
        dot.style.fontSize = '0';
        dot.style.padding = ' 0';
        dot.style.borderRadius = '50px';
        // dot.style.transition = 'background-image ease 0.5s'
        gsap.to(dot, {
            opacity: 1,
    
        })
    });
    
    }
    vid();

// -----------------------------------------------------

loop = ()=>{
    // Select all the h4 tags in the nav tag
let navH4s = document.querySelectorAll('nav h4');

// Loop through each h4 tag
navH4s.forEach(function(navH4) {
    // Add mouseover event listener
    navH4.addEventListener('mouseover', function() {
        // Get the h4 content
        let h4Content = this.innerHTML;

        // Select all the h1 tags in the div with the elem class and nav id
        let elemH1s = document.querySelectorAll('#nav .marquee h1');

        // Loop through each h1 tag
        elemH1s.forEach(function(elemH1) {
            // Set the h1 content
            elemH1.innerHTML = h4Content;
            elemH1.style.fontSize = '10vw';
            elemH1.style.fontWeight = '100';
            elemH1.style.zIndex = '7';


        });
    });
});

var nav = document.querySelector('#nav')
var navi = document.querySelector('nav')
var h4 = document.querySelectorAll('nav h4')
h4.forEach(function (elem) {
    elem.addEventListener('mousemove', function () {
        nav.style.display = 'flex';
        nav.style.opacity = '1';
    })
    navi.addEventListener('mouseleave', function () {
        nav.style.display = 'none';
        nav.style.opacity = '0';
    })

});


}
loop();

// ------------------------------------------

box = ()=>{

    // var p4 = document.querySelector('.page4')

    document.querySelectorAll('.box').forEach(function(elem){

        elem.addEventListener("mousemove", function (dets) {
            gsap.to(elem.querySelector("img"), {
                opacity: 1,
                ease: Power3,
                x: dets.x ,
                y: dets.y ,
            });
        });

        elem.addEventListener("mouseleave", function() {
            gsap.to(elem.querySelector("img"), {
                opacity: 0,
                ease: Power3,
                duration: 0.5,
            });
        });
    

    });
}
box();

// ---------------------




// ------------------------------------
// var dot = document.querySelector('#cursor')

// var boxes = document.querySelectorAll('.box');
//     boxes.forEach(function (elem) {
//         elem.addEventListener('mouseenter', function (dets) {
//             var att = elem.getAttribute('data-image')
//             dot.style.width = '30vw';
//             dot.style.height = '45vh';
//             dot.style.mixBlendMode = 'normal';
//             dot.style.borderRadius = '0';
//             dot.style.backgroundImage = `url(${att})`;
        


//         })
//         elem.addEventListener('mouseleave', function (dets) {
//             dot.style.width = '30px';
//             dot.style.height = '30px';
//             dot.style.borderRadius = '50%';
//             dot.style.backgroundImage = 'none';
//             dot.style.mixBlendMode = 'difference';
//         })

//     })




