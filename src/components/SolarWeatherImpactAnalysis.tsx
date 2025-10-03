import React, { useState, useEffect } from 'react';
import { Sun, Zap, AlertTriangle, TrendingUp, BarChart3, Activity, Shield, Globe, Satellite, Radio, ChevronRight, ChevronLeft } from 'lucide-react';

interface SolarWeatherImpactAnalysisProps {
  onNext?: () => void;
  onBack?: () => void;
}

interface ImpactData {
  category: string;
  icon: React.ReactNode;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  examples: string[];
  color: string;
  percentage: number;
}

interface AnalysisMetric {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
  icon: React.ReactNode;
}

const SolarWeatherImpactAnalysis: React.FC<SolarWeatherImpactAnalysisProps> = ({ onNext, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const impactCategories: ImpactData[] = [
    {
      category: 'Satellite Systems',
      icon: <Satellite className="w-8 h-8" />,
      severity: 'Critical',
      description: 'Solar storms can damage satellite electronics, disrupt communications, and cause orbital decay.',
      examples: [
        'GPS navigation failures',
        'Communication satellite outages',
        'Weather monitoring disruptions',
        'Internet service interruptions'
      ],
      color: 'from-red-500 to-red-700',
      percentage: 85
    },
    {
      category: 'Power Infrastructure',
      icon: <Zap className="w-8 h-8" />,
      severity: 'High',
      description: 'Geomagnetic storms induce currents in power lines, potentially causing blackouts.',
      examples: [
        'Transformer damage',
        'Grid instability',
        'Widespread blackouts',
        'Industrial shutdowns'
      ],
      color: 'from-orange-500 to-red-600',
      percentage: 75
    },
    {
      category: 'Aviation Safety',
      icon: <Activity className="w-8 h-8" />,
      severity: 'High',
      description: 'Solar radiation affects high-altitude flights and polar routes.',
      examples: [
        'Flight route diversions',
        'Communication blackouts',
        'Navigation system errors',
        'Increased radiation exposure'
      ],
      color: 'from-yellow-500 to-orange-600',
      percentage: 70
    },
    {
      category: 'Radio Communications',
      icon: <Radio className="w-8 h-8" />,
      severity: 'Medium',
      description: 'Solar flares can cause radio blackouts affecting emergency services.',
      examples: [
        'Emergency service disruptions',
        'Maritime communication loss',
        'Amateur radio interference',
        'Military communication issues'
      ],
      color: 'from-blue-500 to-purple-600',
      percentage: 60
    },
    {
      category: 'Technology Systems',
      icon: <Globe className="w-8 h-8" />,
      severity: 'Medium',
      description: 'Various technological systems can be affected by space weather events.',
      examples: [
        'Internet infrastructure issues',
        'Banking system disruptions',
        'Transportation delays',
        'Smart grid malfunctions'
      ],
      color: 'from-green-500 to-blue-600',
      percentage: 55
    }
  ];

  const analysisMetrics: AnalysisMetric[] = [
    {
      title: 'Economic Impact',
      value: '$15B+',
      trend: 'up',
      description: 'Annual global economic losses from space weather events',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: 'Affected Systems',
      value: '50M+',
      trend: 'up',
      description: 'Number of systems potentially vulnerable to solar storms',
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      title: 'Recovery Time',
      value: '2-7 days',
      trend: 'stable',
      description: 'Average time to restore critical systems after major events',
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: 'Protection Level',
      value: '65%',
      trend: 'up',
      description: 'Current infrastructure protection against space weather',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-400 bg-red-900/30';
      case 'High': return 'text-orange-400 bg-orange-900/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-900/30';
      case 'Low': return 'text-green-400 bg-green-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-cosmic-purple to-stellar-blue relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-stellar-gold rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cosmic-purple rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'animate-slideInDown opacity-100' : 'opacity-0 -translate-y-8'}`}>
          <div className="flex items-center justify-center mb-6">
            <Sun className="w-16 h-16 text-stellar-gold mr-4 animate-spin-slow" />
            <AlertTriangle className="w-12 h-12 text-red-400 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-6">
             Space Weather Impact Analysis
          </h1>
          <p className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
            Comprehensive analysis of how  Space Weather events affect critical infrastructure and technology systems on Earth
          </p>
        </div>

        {/* Key Metrics */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'animate-slideInUp opacity-100' : 'opacity-0 translate-y-8'}`}>
          {analysisMetrics.map((metric, index) => (
            <div
              key={metric.title}
              className={`bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 hover:border-stellar-gold hover:border-opacity-50 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                currentMetric === index ? 'ring-2 ring-stellar-gold' : ''
              }`}
              onClick={() => setCurrentMetric(index)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-stellar-gold">{metric.icon}</div>
                <div className={`flex items-center text-sm ${
                  metric.trend === 'up' ? 'text-green-400' : 
                  metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  <TrendingUp className={`w-4 h-4 mr-1 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  {metric.trend}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{metric.value}</h3>
              <h4 className="text-stellar-gold font-semibold mb-2">{metric.title}</h4>
              <p className="text-blue-200 text-sm">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Impact Categories */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'animate-slideInLeft opacity-100' : 'opacity-0 -translate-x-8'}`}>
          <h2 className="text-3xl font-bold text-stellar-gold mb-8 text-center">Impact Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactCategories.map((category, index) => (
              <div
                key={category.category}
                className={`bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.category 
                    ? 'ring-2 ring-stellar-gold border-stellar-gold border-opacity-50' 
                    : 'hover:border-stellar-gold hover:border-opacity-30'
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.category ? null : category.category)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${category.color} p-3 rounded-xl text-white`}>
                    {category.icon}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(category.severity)}`}>
                    {category.severity}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{category.category}</h3>
                <p className="text-blue-200 text-sm mb-4">{category.description}</p>
                
                {/* Impact Percentage Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Impact Level</span>
                    <span className="text-stellar-gold font-semibold">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Expandable Examples */}
                {selectedCategory === category.category && (
                  <div className="mt-4 pt-4 border-t border-white border-opacity-10 animate-slideInDown">
                    <h4 className="text-stellar-gold font-semibold mb-3">Specific Examples:</h4>
                    <ul className="space-y-2">
                      {category.examples.map((example, idx) => (
                        <li key={idx} className="flex items-center text-blue-200 text-sm">
                          <div className="w-1.5 h-1.5 bg-stellar-gold rounded-full mr-3"></div>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Summary */}
        <div className={`bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-10 mb-16 transition-all duration-1000 delay-700 ${isLoaded ? 'animate-slideInRight opacity-100' : 'opacity-0 translate-x-8'}`}>
          <h2 className="text-3xl font-bold text-stellar-gold mb-6 text-center">Key Findings</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-400 mr-2" />
                Critical Vulnerabilities
              </h3>
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Satellite systems face the highest risk with potential for complete service disruption</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Power grid infrastructure vulnerable to transformer damage and cascading failures</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Aviation industry faces safety risks from radiation exposure and navigation failures</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-green-400 mr-2" />
                Mitigation Strategies
              </h3>
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Enhanced space weather monitoring and early warning systems</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Hardened infrastructure design and backup system implementation</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>International cooperation for coordinated response protocols</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-cosmic-purple to-stellar-blue rounded-full text-white font-semibold hover:from-stellar-blue hover:to-cosmic-purple transition-all duration-300 transform hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          )}
          
          <div className="flex-1 text-center">
            <p className="text-blue-200 text-sm">
              Understanding  Space Weather impacts helps us prepare for and mitigate potential disruptions
            </p>
          </div>

          {onNext && (
            <button
              onClick={onNext}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-stellar-gold to-orange-500 rounded-full text-white font-semibold hover:from-orange-500 hover:to-stellar-gold transition-all duration-300 transform hover:scale-105"
            >
              Continue to Aurora Painter
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarWeatherImpactAnalysis;