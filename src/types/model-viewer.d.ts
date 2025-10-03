declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      'auto-rotate'?: boolean;
      'camera-controls'?: boolean;
      'environment-image'?: string;
      'skybox-image'?: string;
      poster?: string;
      loading?: 'auto' | 'lazy' | 'eager';
      reveal?: 'auto' | 'interaction' | 'manual';
      'ar'?: boolean;
      'ar-modes'?: string;
      'ar-scale'?: string;
      'camera-orbit'?: string;
      'camera-target'?: string;
      'field-of-view'?: string;
      'min-camera-orbit'?: string;
      'max-camera-orbit'?: string;
      'min-field-of-view'?: string;
      'max-field-of-view'?: string;
      'interaction-prompt'?: 'auto' | 'when-focused' | 'none';
      'interaction-prompt-style'?: 'basic' | 'wiggle';
      'interaction-prompt-threshold'?: string;
      'shadow-intensity'?: string;
      'shadow-softness'?: string;
      'exposure'?: string;
      'tone-mapping'?: 'auto' | 'aces' | 'neutral' | 'commerce';
    };
  }
}