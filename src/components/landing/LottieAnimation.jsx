import Lottie from 'lottie-react'

export default function LottieAnimation({
  animationData,
  className = '',
  loop = true,
  autoplay = true,
}) {
  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        renderer="svg"
        style={{
          width: '100%',
          height: '100%',
        }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid meet',
        }}
      />
    </div>
  )
}