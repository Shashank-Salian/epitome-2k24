import React from 'react'
import Image from 'next/image'

const TechImage = () => {
    const styles = {
        clipPath: `path("M314 0.5H232.5L216 19H116L100 0.5H18L2 19L1 575L17.5 594H100L116 575H216L232.5 594H315L331.5 575L330.5 19L314 0.5Z")`,

    }

    return (
        <div style={styles} className="bg-blueGradient w-[400px] aspect-[10/16] overflow-hidden"></div>
    )
}

export default TechImage