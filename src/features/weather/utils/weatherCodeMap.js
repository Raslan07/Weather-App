import sunnyIcon from '../../../../assets/images/icon-sunny.webp'
import partlyCloudyIcon from '../../../../assets/images/icon-partly-cloudy.webp'
import overcastIcon from '../../../../assets/images/icon-overcast.webp'
import rainIcon from '../../../../assets/images/icon-rain.webp'
import drizzleIcon from '../../../../assets/images/icon-drizzle.webp'
import snowIcon from '../../../../assets/images/icon-snow.webp'
import fogIcon from '../../../../assets/images/icon-fog.webp'
import stormIcon from '../../../../assets/images/icon-storm.webp'

const codeGroups = {
  sunny: [0, 1],
  partlyCloudy: [2],
  overcast: [3],
  fog: [45, 48],
  drizzle: [51, 53, 55, 56, 57],
  rain: [61, 63, 65, 66, 67, 80, 81, 82],
  snow: [71, 73, 75, 77, 85, 86],
  storm: [95, 96, 99],
}

const iconMap = {
  sunny: sunnyIcon,
  partlyCloudy: partlyCloudyIcon,
  overcast: overcastIcon,
  fog: fogIcon,
  drizzle: drizzleIcon,
  rain: rainIcon,
  snow: snowIcon,
  storm: stormIcon,
}

const labelMap = {
  sunny: 'Clear sky',
  partlyCloudy: 'Partly cloudy',
  overcast: 'Overcast',
  fog: 'Foggy',
  drizzle: 'Drizzle',
  rain: 'Rainy',
  snow: 'Snowy',
  storm: 'Stormy',
}

export function getWeatherVisuals(code) {
  const entry = Object.entries(codeGroups).find(([, values]) => values.includes(code))

  if (!entry) {
    return { icon: partlyCloudyIcon, label: 'Cloudy' }
  }

  const [key] = entry
  return { icon: iconMap[key], label: labelMap[key] }
}
