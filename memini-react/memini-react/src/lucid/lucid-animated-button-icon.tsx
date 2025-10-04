import React from 'react';
import { 
  Loader2, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Activity,
  RefreshCw,
  ArrowRight,
  Heart,
  Star,
  Sun,
  Moon,
  LucideIcon 
} from 'lucide-react';
import { styled, keyframes } from '@mui/material/styles';

// Animation keyframes
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.95); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const slideRight = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const wave = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
`;

const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 2px currentColor); }
  50% { filter: drop-shadow(0 0 8px currentColor); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
`;

// Styled wrapper for animated icons
const AnimatedIconWrapper = styled('span')<{ animation: string; duration: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${props => {
    switch(props.animation) {
      case 'spin': return spin;
      case 'pulse': return pulse;
      case 'bounce': return bounce;
      case 'slideRight': return slideRight;
      case 'shake': return shake;
      case 'wave': return wave;
      case 'glow': return glow;
      case 'float': return float;
      case 'wiggle': return wiggle;
      default: return 'none';
    }
  }} ${props => props.duration}s ease-in-out infinite;
`;

type AnimationType = 
  | 'spin' 
  | 'pulse' 
  | 'bounce' 
  | 'slideRight' 
  | 'shake' 
  | 'wave' 
  | 'glow'
  | 'float'
  | 'wiggle'
  | 'none';

interface AnimatedIconProps {
  icon: LucideIcon;
  animation?: AnimationType;
  size?: number;
  color?: string;
  duration?: number;
  className?: string;
}

export function AnimatedIcon({
  icon: Icon,
  animation = 'spin',
  size = 24,
  color = 'currentColor',
  duration = 2,
  className = '',
}: AnimatedIconProps) {
  return (
    <AnimatedIconWrapper animation={animation} duration={duration} className={className}>
      <Icon size={size} color={color} />
    </AnimatedIconWrapper>
  );
}

// Pre-configured animated icon components
export const LoadingSpinner = (props: Omit<AnimatedIconProps, 'icon' | 'animation'>) => (
  <AnimatedIcon icon={Loader2} animation="spin" duration={1} {...props} />
);

export const SparklingIcon = (props: Omit<AnimatedIconProps, 'icon' | 'animation'>) => (
  <AnimatedIcon icon={Sparkles} animation="pulse" duration={1.5} {...props} />
);

export const BouncingArrow = (props: Omit<AnimatedIconProps, 'icon' | 'animation'>) => (
  <AnimatedIcon icon={ArrowRight} animation="bounce" duration={1.5} {...props} />
);

export const BeatingHeart = (props: Omit<AnimatedIconProps, 'icon' | 'animation'>) => (
  <AnimatedIcon icon={Heart} animation="pulse" duration={1} {...props} />
);

export const GlowingStar = (props: Omit<AnimatedIconProps, 'icon' | 'animation'>) => (
  <AnimatedIcon icon={Star} animation="glow" duration={2} {...props} />
);

export const FloatingSun = (props: Omit<AnimatedIconProps, 'icon' | 'animation'>) => (
  <AnimatedIcon icon={Sun} animation="float" duration={3} {...props} />
);

export const WavingHand = (props: Omit<AnimatedIconProps, 'icon' | 'animation'>) => (
  <AnimatedIcon icon={Activity} animation="wave" duration={2} {...props} />
);

// Demo component showing all animations
export default function AnimatedIconDemo() {
  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <h2>Animated Icons Demo</h2>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <LoadingSpinner size={32} />
          <p style={{ marginTop: '8px', fontSize: '12px' }}>Spinning</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <SparklingIcon size={32} color="#FFD700" />
          <p style={{ marginTop: '8px', fontSize: '12px' }}>Pulsing</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <BouncingArrow size={32} color="#4CAF50" />
          <p style={{ marginTop: '8px', fontSize: '12px' }}>Bouncing</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <BeatingHeart size={32} color="#E91E63" />
          <p style={{ marginTop: '8px', fontSize: '12px' }}>Beating</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <GlowingStar size={32} color="#FFC107" />
          <p style={{ marginTop: '8px', fontSize: '12px' }}>Glowing</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <FloatingSun size={32} color="#FF9800" />
          <p style={{ marginTop: '8px', fontSize: '12px' }}>Floating</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <AnimatedIcon icon={Zap} animation="shake" size={32} color="#9C27B0" />
          <p style={{ marginTop: '8px', fontSize: '12px' }}>Shaking</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <AnimatedIcon icon={TrendingUp} animation="slideRight" size={32} color="#2196F3" />
          <p style={{ marginTop: '8px', fontSize: '12px' }}>Sliding</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <WavingHand size={32} color="#00BCD4" />
          <p style={{ marginTop: '8px', fontSize: '12px' }}>Waving</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <AnimatedIcon icon={RefreshCw} animation="wiggle" size={32} color="#607D8B" />
          <p style={{ marginTop: '8px', fontSize: '12px' }}>Wiggling</p>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Custom Usage:</h3>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`import { AnimatedIcon, LoadingSpinner } from './AnimatedIcon';
import { Sparkles } from 'lucide-react';

// Use pre-configured
<LoadingSpinner size={24} color="#1976d2" />

// Or customize
<AnimatedIcon 
  icon={Sparkles} 
  animation="pulse" 
  size={32} 
  color="#FFD700"
  duration={1.5}
/>`}
        </pre>
      </div>
    </div>
  );
}