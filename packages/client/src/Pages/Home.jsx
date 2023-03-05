export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="FontSemibold home-title mb-2 text-[#F2F2F2] text-5xl text-center   sm:text-7xl   xl:text-9xl">
        Note App
      </h1>
      <h2 className="FontThin home-title text-[#F2F2F2] text-lg text-center   sm:text-2xl   xl:text-4xl">
        Write your life story
      </h2>
      <div className="home-blur w-full h-full absolute"></div>
    </div>
  )
}