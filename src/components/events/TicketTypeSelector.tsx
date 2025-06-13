
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { TicketType } from '@/types/tickets';

interface TicketTypeSelectorProps {
  ticketTypes: TicketType[];
  selectedTicketType: string;
  onTicketTypeChange: (ticketTypeId: string) => void;
}

const TicketTypeSelector = ({ 
  ticketTypes, 
  selectedTicketType, 
  onTicketTypeChange 
}: TicketTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Tipos de Ingresso</h3>
      
      <RadioGroup 
        value={selectedTicketType} 
        onValueChange={onTicketTypeChange}
        className="space-y-3"
      >
        {ticketTypes.map((ticket) => (
          <Card key={ticket.id} className={`cursor-pointer transition-colors ${
            selectedTicketType === ticket.id 
              ? 'border-trailflow-green bg-trailflow-green/5' 
              : 'hover:border-gray-300'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem 
                  value={ticket.id} 
                  id={ticket.id}
                  disabled={!ticket.available}
                />
                <Label 
                  htmlFor={ticket.id} 
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{ticket.name}</p>
                      {ticket.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {ticket.description}
                        </p>
                      )}
                      {!ticket.available && (
                        <p className="text-sm text-red-500 mt-1">
                          Esgotado
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-trailflow-green">
                        R$ {ticket.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TicketTypeSelector;
