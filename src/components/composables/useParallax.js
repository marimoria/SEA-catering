import { gsap } from "../../js/vendor";

const mouse = { x: 0, y: 0 };
let rotateDeg = 0;

function transformParallax(parallaxEl) {
    let speedX = parallaxEl.dataset.speedx;
    let speedY = parallaxEl.dataset.speedy;

    gsap.to(parallaxEl, {
        x: -mouse.x * speedX,
        y: mouse.y * speedY,
        rotationY: rotateDeg
    });
}

export function useParallax(parallaxEl) {
    transformParallax(parallaxEl);

    if (window.matchMedia("(pointer: coarse)").matches) {
        window.addEventListener("touchmove", (e) => {
            mouse.x = e.clientX - window.innerWidth / 2;
            mouse.y = e.clientY - window.innerWidth / 2;
            rotateDeg = (mouse.x / (window.innerWidth / 2)) * 20;

            transformParallax(parallaxEl);
        });
    }

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX - window.innerWidth / 2;
        mouse.y = e.clientY - window.innerWidth / 2;
        rotateDeg = (mouse.x / (window.innerWidth / 2)) * 10;

        transformParallax(parallaxEl);
    });
}
