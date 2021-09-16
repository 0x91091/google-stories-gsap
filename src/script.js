import './style.scss'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


window.onload = () => {
    function intersection(entries, index, slider, rootMargin = '0px') {

        let isIntersecting = false
        let currentRef


        const observer = new IntersectionObserver(e => {
            e.forEach(entry => {
                isIntersecting = entry?.isIntersecting ?? false
                if (isIntersecting) {
                    currentRef = entries
                    slider.forEach((e, i) => {
                        if (i === index) e.classList.add('active')
                        else e.classList.remove('active')
                    })
                }
            })
        }, {
            rootMargin,
            threshold: 0.5
        });
        if (entries) {
            observer.observe(entries);
        }
        if (currentRef) {
            observer.unobserve(currentRef);
        }

        return {
            intersecting: {
                isIntersecting,
                index
            }
        };
    }



    function intro() {
        const tl = gsap.timeline()

        tl.from('.hero_phone', {
            y: 200,
            duration: 1,
            onComplete: () => heroTl.add(stopHeroTrigger())
        })

        return tl
    }

    function stopHeroTrigger() {
        const tl = gsap.timeline({
                delay: 1,
                scrollTrigger: {
                    trigger: '.hero_phone',
                    start: 'top top',
                    end: '+=1000',
                    pin: true,
                    scrub: true
                }
            })
            .to('.hero_phone', {
                scale: 1.2
            }, '+=.2')
            .to('.hero__container', {
                backgroundColor: 'black',
                duration: .25,
            }, '-=0.5')

        return tl
    }


    gsap.from('.hero-text', {
        autoAlpha: 0,
        duration: .5,
        delay: .2
    })

    const tl = gsap.timeline({
        delay: .5
    })
    tl.from('.hero_element', {
        y: 300,
        duration: 1,
        delay: function (e) {
            return .2 * e
        }
    })

    const heroTl = gsap.timeline().add(intro())

    let interSecting
    const sliderLeft = document.querySelectorAll('.slider_left ._slide')
    const sliderRight = document.querySelectorAll('.slider_right img')

    sliderLeft.forEach((e, i) => {
        interSecting = intersection(e, i, sliderRight)
    })


    function sliderStopTrigger() {

    }

    const sliderTl = gsap.timeline().add(sliderStopTrigger())

}