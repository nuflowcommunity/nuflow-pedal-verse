
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import useAdvancedSearch from '@/hooks/useAdvancedSearch';

interface GlobalSearchProps {
  placeholder?: string;
  className?: string;
  onResultClick?: (result: any) => void;
}

const GlobalSearch = ({ 
  placeholder = "Buscar rolês, bikes e produtos...", 
  className,
  onResultClick 
}: GlobalSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    query,
    setQuery,
    results,
    isLoading,
    suggestions,
    searchHistory,
    clearHistory,
    executeSearch
  } = useAdvancedSearch();

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    executeSearch();
    setIsOpen(false);
  };

  const handleResultClick = (result: any) => {
    onResultClick?.(result);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-2xl", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nuflow-sage h-5 w-5" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="pl-10 pr-20 py-3 w-full border-nuflow-sage/30 focus:border-nuflow-emerald focus:ring-nuflow-emerald/20"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-nuflow-sage/10"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-nuflow-emerald hover:bg-nuflow-emerald/90 text-nuflow-darkForest"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {/* Dropdown com resultados */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-nuflow-sage/20 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Histórico e sugestões */}
          {!query && searchHistory.length > 0 && (
            <div className="p-3 border-b border-nuflow-sage/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-nuflow-sage">Buscas recentes</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="text-xs text-nuflow-sage hover:text-nuflow-emerald"
                >
                  Limpar
                </Button>
              </div>
              <div className="space-y-1">
                {searchHistory.slice(0, 5).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(item)}
                    className="flex items-center w-full p-2 text-left hover:bg-nuflow-cream rounded text-sm"
                  >
                    <Clock className="h-4 w-4 mr-2 text-nuflow-sage" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sugestões baseadas na query */}
          {query && suggestions.length > 0 && (
            <div className="p-3 border-b border-nuflow-sage/10">
              <span className="text-sm font-medium text-nuflow-sage mb-2 block">Sugestões</span>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center w-full p-2 text-left hover:bg-nuflow-cream rounded text-sm"
                  >
                    <TrendingUp className="h-4 w-4 mr-2 text-nuflow-emerald" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resultados da busca */}
          {query && (
            <div className="p-3">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-nuflow-emerald"></div>
                  <span className="ml-2 text-sm text-nuflow-sage">Buscando...</span>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  <span className="text-sm font-medium text-nuflow-sage">Resultados ({results.length})</span>
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="flex items-start w-full p-3 text-left hover:bg-nuflow-cream rounded-lg transition-colors"
                    >
                      {result.image && (
                        <img 
                          src={result.image} 
                          alt={result.title}
                          className="w-12 h-12 rounded object-cover mr-3 flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-nuflow-darkForest truncate">
                            {result.title}
                          </h4>
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            result.type === 'event' 
                              ? "bg-nuflow-emerald/10 text-nuflow-emerald" 
                              : "bg-nuflow-mint/20 text-nuflow-forest"
                          )}>
                            {result.type === 'event' ? 'Evento' : 'Produto'}
                          </span>
                        </div>
                        <p className="text-sm text-nuflow-sage truncate mb-1">
                          {result.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-nuflow-sage">
                          {result.price && <span className="font-medium">{result.price}</span>}
                          {result.location && <span>{result.location}</span>}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-nuflow-sage">Nenhum resultado encontrado</p>
                  <p className="text-sm text-nuflow-sage/70 mt-1">
                    Tente termos diferentes ou verifique a ortografia
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
