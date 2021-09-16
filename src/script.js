import './style.scss'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


function intro() {
    const tl = gsap.timeline()

    tl.from('.hero_phone', {
        y: 200,
        duration: 1,
        onComplete: () => heroTl.add(stopTrigger())
    })

    return tl
}

function stopTrigger() {
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

    tl.to('.hero_phone', {
        scale: 1.2
    }, '+=.2')

    tl.to('.hero__container', {
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
    delay: function(e) {
        return .2 * e
    }
})

const heroTl = gsap.timeline()
heroTl.add(intro())
