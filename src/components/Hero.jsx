import React, { useEffect, useRef, useState } from 'react'
import Button from './ui/Button'
import { TiLocationArrow } from 'react-icons/ti'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(1)
	const [hasClicked, setHasClicked] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [loadedVideo, setLoadedVideo] = useState(0)

	const nextvideoRef = useRef(null)

	const totalVideo = 4
	const upComingVideo = (currentIndex % totalVideo) + 1
	const getVideoSrc = (index) => `videos/hero-${index}.m4v`

	// GSAP
	useGSAP(
		() => {
			if (hasClicked) {
				gsap.set('#next-video', { visibility: 'visible' })
				gsap.to('#next-video', {
					transformOrigin: 'center center',
					scale: 1,
					width: '100%',
					height: '100%',
					duration: 1,
					ease: 'power1.inOut',
					onStart: () => nextvideoRef.current.play(),
				})
				gsap.from('#current-video', {
					transformOrigin: 'center center',
					ease: 'power1.inOut',
					scale: 0,
					duration: 1.5,
				})
			}
		},
		{ dependencies: [currentIndex], revertOnUpdate: true }
	)

	useGSAP(() => {
		gsap.set('#video-frame', {
			clipPath: 'polygon(14% 0, 72% 0, 91% 90%, 0 100%)',
			borderRadius: '0 20 40% 10%',
		})
		gsap.from('#video-frame', {
			clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0 100%)',
			borderRadius: '0 0 0 0',
			ease: 'power1.inOut',
			scrollTrigger: {
				trigger: '#video-frame',
				start: 'center center',
				end: 'bottom center',
				scrub: true,
			},
		})
	})

	const handleVideoLoaded = () => {
		setLoadedVideo((prev) => prev + 1)
	}
	const handleMinVideoClicked = () => {
		setHasClicked(true)
		setCurrentIndex(upComingVideo)
	}

	//useEffect
	useEffect(() => {
		if (loadedVideo === totalVideo - 1) {
			setIsLoading(false)
		}
	}, [loadedVideo])

	return (
		<div className='relative h-dvh w-screen overflow-x-hidden'>
			{isLoading && (
				<div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
					<div className='three-body'>
						<div className='three-body__dot' />
						<div className='three-body__dot' />
						<div className='three-body__dot' />
					</div>
				</div>
			)}
			<div
				id='video-frame'
				className='relative h-dvh z-10 w-screen overflow-hidden rounded-lg bg-blue-75 '
			>
				<div>
					<div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
						<div
							onClick={handleMinVideoClicked}
							className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
						>
							<video
								id='current-video'
								ref={nextvideoRef}
								src={getVideoSrc(upComingVideo)}
								loop
								muted
								className='size-64  origin-center  scale-150 object-cover object-center'
								onLoadedData={handleVideoLoaded}
							/>
						</div>
					</div>
					<video
						id='next-video'
						ref={nextvideoRef}
						src={getVideoSrc(currentIndex)}
						loop
						muted
						className='absolute absolute-center invisible z-20 object-cover object-center'
						onLoadedData={handleVideoLoaded}
					/>
					<video
						src={getVideoSrc(
							currentIndex === totalVideo - 1 ? 1 : currentIndex
						)}
						autoPlay
						loop
						muted
						className='absolute left-0 top-0 size-full object-cover object-center'
						onLoadedData={handleVideoLoaded}
					/>
				</div>
				<h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 select-none'>
					G<b>a</b>ming
				</h1>
				<div className='absolute left-0 top-0 z-40 size-full '>
					<div className='mt-24 px-5 sm:px-10'>
						<h2 className='special-font hero-heading text-blue-75'>
							<b>A</b>rcane
						</h2>
						<p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
							Enter The MetaLayer <br /> Unleash The play
						</p>
						<Button
							id='watch-trailer'
							title='Watch Trailer'
							leftIcon={<TiLocationArrow />}
							containerClass='flex-center gap-1 !bg-yellow-300'
						/>
					</div>
				</div>
			</div>
			<h1 className='special-font hero-heading absolute bottom-5 right-5 text-black select-none'>
				G<b>a</b>ming
			</h1>
		</div>
	)
}

export default Hero