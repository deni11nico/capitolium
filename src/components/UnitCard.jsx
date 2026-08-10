import { Link } from 'react-router-dom'
import { ArrowUpRight, Images } from '@phosphor-icons/react'
import Photo from './Photo.jsx'
import Reveal from './Reveal.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function UnitCard({ unit, delay = 0 }) {
  const { lang, t } = useLanguage()
  const isCellar = unit.kind === 'cellar'

  return (
    <Reveal delay={delay}>
      <Link
        to={unit.href}
        className="group block overflow-hidden rounded-3xl bg-stone-warm transition-transform duration-500 ease-out hover:-translate-y-1.5"
      >
        {/* 3:2 matches the imagini sheets exactly, so the tiled shots inside
            them are shown whole rather than cropped. */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <Photo
            photo={unit.cover}
            alt={unit.name[lang]}
            className="h-full w-full"
            imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase text-forest-800 backdrop-blur-sm">
            {isCellar ? t.units.cellarNote : `0${unit.number}`}
          </span>

          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-ink/55 px-3.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
            <Images size={13} weight="light" />
            {unit.photos.length}
          </span>
        </div>

        <div className="flex items-end justify-between gap-4 px-7 py-7">
          <div>
            <h3 className="font-display text-[28px] leading-tight">{unit.name[lang]}</h3>
            <p className="mt-1.5 text-[13px] text-ink/50">
              {unit.photos.length} {t.units.photosLabel}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-white p-3 text-forest-700 transition-all duration-300 group-hover:bg-forest-700 group-hover:text-white">
            <ArrowUpRight size={18} weight="light" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}
