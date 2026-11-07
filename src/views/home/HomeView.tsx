import { AboutSection } from '@/views/home/sections/AboutSection'
import { ExperienceSection } from '@/views/home/sections/ExperienceSection'
import { FollowSection } from '@/views/home/sections/FollowSection'
import { HeroSection } from '@/views/home/sections/HeroSection'
import { SkillsSection } from '@/views/home/sections/SkillsSection'

export const HomeView = () => {
  return (
    <div className="flex w-full flex-col gap-10 px-4 pb-10 sm:px-6">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <FollowSection />
    </div>
  )
}
