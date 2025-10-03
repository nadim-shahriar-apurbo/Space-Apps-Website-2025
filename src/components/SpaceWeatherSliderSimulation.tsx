import React, { useState } from 'react';
import { Slider } from './ui/slider';
import ParticlesComponent from './ParticlesComponent';
import aviationImg from '../assets/aviation.png';
import satelliteImg from '../assets/satellite.png';
import gpsImg from '../assets/gps.png';
import powergridImg from '../assets/powergrid.png';
import radioImg from '../assets/radio.png';
import earthImg from '../assets/earth.png';
import earthFieldsImg from '../assets/earth-with-magnetic-fields.png';

interface SliderGroupProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  description?: string;
}

interface SliderCardProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  description?: string;
}

interface AffectedFieldProps {
  imgPath: string;
  caption: string;
  affected: boolean;
  angle: number;
}

interface AffectedFieldData {
  imgPath: string;
  caption: string;
  affected: boolean;
  angle: number;
}

const SliderGroup: React.FC<SliderGroupProps> = ({
  title,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  description
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-orange-400 font-bold">{value}{unit}</span>
      </div>
      {description && (
        <p className="text-gray-300 text-sm mb-3">{description}</p>
      )}
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
};

const AffectedField: React.FC<AffectedFieldProps> = ({ imgPath, caption, affected, angle }) => {
  const radius = 320; // Further increase distance from Earth center to fill space
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <div
      className={`absolute flex flex-col items-center transition-all duration-500 ${
        affected ? 'opacity-100 scale-110' : 'opacity-60 scale-100'
      }`}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        left: '50%',
        top: '50%',
        marginLeft: '-40px',
        marginTop: '-40px',
      }}
    >
      <img
        src={imgPath}
        alt={caption}
        className={`w-20 h-20 mb-2 transition-all duration-300 ${
          affected ? 'filter-none' : 'grayscale'
        }`}
      />
      <span
        className={`text-base text-center font-medium transition-colors duration-300 ${
          affected ? 'text-red-400' : 'text-gray-400'
        }`}
      >
        {caption}
      </span>
    </div>
  );
};

const SliderCard: React.FC<SliderCardProps> = ({
  title,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  description
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <SliderGroup
        title={title}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        unit={unit}
        description={description}
      />
    </div>
  );
};

interface SpaceWeatherSliderSimulationProps {
  onNext?: () => void;
  onBack?: () => void;
}

const SpaceWeatherSliderSimulation: React.FC<SpaceWeatherSliderSimulationProps> = () => {
  const [solarFlareIntensity, setSolarFlareIntensity] = useState<number>(0);
  const [cmeIntensity, setCmeIntensity] = useState<number>(0);
  const [solarWindIntensity, setSolarWindIntensity] = useState<number>(0);

  // Determine affected fields based on intensities
  const getAffectedFields = (): AffectedFieldData[] => {
    let aviationAffected = false;
    let satelliteAffected = false;
    let gpsAffected = false;
    let powerGridAffected = false;
    let radioAffected = false;

    if (solarFlareIntensity > 40) {
      radioAffected = true;
      aviationAffected = true;
    }

    if (solarFlareIntensity > 80) {
      gpsAffected = true;
    }

    if (cmeIntensity > 40) {
      satelliteAffected = true;
      gpsAffected = true;
    }

    if (cmeIntensity > 80) {
      powerGridAffected = true;
    }

    return [
      {
        imgPath: aviationImg,
        caption: "Aviation",
        affected: aviationAffected,
        angle: -90,
      },
      {
        imgPath: satelliteImg,
        caption: "Satellite",
        affected: satelliteAffected,
        angle: -45,
      },
      {
        imgPath: gpsImg,
        caption: "GPS Tracker",
        affected: gpsAffected,
        angle: 0,
      },
      {
        imgPath: powergridImg,
        caption: "Power Grid",
        affected: powerGridAffected,
        angle: 45,
      },
      {
        imgPath: radioImg,
        caption: "Radio Communications",
        affected: radioAffected,
        angle: 90,
      },
    ];
  };

  const affectedFields = getAffectedFields();

  const getSeverityLevel = () => {
    const maxIntensity = Math.max(solarFlareIntensity, cmeIntensity, solarWindIntensity);
    if (maxIntensity < 25) return { level: 'Low', color: 'text-green-400', bg: 'bg-green-900/20' };
    if (maxIntensity < 50) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-900/20' };
    if (maxIntensity < 75) return { level: 'High', color: 'text-orange-400', bg: 'bg-orange-900/20' };
    return { level: 'Extreme', color: 'text-red-400', bg: 'bg-red-900/20' };
  };

  const severity = getSeverityLevel();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white relative overflow-hidden">
      <ParticlesComponent />
      
      <div className="relative z-10 px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Panel - Controls */}
          <div className="space-y-8">
            <SliderCard
              title="Solar Flare Intensity"
              value={solarFlareIntensity}
              onChange={setSolarFlareIntensity}
              unit="%"
              description="Use this slider to increase or decrease the intensity of solar flare"
            />
            
            <SliderCard
              title="CME Intensity"
              value={cmeIntensity}
              onChange={setCmeIntensity}
              unit="%"
              description="Use this slider to increase or decrease the intensity of CME"
            />
            
            <SliderCard
              title="Solar Wind Intensity"
              value={solarWindIntensity}
              onChange={setSolarWindIntensity}
              unit="%"
              description="Use this slider to increase or decrease the intensity of solar wind"
            />
          </div>

          {/* Center Panel - Earth and Systems */}
          <div className="relative flex justify-center items-center min-h-[900px] lg:min-h-[950px]">
            {/* Earth with magnetic field overlay */}
            <div className="relative">
              <img 
                src={earthImg} 
                alt="Earth" 
                className="w-[28rem] h-[28rem] rounded-full shadow-2xl"
              />
              {(solarFlareIntensity > 20 || cmeIntensity > 20) && (
                <img 
                  src={earthFieldsImg} 
                  alt="Magnetic Field" 
                  className="absolute inset-0 w-[28rem] h-[28rem] rounded-full opacity-70 animate-pulse"
                />
              )}
            </div>

            {/* Affected Systems positioned around Earth */}
            {affectedFields.map((field, index) => (
              <AffectedField
                key={index}
                imgPath={field.imgPath}
                caption={field.caption}
                affected={field.affected}
                angle={field.angle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceWeatherSliderSimulation;