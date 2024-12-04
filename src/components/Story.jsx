import React, { useRef } from 'react'
import AnimatedTitle from './ui/AnimatedTitle'
import gsap from 'gsap'
import Button from './ui/Button'
const Story = () => {
	const frameRef = useRef()

	const handleMouseLeave = () => {
		const element = frameRef.current

		gsap.to(element, {
			duration: 0.5,
			rotateX: 0,
			rotateY: 0,
			ease: 'power1.inOut',
		})
	}

	const handleMouseMove = (e) => {
		const { clientX, clientY } = e
		const element = frameRef.current

		if (!element) return
		const rect = element.getBoundingClientRect()
		const x = clientX - rect.left
		const y = clientY - rect.top

		const centerX = rect.width / 2
		const centerY = rect.height / 2

		const rotateX = ((y - centerY) / centerY) * -5
		const rotateY = ((x - centerX) / centerX) * 5

		gsap.to(element, {
			duration: 0.5,
			rotateX,
			rotateY,
			transformPerspective: 500,
			ease: 'power1.inOut',
		})
	}

	return (
		<section
			id='story'
			className='min-h-dvh w-screen bg-black text-blue-50 '
		>
			<div className='flex flex-col size-full py-10 pb-24  items-center'>
				<p className='font-general text-sm md:text-[10px]'>
					the multiversal ip world{' '}
				</p>
				<div className='realrive size-full'>
					<AnimatedTitle
						title='the st<b>ob</b>ry <b>o</b>f <br /> a hidden realm'
						containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10 '
					/>
					<div className='story-img-container'>
						<div className='story-img-mask'>
							<div className='story-img-content'>
								<img
									onMouseLeave={handleMouseLeave}
									onMouseUp={handleMouseLeave}
									onMouseEnter={handleMouseLeave}
									onMouseMove={handleMouseMove}
									ref={frameRef}
									src='/img/entrance.webp'
									alt='story-image'
									className='object-contain'
								/>
							</div>
						</div>
						<svg
							className='invisible absolute size-0'
							xmlns='http://www.w3.org/2000/svg'
						>
							<defs>
								<filter id='flt_tag'>
									<feGaussianBlur
										in='SourceGraphic'
										stdDeviation='8'
										result='blur'
									/>
									<feColorMatrix
										in='blur'
										mode='matrix'
										values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9'
										result='flt_tag'
									/>
									<feComposite
										in='SourceGraphic'
										in2='flt_tag'
										operator='atop'
									/>
								</filter>
							</defs>
						</svg>
					</div>
				</div>
				<div className='-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end'>
					<div className='flex h-full w-fit flex-col items-center md:items-start'>
						<p className='md:mt-3 mt-24 max-w-sm text-center font-circular-web text-violet-50 md:text-start'>
							Where Arcane forces converge, stands Zentry and the Boundless
							Pillar. Unveil its mystical secrets and shape your fate amidst
							endless possibilities.
						</p>

						<Button
							id='realm-btn'
							title='discover prologue'
							containerClass='mt-5'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Story
