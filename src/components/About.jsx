import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import ScrollTrigger from 'gsap/all'
import AnimatedTitle from './ui/AnimatedTitle'

gsap.registerPlugin(ScrollTrigger)
const About = () => {
	useGSAP(() => {
		const clipAnimation = gsap.timeline({
			scrollTrigger: {
				trigger: '#clip',
				start: 'center center',
				end: '+=800 center',
				scrub: 0.5,
				pin: true,
				pinSpacing: true,
			},
		})
		clipAnimation.to('.mask-clip-path', {
			width: '100vw',
			height: '100vh',
			borderRadius: 0,
		})
	})
	return (
		<div
			id='about'
			className='min-h-screen w-screen'
		>
			<div className='relative flex flex-col mt-36 mb-8 items-center'>
				<h2 className='font-general text-sm uppercase md:text-[-10px]'>
					welcome to <b>A</b>rcane
				</h2>
				<AnimatedTitle
					title="disc<b>o</b>ver  the  world's <b>l</b>argest <br /> shared
					advanger"
					containerClass='mt-5 !text-black text-center'
				/>
				<div className='about-subtext'>
					<p>The Game of Games begins - your life, now an epic MMORPG.</p>
					<p>Arcane unites for every player countless Games and platforms.</p>
				</div>
			</div>
			<div
				id='clip'
				className='h-dvh w-screen '
			>
				<div className='mask-clip-path about-image'>
					<img
						src='img/about.jpg'
						alt='Background'
						className='absolute size-full object-cover top-0 left-0'
					/>
				</div>
			</div>
		</div>
	)
}

export default About
