import React from "react";
import EventCardDisplayList from "./display-components/event-cards/event-card-list";
import PoiCardDisplayList from "./display-components/poi-cards/poi-list-display";

import MuiStyledPagination from '../../../mui-wrappers/mui-pagination-wrapper'
import { useEventSearch } from '../hooks/event-search-hook';
import { usePointOfInterestSearch } from "../hooks/poi-search-hook";
import { Typography } from "@mui/material";
import SourceLogoDisplay, {SourceAttribution} from "./source-logos";

import MaterialUITheme1Profile from "../../../styling/mui_theme_1/theme-profile"

type ContentType = 'events' | 'pointsOfInterest';

interface ContentConfig {
    title: string;
    hook: () => ReturnType<typeof useEventSearch> | ReturnType<typeof usePointOfInterestSearch>;
    sources: string[];
    gridCols: string;
    paginationSize?: 'small' | 'medium' | 'large';
    showPaginationInfo?: boolean;  
    renderCard: (item: any, index: number) => React.ReactNode;
}

const contentConfigs: Record<ContentType, ContentConfig> = {
    events: {
        title: "Events",
        hook: useEventSearch,
        sources: ["Ticketmaster", "PredictHq"],
        paginationSize: 'small',
        gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        renderCard: (event, index) => (
            <EventCardDisplayList
                key={index}
                source={event.Source}
                category={event.ContentInfo.Category}
                genre={event.ContentInfo.Genre}
                imageUrl={event.ContentInfo.ContentMedia[0]?.Url}
                label={event.Label}
                date={event.StartDate}
                country={event.Country}
                city={event.City}
                address={event.SpatialInfo.Address}
                venueName={event.SpatialInfo.VenueName}
                availability={event.CommercialStatusInfo.Availability}
                price={event.CommercialStatusInfo.MinPrice}
                website={event.CommercialStatusInfo.WebsiteUrl}
            />
        )
    },
    pointsOfInterest: {
        title: "Places",
        hook: usePointOfInterestSearch,
        sources: ["FourSquare"],
        paginationSize: 'small', 
        gridCols: "grid-cols-1 md:grid-cols-2",
        renderCard: (poi, index) => {
                    
        return (
            <PoiCardDisplayList
                key={index}
                label={poi.Label}   
                description={poi.Description}
                source={poi.Source}
                categories={poi.PoiInfo?.AllCategories}
                city={poi.PoiInfo?.City}
                address={poi.PoiInfo?.Address}
                postalCode={poi.PoiInfo?.Postalcode}
                rating={poi.PoiInfo?.Rating}
                totalRatings={poi.PoiInfo?.totalRatings}
                verified={poi.PoiInfo?.Verified}
                isOpen={poi.PoiInfo?.Open}
                website={poi.PoiInfo?.WebsiteUrl}
            />
        );
        }
    }
};

interface ContentRendererProps {
    type: ContentType;
    className?: string;    
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ type, className = ""}) => {
    const config = contentConfigs[type];
    const [{ data, loading, error, pagination }, { goToPage }] = config.hook(); 



    return (
        <div className={`flex flex-col ${className}`}>
            {/* Sticky Header Row */}
   
        <div className="flex items-center sticky top-0 z-10 justify-between px-4  bg-white/95 backdrop-blur-sm transition-all duration-300 border border-gray-100">
    {/* Left: Title and Pagination in one row */}
    <div className={`flex items-center gap-4 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex items-center gap-2">
            <Typography variant="h6">
                {config.title}
            </Typography>
            {data && data.length > 0 && (
                <span className="px-2 bg-gray-100/70 rounded-full text-xs text-gray-600 transition-all duration-300">

                <Typography variant="body1" fontSize={12}>
                {pagination.totalItems}
                </Typography>
                  
                </span>
            )}
        </div>
        
        <MuiStyledPagination
            totalPages={pagination.totalPages}
            totalItems={config.showPaginationInfo ? pagination.totalItems : undefined}
            currentPage={pagination.currentPage}
            onChange={goToPage}
            variant="outlined"
            color="secondary"
            customColor={MaterialUITheme1Profile.paletteProfiles["meminiThemeOutline"].light}
            size={config.paginationSize || 'medium'}
        />
    </div>
    
    {/* Right: Powered by logos */}
    <div className="flex items-center gap-2">
        <Typography variant="caption" color="text.secondary" fontSize={10}>
            <i>Powered by</i>
        </Typography>
        <div className="flex items-center gap-1.5">
            {config.sources.map((source, idx) => (
                <div key={idx} className="transition-all duration-300">
                    <SourceLogoDisplay source={source as SourceAttribution["name"]} />
                </div>
            ))}
        </div>
    </div>
    </div>
                            
            {/* Scrollable Content Container */}
            <div className="overflow-y-auto relative max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-webkit">
               
                
                {/* Content Grid with fade transition */}
                <div className={`grid ${config.gridCols} gap-3 p-3 transition-opacity duration-500 ${loading ? 'opacity-30' : 'opacity-100'}`}>
                    {data && data.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="duration-500 transition-shadow"
                        >
                            {config.renderCard(item, index)}
                        </div>
                    ))}
                </div>
                
                {/* Empty State */}
                {!loading && (!data || data.length === 0) && (
                    <div className="flex flex-col items-center justify-center h-64 text-center py-12">
                        <Typography variant="h6" color="text.secondary">
                            No {config.title.toLowerCase()} found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="mt-2">
                            Try adjusting your search filters
                        </Typography>
                    </div>
                )}
                
                {/* Error State */}
                {error && (
                    <div className="flex flex-col items-center justify-center h-64 text-center py-12">
                        <Typography variant="h6" color="error">
                            Error loading {config.title.toLowerCase()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="mt-2">
                            {error}
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentRenderer;