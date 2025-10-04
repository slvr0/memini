import React from 'react';
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { styled, keyframes } from '@mui/material/styles';

type Direction = 'right' | 'left' | 'up' | 'down';
type AnimationStyle = 'slide' | 'fade' | 'chevrons' | 'pulse';

// Sliding animation - moves the arrow
const slideRight = keyframes`
  0% { transform: translateX(-8px); opacity: 0.3; }
  50% { transform: translateX(0px); opacity: 1; }
  100% { transform: translateX(8px); opacity: 0.3; }
`;

const slideLeft = keyframes`
  0% { transform: translateX(8px); opacity: 0.3; }
  50% { transform: translateX(0px); opacity: 1; }
  100% { transform: translateX(-8px); opacity: 0.3; }
`;

const slideUp = keyframes`
  0% { transform: translateY(8px); opacity: 0.3; }
  50% { transform: translateY(0px); opacity: 1; }
  100% { transform: translateY(-8px); opacity: 0.3; }
`;

const slideDown = keyframes`
  0% { transform: translateY(-8px); opacity: 0.3; }
  50% { transform: translateY(0px); opacity: 1; }
  100% { transform: translateY(8px); opacity: 0.3; }
`;

// Fading animation - creates a trail effect
const fadeRight = keyframes`
  0% { 
    opacity: 0;
    transform: translateX(-10px);
  }
  50% { 
    opacity: 1;
    transform: translateX(0px);
  }
  100% { 
    opacity: 0;
    transform: translateX(10px);
  }
`;

const fadeLeft = keyframes`
  0% { 
    opacity: 0;
    transform: translateX(10px);
  }
  50% { 
    opacity: 1;
    transform: translateX(0px);
  }
  100% { 
    opacity: 0;
    transform: translateX(-10px);
  }
`;

// Pulsing animation
const pulseGrow = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 1; }
`;

interface AnimatedWrapperProps {
  direction: Direction;
  animationStyle: AnimationStyle;
  duration: number;
}

const AnimatedWrapper = styled('div')<AnimatedWrapperProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${props => {
    if (props.animationStyle === 'pulse') return pulseGrow;
    if (props.animationStyle === 'fade') {
      if (props.direction === 'right') return fadeRight;
      if (props.direction === 'left') return fadeLeft;
    }
    if (props.animationStyle === 'slide') {
      if (props.direction === 'right') return slideRight;
      if (props.direction === 'left') return slideLeft;
      if (props.direction === 'up') return slideUp;
      if (props.direction === 'down') return slideDown;
    }
    return 'none';
  }} ${props => props.duration}s ease-in-out infinite;
`;

const ChevronContainer = styled('div')`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const ChevronLayer = styled('div')<{ delay: number }>`
  position: absolute;
  animation: ${fadeRight} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

interface DragIndicatorProps {
  direction?: Direction;
  animationStyle?: AnimationStyle;
  size?: number;
  color?: string;
  duration?: number;
  opacity?: number;
  className?: string;
}

export function DragIndicator({
  direction = 'right',
  animationStyle = 'slide',
  size = 20,
  color = 'currentColor',
  duration = 1.5,
  opacity = 0.7,
  className = '',
}: DragIndicatorProps) {
  const getIcon = () => {
    if (animationStyle === 'chevrons') {
      return direction === 'right' ? ChevronsRight : ChevronsLeft;
    }
    switch (direction) {
      case 'right': return ArrowRight;
      case 'left': return ArrowLeft;
      case 'up': return ArrowUp;
      case 'down': return ArrowDown;
      default: return ArrowRight;
    }
  };

  const Icon = getIcon();

  // Special rendering for chevrons style with multiple layers
  if (animationStyle === 'chevrons') {
    return (
      <ChevronContainer className={className} style={{ opacity }}>
        <ChevronLayer delay={0}>
          <Icon size={size} color={color} style={{ opacity: 0.3 }} />
        </ChevronLayer>
        <ChevronLayer delay={0.3}>
          <Icon size={size} color={color} style={{ opacity: 0.6 }} />
        </ChevronLayer>
        <ChevronLayer delay={0.6}>
          <Icon size={size} color={color} style={{ opacity: 1 }} />
        </ChevronLayer>
      </ChevronContainer>
    );
  }

  return (
    <AnimatedWrapper
      direction={direction}
      animationStyle={animationStyle}
      duration={duration}
      className={className}
      style={{ opacity }}
    >
      <Icon size={size} color={color} />
    </AnimatedWrapper>
  );
}

// Demo component
export default function DragIndicatorDemo() {
  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <h2>Drag Direction Indicators</h2>
      
      <div>
        <h3>Slide Animation (recommended for drag hints)</h3>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <DragIndicator direction="right" animationStyle="slide" size={24} />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Drag Right</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <DragIndicator direction="left" animationStyle="slide" size={24} />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Drag Left</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <DragIndicator direction="up" animationStyle="slide" size={24} />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Drag Up</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <DragIndicator direction="down" animationStyle="slide" size={24} />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Drag Down</p>
          </div>
        </div>
      </div>

      <div>
        <h3>Fade Animation (trail effect)</h3>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <DragIndicator direction="right" animationStyle="fade" size={24} color="#4CAF50" />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Fade Right</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <DragIndicator direction="left" animationStyle="fade" size={24} color="#4CAF50" />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Fade Left</p>
          </div>
        </div>
      </div>

      <div>
        <h3>Chevrons Animation (layered effect)</h3>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <DragIndicator direction="right" animationStyle="chevrons" size={24} color="#2196F3" />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Swipe Right</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <DragIndicator direction="left" animationStyle="chevrons" size={24} color="#2196F3" />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Swipe Left</p>
          </div>
        </div>
      </div>

      <div>
        <h3>Pulse Animation (attention grabber)</h3>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <DragIndicator direction="right" animationStyle="pulse" size={24} color="#FF9800" />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Pulsing</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Usage Example:</h3>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`import { DragIndicator } from './lucid-animated-button-icon';

// Basic usage
<DragIndicator direction="right" animationStyle="slide" />

// Custom styling
<DragIndicator 
  direction="right" 
  animationStyle="fade"
  size={20}
  color="#1976d2"
  duration={1.5}
  opacity={0.7}
/>

// In your time interval display
<div className="flex items-center gap-2">
  <Typography>{minutesToHHMM(taskTimeInterval[0])}</Typography>
  <DragIndicator direction="right" size={16} />
  <Typography>{minutesToHHMM(taskTimeInterval[1])}</Typography>
</div>`}
        </pre>
      </div>
    </div>
  );
}