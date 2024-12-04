import React from 'react'

const Button = ({ title, leftIcon, id, containerClass, rightIcon }) => {
	return (
		<button
			id={id}
			className={`relative group z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 py-3 px-7 text-black ${containerClass} `}
		>
			{leftIcon}
			<span className='relative inline-flex overflow-hidden font-general text-xs font-bold uppercase'>
				{title}
			</span>
			{rightIcon}
		</button>
	)
}

export default Button
