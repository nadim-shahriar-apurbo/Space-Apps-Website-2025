import React, { useState, useEffect } from 'react';
import { Sun, Zap, Radio, Satellite, Globe, AlertTriangle, Activity, Shield, ChevronRight, ChevronLeft, BarChart3, TrendingUp, Wifi, WifiOff } from 'lucide-react';

interface SpaceWeatherImpactSimulationProps {
  onNext?: () => void;
  onBack?: () => void;
}

interface SpaceWeatherEvent {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  intensity: number;
  duration: number;
  color: string;
  effects: {
    satellites: number;
    powerGrid: number;
    communications: number;
    aviation: number;
    gps: number;
  };
  realWorldExample: string;
  timeline: string[];
}

interface EarthSystem {
  id: string;
  name: string;
  icon: React.ReactNode;
  baseHealth: number;
  currentHealth: number;
  color: string;
  description: string;
  criticalThreshold: number;
}

const SpaceWeatherImpactSimulation: React.FC<SpaceWeatherImpactSimulationProps> = ({ onNext, onBack }) => {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [earthSystems, setEarthSystems] = useState<EarthSystem[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [alertLevel, setAlertLevel] = useState(0);

  const spaceWeatherEvents: SpaceWeatherEvent[] = [
    {
      id: 'solar-flare',
      name: 'Solar Flare',
      icon: <Sun className="w-8 h-8" />,
      description: 'Intense bursts of radiation from the Sun\'s surface',
      intensity: 75,
      duration: 30,
      color: 'from-yellow-500 to-orange-600',
      effects: {
        satellites: -15,
        powerGrid: -5,
        communications: -25,
        aviation: -10,
        gps: -20
      },
      realWorldExample: 'The 1989 Quebec blackout was caused by a geomagnetic storm triggered by solar flares',
      timeline: [
        'Solar flare erupts from Sun\'s surface',
        'X-rays and UV radiation reach Earth in 8 minutes',
        'Radio blackouts begin immediately',
        'Particle radiation arrives in 30-60 minutes',
        'Geomagnetic storm effects last 1-3 days'
      ]
    },
    {
      id: 'cme',
      name: 'Coronal Mass Ejection',
      icon: <Zap className="w-8 h-8" />,
      description: 'Massive clouds of solar plasma hurled into space',
      intensity: 90,
      duration: 120,
      color: 'from-purple-500 to-pink-600',
      effects: {
        satellites: -30,
        powerGrid: -40,
        communications: -20,
        aviation: -25,
        gps: -35
      },
      realWorldExample: 'The 1859 Carrington Event caused telegraph systems worldwide to fail',
      timeline: [
        'CME erupts from Sun\'s corona',
        'Plasma cloud travels through space (1-3 days)',
        'Shock wave hits Earth\'s magnetosphere',
        'Geomagnetic storm intensifies',
        'Aurora visible at lower latitudes',
        'Recovery takes several days'
      ]
    },
    {
      id: 'geomagnetic-storm',
      name: 'Geomagnetic Storm',
      icon: <Globe className="w-8 h-8" />,
      description: 'Disturbances in Earth\'s magnetic field',
      intensity: 85,
      duration: 180,
      color: 'from-blue-500 to-indigo-600',
      effects: {
        satellites: -25,
        powerGrid: -35,
        communications: -15,
        aviation: -20,
        gps: -30
      },
      realWorldExample: 'The 2003 Halloween storms caused satellite failures and power outages',
      timeline: [
        'Solar wind interacts with magnetosphere',
        'Magnetic field lines reconnect and snap',
        'Charged particles enter atmosphere',
        'Induced currents flow in power lines',
        'Aurora displays intensify',
        'Gradual recovery as solar wind calms'
      ]
    }
  ];

  const initialEarthSystems: EarthSystem[] = [
    {
      id: 'satellites',
      name: 'Satellites',
      icon: <Satellite className="w-6 h-6" />,
      baseHealth: 100,
      currentHealth: 100,
      color: 'from-cyan-500 to-blue-600',
      description: 'Communication, GPS, and weather satellites',
      criticalThreshold: 30
    },
    {
      id: 'power-grid',
      name: 'Power Grid',
      icon: <Zap className="w-6 h-6" />,
      baseHealth: 100,
      currentHealth: 100,
      color: 'from-yellow-500 to-orange-600',
      description: 'Electrical power distribution systems',
      criticalThreshold: 25
    },
    {
      id: 'communications',
      name: 'Communications',
      icon: <Radio className="w-6 h-6" />,
      baseHealth: 100,
      currentHealth: 100,
      color: 'from-green-500 to-emerald-600',
      description: 'Radio, internet, and cellular networks',
      criticalThreshold: 20
    },
    {
      id: 'aviation',
      name: 'Aviation',
      icon: <Activity className="w-6 h-6" />,
      baseHealth: 100,
      currentHealth: 100,
      color: 'from-purple-500 to-violet-600',
      description: 'Air traffic control and navigation',
      criticalThreshold: 35
    },
    {
      id: 'gps',
      name: 'GPS Systems',
      icon: <Shield className="w-6 h-6" />,
      baseHealth: 100,
      currentHealth: 100,
      color: 'from-red-500 to-pink-600',
      description: 'Global positioning and timing systems',
      criticalThreshold: 40
    }
  ];

  useEffect(() => {
    setEarthSystems(initialEarthSystems);
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: number;
    if (simulationRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        updateSystemHealth();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [simulationRunning, currentEvent]);

  const updateSystemHealth = () => {
    const event = spaceWeatherEvents[currentEvent];
    setEarthSystems(prev => prev.map(system => {
      const effectKey = system.id.replace('-', '') as keyof typeof event.effects;
      const effect = event.effects[effectKey] || 0;
      const newHealth = Math.max(0, system.currentHealth + effect * 0.1);
      return { ...system, currentHealth: newHealth };
    }));

    // Update alert level based on system health
    setAlertLevel(prev => {
      const avgHealth = earthSystems.reduce((sum, sys) => sum + sys.currentHealth, 0) / earthSystems.length;
      if (avgHealth < 30) return 3; // Critical
      if (avgHealth < 50) return 2; // High
      if (avgHealth < 70) return 1; // Medium
      return 0; // Normal
    });
  };

  const startSimulation = () => {
    setSimulationRunning(true);
    setTimeElapsed(0);
  };

  const stopSimulation = () => {
    setSimulationRunning(false);
  };

  const resetSimulation = () => {
    setSimulationRunning(false);
    setTimeElapsed(0);
    setEarthSystems(initialEarthSystems);
    setAlertLevel(0);
  };

  const getAlertStatus = () => {
    switch (alertLevel) {
      case 0: return { label: 'NORMAL', color: 'text-green-400', bg: 'bg-green-900' };
      case 1: return { label: 'WATCH', color: 'text-yellow-400', bg: 'bg-yellow-900' };
      case 2: return { label: 'WARNING', color: 'text-orange-400', bg: 'bg-orange-900' };
      case 3: return { label: 'CRITICAL', color: 'text-red-400', bg: 'bg-red-900' };
      default: return { label: 'NORMAL', color: 'text-green-400', bg: 'bg-green-900' };
    }
  };

  const currentEventData = spaceWeatherEvents[currentEvent];
  const alertStatus = getAlertStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isLoaded ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Space Weather Impact Simulation
          </h1>
          <p className="text-xl text-blue-200 max-w-4xl mx-auto mb-8">
            Experience real-time space weather events and their cascading effects on Earth's critical infrastructure
          </p>
        </div>

        {/* Alert Status */}
        <div className={`max-w-md mx-auto mb-8 transition-all duration-500 ${isLoaded ? 'animate-slideInDown opacity-100' : 'opacity-0 -translate-y-4'}`}>
          <div className={`${alertStatus.bg} bg-opacity-30 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20 text-center`}>
            <div className={`${alertStatus.color} font-bold text-lg mb-2 ${alertLevel >= 2 ? 'animate-pulse' : ''}`}>
              🚨 ALERT STATUS: {alertStatus.label}
            </div>
            <div className="text-sm text-gray-300">
              Time Elapsed: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Event Selection */}
        <div className={`max-w-6xl mx-auto mb-8 transition-all duration-700 ${isLoaded ? 'animate-fadeIn opacity-100' : 'opacity-0'}`}>
          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
            <h3 className="text-2xl font-bold text-stellar-gold mb-6 text-center">Select Space Weather Event</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {spaceWeatherEvents.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => setCurrentEvent(index)}
                  className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    currentEvent === index
                      ? `bg-gradient-to-br ${event.color} text-white shadow-lg`
                      : 'bg-gray-800 bg-opacity-50 text-gray-300 hover:bg-opacity-70'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{event.icon}</div>
                    <h4 className="font-bold text-lg mb-2">{event.name}</h4>
                    <p className="text-sm opacity-90">{event.description}</p>
                    <div className="mt-4 flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-xs">Intensity: {event.intensity}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Simulation Controls */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={startSimulation}
                disabled={simulationRunning}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {simulationRunning ? 'Running...' : 'Start Simulation'}
              </button>
              
              <button
                onClick={stopSimulation}
                disabled={!simulationRunning}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                Stop
              </button>
              
              <button
                onClick={resetSimulation}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Earth Systems Status */}
        <div className={`max-w-6xl mx-auto mb-8 transition-all duration-900 ${isLoaded ? 'animate-slideInUp opacity-100' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
            <h3 className="text-2xl font-bold text-stellar-gold mb-6 text-center">Earth Systems Health Monitor</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {earthSystems.map((system, index) => {
                const healthPercent = system.currentHealth;
                const isCritical = healthPercent <= system.criticalThreshold;
                
                return (
                  <div
                    key={system.id}
                    className={`p-6 rounded-xl border transition-all duration-500 ${
                      isCritical 
                        ? 'bg-red-900 bg-opacity-30 border-red-500 border-opacity-50 animate-pulse' 
                        : 'bg-gray-800 bg-opacity-50 border-white border-opacity-20'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${system.color}`}>
                          {system.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{system.name}</h4>
                          <p className="text-xs text-gray-400">{system.description}</p>
                        </div>
                      </div>
                      {isCritical && <AlertTriangle className="w-6 h-6 text-red-400 animate-bounce" />}
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Health</span>
                        <span className={`font-bold ${
                          healthPercent > 70 ? 'text-green-400' :
                          healthPercent > 40 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {Math.round(healthPercent)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            healthPercent > 70 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                            healthPercent > 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                            'bg-gradient-to-r from-red-500 to-pink-500'
                          }`}
                          style={{ width: `${healthPercent}%` }}
                        />
                      </div>
                    </div>
                    
                    {isCritical && (
                      <div className="text-xs text-red-300 mt-2 flex items-center space-x-1">
                        <WifiOff className="w-3 h-3" />
                        <span>SYSTEM CRITICAL</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className={`max-w-6xl mx-auto mb-8 transition-all duration-1100 ${isLoaded ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-stellar-gold">Event Timeline & Impact</h3>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-white mb-4 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>{currentEventData.name} Timeline</span>
                </h4>
                <div className="space-y-3">
                  {currentEventData.timeline.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-500 ${
                        simulationRunning && timeElapsed > index * 30
                          ? 'bg-blue-900 bg-opacity-30 border-l-4 border-blue-400'
                          : 'bg-gray-800 bg-opacity-30'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        simulationRunning && timeElapsed > index * 30
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <p className="text-sm text-gray-300 flex-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4">Real-World Example</h4>
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {currentEventData.realWorldExample}
                  </p>
                </div>
                
                {showDetails && (
                  <div className="mt-6">
                    <h4 className="font-bold text-white mb-4">Impact Breakdown</h4>
                    <div className="space-y-2">
                      {Object.entries(currentEventData.effects).map(([system, impact]) => (
                        <div key={system} className="flex justify-between items-center p-2 bg-gray-800 bg-opacity-30 rounded">
                          <span className="text-sm text-gray-300 capitalize">{system.replace(/([A-Z])/g, ' $1')}</span>
                          <span className={`text-sm font-bold ${impact < 0 ? 'text-red-400' : 'text-green-400'}`}>
                            {impact > 0 ? '+' : ''}{impact}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className={`flex justify-between items-center max-w-6xl mx-auto transition-all duration-1300 ${isLoaded ? 'animate-fadeIn opacity-100' : 'opacity-0'}`}>
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold transition-all duration-300 transform hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          )}
          
          <div className="flex-1"></div>
          
          {onNext && (
            <button
              onClick={onNext}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold transition-all duration-300 transform hover:scale-105"
            >
              <span>Continue</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceWeatherImpactSimulation;