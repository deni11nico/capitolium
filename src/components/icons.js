import {
  ArrowsOut,
  Bed,
  Briefcase,
  Buildings,
  Car,
  ChartLineUp,
  Coins,
  Door,
  Fan,
  Fingerprint,
  Handshake,
  HouseLine,
  Leaf,
  PaintRoller,
  Scales,
  ShieldCheck,
  Snowflake,
  SunHorizon,
  Thermometer,
  Tree,
  Wall,
  WifiHigh,
} from '@phosphor-icons/react'

/** Maps the icon keys used in content.js to Phosphor components. */
export const icons = {
  hotel: Bed,
  apartment: Buildings,
  office: Briefcase,

  window: Door,
  insulation: Wall,
  finishes: PaintRoller,

  smart: HouseLine,
  network: WifiHigh,
  access: Fingerprint,
  security: ShieldCheck,

  heating: Thermometer,
  ac: Snowflake,
  ventilation: Fan,
  shutters: SunHorizon,

  parking: Car,
  garden: Tree,
  expand: ArrowsOut,

  energy: Leaf,
}

/** Investment cards are ordered, so they take icons by position. */
export const investmentIcons = [Buildings, Scales, ChartLineUp, Coins, Handshake]
