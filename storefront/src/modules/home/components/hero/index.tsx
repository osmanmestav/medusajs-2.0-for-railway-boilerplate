import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="h-[90vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div
        className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6"
        style={{
          background: "url('banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span></span>
      </div>
    </div>
  )
}

export default Hero
