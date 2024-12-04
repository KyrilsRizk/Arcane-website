import React, { useRef, useState } from 'react'

const BentoTilt = ({ children, className = '' }) => {
	const [transformStyle, setTransformStyle] = useState('')
	const itemRef = useRef()

	const handleMouseMove = (e) => {
		if (!itemRef.current) return

		const { left, width, top, height } = itemRef.current.getBoundingClientRect()
		const realtiveX = (e.clientX - left) / width
		const realtiveY = (e.clientY - top) / height

		const tiltX = (realtiveX - 0.5) * 20
		const tiltY = (realtiveY - 0.5) * -20
		const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.97,0.97,0.97)`
		setTransformStyle(newTransform)
	}

	const handleMoseLeave = () => {
		setTransformStyle('')
	}

	return (
		<div
			ref={itemRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMoseLeave}
			className={className}
			style={{ transform: transformStyle }}
		>
			{children}
		</div>
	)
}

export default BentoTilt
