import React from 'react'

const BentoCard = ({ title, src, description }) => {
	return (
		<div className='relative size-full '>
			<video
				loop
				muted
				autoPlay
				className='absolute top-0 left-0 object-cover object-center size-full'
				src={src}
			/>
			<div className='relative z-10 flex flex-col size-full justify-between p-5 text-blue-50 '>
				<div>
					<h1 className='bento-title font-special'>{title}</h1>
					<div>
						{description && (
							<p className='mt-3 text-xs md:text-base max-w-64'>
								{description}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default BentoCard
