import React, { useState, useEffect } from 'react';
import { Box, Typography, Modal, IconButton } from '@mui/material';
import { X } from 'lucide-react';
import MaterialUITheme1Profile from '../../../../../styling/mui_theme_1/theme-profile';
import NewsAPILogo from '../../../../../assets/images/the_news_api.jpeg'; // Update this path to your logo

interface NewsInfo {
  Title: string;
  Description: string;
  Uuid: string;
  Keywords?: string;
  Snippet?: string;
  Url: string;
  ImageUrl: string;
  Language: string;
  PublishedDate: string;
  Categories?: string;
  Relevance?: number;
  Locale: string;
}

interface NewsNode {
  CountryCode: string;
  Source: string;
  NewsInfos: NewsInfo[];
}

interface NewsFaderProps {
  newsNodes: NewsNode[];
  paletteProfile?: keyof typeof MaterialUITheme1Profile.paletteProfiles;
  borderProfile?: keyof typeof MaterialUITheme1Profile.borderProfiles;
  themeMode?: 'light' | 'dark';
  className?: string;
  containerPadding?: { px?: number; py?: number };
  titleFontSize?: number;
  titleFontVariant?: 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'h6';
  descriptionFontSize?: number;
  descriptionFontVariant?: 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption';
  transitionDuration?: number;
  fadeDuration?: number;
  autoPlay?: boolean;
  showImage?: boolean;
  borderOpacity?: number;
}

interface FlattenedNews extends NewsInfo {
  Source: string;
  CountryCode: string;
}

const NewsFader: React.FC<NewsFaderProps> = ({
  newsNodes,
  paletteProfile = 'main',
  borderProfile = 'semiStraight',
  themeMode = 'light',
  className = '',
  containerPadding = { px: 2, py: 2 },
  titleFontSize = 13,
  titleFontVariant = 'subtitle1',
  descriptionFontSize = 11,
  descriptionFontVariant = 'body2',
  transitionDuration = 5000,
  fadeDuration = 500,
  autoPlay = true,
  showImage = true,
  borderOpacity = 1
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get theme values
  const palette = MaterialUITheme1Profile.paletteProfiles[paletteProfile][themeMode];
  const border = MaterialUITheme1Profile.borderProfiles[borderProfile];

  // Flatten all NewsInfos from all NewsNodes
  const flattenedNews: FlattenedNews[] = newsNodes.flatMap(node =>
    node.NewsInfos.map(info => ({
      ...info,
      Source: node.Source,
      CountryCode: node.CountryCode
    }))
  );

  useEffect(() => {
    // Don't auto-rotate if modal is open
    if (!autoPlay || flattenedNews.length <= 1 || openModal) return;

    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // After fade out completes, change content and fade in
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flattenedNews.length);
        setIsVisible(true);
      }, fadeDuration);
    }, transitionDuration);

    return () => clearInterval(interval);
  }, [autoPlay, flattenedNews.length, transitionDuration, fadeDuration, openModal]);

  if (!flattenedNews || flattenedNews.length === 0) {
    return null;
  }

  const currentNews = flattenedNews[currentIndex];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleCardClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Helper function to add opacity to hex color
  const addOpacityToColor = (color: string, opacity: number) => {
    // Convert opacity (0-1) to hex (00-FF)
    const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
    return `${color}${alpha}`;
  };

  // Determine which image to show
  const displayImage = currentNews.ImageUrl || NewsAPILogo;

  return (
    <>
      <Box 
        className={className}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          width: '100%',
          px: containerPadding.px,
          py: containerPadding.py,
          backgroundColor: palette.main,
          border: border.borderWidth + ' solid ' + addOpacityToColor(
            isHovered ? palette.borderHover : palette.border, 
            borderOpacity
          ),
          borderRadius: border.borderRadius,
          boxShadow: border.shadow,
          minHeight: '100px',
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* Image on the left */}
        {showImage && (
          <Box
            component="img"
            src={displayImage}
            alt={currentNews.Title}
            sx={{
              width: '90px',
              height: '90px',
              objectFit: 'cover',
              borderRadius: '6px',
              flexShrink: 0,
              mr: 2,
            }}
          />
        )}

        {/* Content */}
        <Box
          sx={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity ${fadeDuration}ms ease-in-out`,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Header with date/source */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography 
              variant="caption" 
              fontSize={9}
              sx={{ color: palette.text, opacity: 0.7 }}
            >
              {formatDate(currentNews.PublishedDate)}
            </Typography>
            <Typography 
              variant="caption" 
              fontSize={9}
              sx={{ 
                color: palette.text, 
                opacity: 0.7,
                backgroundColor: palette.hover,
                px: 1,
                py: 0.25,
                borderRadius: '4px'
              }}
            >
              {currentNews.Source}
            </Typography>
          </Box>

          {/* Title */}
          <Typography 
            variant={titleFontVariant} 
            fontSize={titleFontSize}
            sx={{ 
              color: palette.text,
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            {currentNews.Title}
          </Typography>

          {/* Description */}
          {currentNews.Description && (
            <Typography 
              variant={descriptionFontVariant} 
              fontSize={descriptionFontSize}
              sx={{ 
                color: palette.text,
                opacity: 0.85,
                lineHeight: 1.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {currentNews.Description}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Modal for full news details */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '90%',
            maxWidth: '700px',
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: palette.main,
            border: border.borderWidth + ' solid ' + addOpacityToColor(palette.border, borderOpacity),
            borderRadius: border.borderRadius,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            p: 3,
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: palette.text,
            }}
          >
            <X size={20} />
          </IconButton>

          {/* Modal content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {/* Image */}
            <Box
              component="img"
              src={displayImage}
              alt={currentNews.Title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />

            {/* Header with date/source */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography 
                variant="caption" 
                fontSize={11}
                sx={{ color: palette.text, opacity: 0.7 }}
              >
                {formatDate(currentNews.PublishedDate)}
              </Typography>
              <Typography 
                variant="caption" 
                fontSize={11}
                sx={{ 
                  color: palette.text, 
                  opacity: 0.7,
                  backgroundColor: palette.hover,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '4px'
                }}
              >
                {currentNews.Source}
              </Typography>
            </Box>

            {/* Title */}
            <Typography 
              variant="h6"
              sx={{ 
                color: palette.text,
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {currentNews.Title}
            </Typography>

            {/* Description */}
            <Typography 
              variant="body1"
              sx={{ 
                color: palette.text,
                opacity: 0.9,
                lineHeight: 1.6,
              }}
            >
              {currentNews.Description}
            </Typography>

            {/* Read more link */}
            <Box sx={{ mt: 2 }}>
              <Typography
                component="a"
                href={currentNews.Url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: palette.hover,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: 14,
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Read full article →
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NewsFader;

// Usage Examples:
/*
const newsData: NewsNode[] = [
  {
    CountryCode: 'US',
    Source: 'TechCrunch',
    NewsInfos: [
      {
        Title: 'Breaking: New AI Model Released',
        Description: 'A groundbreaking AI model has been announced today with unprecedented capabilities.',
        Uuid: 'news-1',
        Url: 'https://example.com/news/1',
        ImageUrl: 'https://example.com/image1.jpg',
        Language: 'en',
        PublishedDate: '2025-10-22T10:00:00Z',
        Locale: 'en-US',
      }
    ]
  }
];

// Default usage
<NewsFader 
  newsNodes={newsData}
/>

// Custom styling
<NewsFader 
  newsNodes={newsData}
  paletteProfile="harmonicBlue"
  borderProfile="rounded"
  containerPadding={{ px: 3, py: 2.5 }}
  titleFontSize={14}
  descriptionFontSize={12}
/>
*/
// Usage Examples:
/*
// Sample news data with correct structure
const newsData: NewsNode[] = [
  {
    CountryCode: 'US',
    Source: 'TechCrunch',
    NewsInfos: [
      {
        Title: 'Breaking: New AI Model Released',
        Description: 'A groundbreaking AI model has been announced today with unprecedented capabilities.',
        Uuid: 'news-1',
        Url: 'https://example.com/news/1',
        ImageUrl: 'https://example.com/image1.jpg',
        Language: 'en',
        PublishedDate: '2025-10-22T10:00:00Z',
        Locale: 'en-US',
      },
      {
        Title: 'Cloud Computing Trends',
        Description: 'Latest trends in cloud computing infrastructure.',
        Uuid: 'news-2',
        Url: 'https://example.com/news/2',
        ImageUrl: 'https://example.com/image2.jpg',
        Language: 'en',
        PublishedDate: '2025-10-22T09:00:00Z',
        Locale: 'en-US',
      }
    ]
  },
  {
    CountryCode: 'US',
    Source: 'Bloomberg',
    NewsInfos: [
      {
        Title: 'Market Update: Stocks Rally',
        Description: 'Global markets see significant gains following positive economic indicators.',
        Uuid: 'news-3',
        Url: 'https://example.com/news/3',
        ImageUrl: 'https://example.com/image3.jpg',
        Language: 'en',
        PublishedDate: '2025-10-22T08:00:00Z',
        Locale: 'en-US',
      }
    ]
  }
];

// Default usage
<NewsFader 
  newsNodes={newsData}
/>

// With images
<NewsFader 
  newsNodes={newsData}
  showImage={true}
/>

// Custom styling
<NewsFader 
  newsNodes={newsData}
  paletteProfile="harmonicBlue"
  borderProfile="rounded"
  containerPadding={{ px: 3, py: 2.5 }}
  titleFontSize={14}
  descriptionFontSize={12}
/>

// Faster transitions
<NewsFader 
  newsNodes={newsData}
  transitionDuration={3000}
  fadeDuration={300}
  paletteProfile="harmonicGreen"
  showImage={true}
/>
*/