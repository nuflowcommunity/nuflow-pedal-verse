
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsHero from '@/components/events/EventsHero';
import EventsBreadcrumb from '@/components/events/EventsBreadcrumb';
import EventsSearch from '@/components/events/EventsSearch';
import EventsCategoryFilter from '@/components/events/EventsCategoryFilter';
import EventsGrid from '@/components/events/EventsGrid';
import EventViewModeSelector from '@/components/events/EventViewModeSelector';
import ExportEventsButton from '@/components/events/ExportEventsButton';
import BackToTopButton from '@/components/BackToTopButton';
import { useEventsData } from '@/hooks/useEventsData';
import { ExportFormat } from '@/services/events/types';

const categories = ['Todos', 'MTB', 'Speed', 'Gravel', 'Urbano', 'Outro'];

const EventsCalendar = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    dateRange,
    setDateRange,
    filteredEvents,
    isLoading,
    viewMode,
    handleSortChange,
    handleFilterByDate,
    handleClearDateFilter,
    handleViewModeChange
  } = useEventsData();

  // Function to export events to CSV or XLS
  const handleExport = (format: ExportFormat) => {
    // Handled by the ExportEventsButton component
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <EventsHero />
        <EventsBreadcrumb />
        
        <EventViewModeSelector 
          viewMode={viewMode} 
          onViewModeChange={handleViewModeChange} 
        />
        
        <EventsSearch 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          dateRange={dateRange}
          setDateRange={setDateRange}
          onFilterByDate={handleFilterByDate}
          onClearDateFilter={handleClearDateFilter}
          onSortChange={handleSortChange}
          onExport={handleExport}
          renderExportButtons={() => (
            <>
              <ExportEventsButton events={filteredEvents} format="csv" />
              <ExportEventsButton events={filteredEvents} format="xls" />
            </>
          )}
        />
        
        <EventsCategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        <EventsGrid 
          events={filteredEvents} 
          isLoading={isLoading} 
        />
        
        <BackToTopButton />
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsCalendar;
