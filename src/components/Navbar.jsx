import React, { useEffect, useRef, useState } from 'react'
import Button from './ui/Button'
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'

const navItems = ['Jinx', 'VI', 'Ekko', 'Victor', 'about']

const Navbar = () => {
	const [isAudioPlaying, setIsAduioPlaying] = useState(false)
	const [isIndicatorActive, setIsIndicatorActive] = useState(false)
	const [lastScrollY, setLastScrollY] = useState(0)
	const [isNavVisible, setIsNavVisible] = useState(true)

	const navContainerRef = useRef(null)
	const audioElementRef = useRef(null)

	const { y: currentScrollY } = useWindowScroll()

	const toggleAudioIndicator = () => {
		setIsAduioPlaying((prev) => !prev)
		setIsIndicatorActive((prev) => !prev)
	}

	useEffect(() => {
		if (isAudioPlaying) {
			audioElementRef.current.play()
		} else {
			audioElementRef.current.pause()
		}
	}, [isAudioPlaying])

	useEffect(() => {
		if (currentScrollY === 0) {
			setIsNavVisible(true)
			navContainerRef.current.classList.remove('floating-nav')
		} else if (currentScrollY > lastScrollY) {
			setIsNavVisible(false)
			navContainerRef.current.classList.add('floating-nav')
		} else if (currentScrollY < lastScrollY) {
			setIsNavVisible(true)
			navContainerRef.current.classList.add('floating-nav')
		}
		setLastScrollY(currentScrollY)
	}, [currentScrollY])

	useEffect(() => {
		gsap.to(navContainerRef.current, {
			y: isNavVisible ? 0 : -100,
			opacity: isNavVisible ? 1 : 0,
			duration: 0.3,
		})
	}, [isNavVisible])

	return (
		<div
			ref={navContainerRef}
			className='fixed inset-x-0 top-4 z-50 h-16  border-none transition-all dur sm:inset-x-6 '
		>
			<header className='absolute top-1/2 w-full -translate-y-1/2'>
				<nav className='flex justify-between items-center size-full p-4 '>
					<div className='flex items-center gap-7'>
						<img
							src='/img/logo.png'
							alt='logo'
							className='w-12 '
						/>
						<Button
							id='product-button'
							title='products'
							rightIcon={<TiLocationArrow />}
							containerClass='hidden bg-blue-50 md:flex item-center justify-center gap-1 '
						/>
					</div>
					<div className='flex h-full items-center '>
						<div className='hidden md:block'>
							{navItems.map((items) => (
								<a
									href={`#${items.toLowerCase()}`}
									key={items}
									className='nav-hover-btn '
								>
									{items}
								</a>
							))}
						</div>
						<button
							className='flex items-center ml-10 space-x-0.5 '
							onClick={toggleAudioIndicator}
						>
							<audio
								autoPlay
								ref={audioElementRef}
								src='/audio/loop.mp3'
								className='hidden'
								loop
							/>
							{[1, 2, 3, 4].map((bar) => (
								<div
									key={bar}
									className={`indicator-line  ${
										isIndicatorActive ? 'active' : ''
									}`}
									style={{ animationDelay: `${bar * 0.1}s` }}
								/>
							))}
						</button>
					</div>
				</nav>
			</header>
		</div>
	)
}

export default Navbar
