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
  Flame,
  Garage,
  GridFour,
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
  TreeEvergreen,
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

  // Technical details
  gate: Garage,
  boiler: Flame,
  paving: GridFour,
  woodwool: TreeEvergreen,
}

/** Investment cards are ordered, so they take icons by position. */
export const investmentIcons = [Buildings, Scales, ChartLineUp, Coins, Handshake]
