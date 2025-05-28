
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EventCustomQuestion } from '@/types/eventApproval';

interface DragDropQuestionProps {
  question: EventCustomQuestion;
  onEdit: (question: EventCustomQuestion) => void;
  onDelete: (questionId: string) => void;
}

export const DragDropQuestion: React.FC<DragDropQuestionProps> = ({
  question,
  onEdit,
  onDelete
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getQuestionTypeLabel = (type: string) => {
    const types = {
      text: 'Texto Curto',
      textarea: 'Texto Longo',
      select: 'Seleção Única',
      radio: 'Radio Button',
      checkbox: 'Múltipla Escolha',
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`mb-3 transition-all duration-200 hover:shadow-md ${
        isDragging ? 'shadow-lg ring-2 ring-blue-200' : ''
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Reordenar pergunta"
          >
            <GripVertical className="h-5 w-5 text-gray-400" />
          </div>

          {/* Question Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-medium text-gray-900 text-sm">
                  {question.question_text}
                  {question.is_required && (
                    <span className="text-red-500 ml-1" aria-label="Campo obrigatório">
                      *
                    </span>
                  )}
                </h4>
                {question.is_required && (
                  <AlertCircle 
                    className="h-4 w-4 text-red-500" 
                    aria-label="Campo obrigatório"
                  />
                )}
              </div>
              
              <div className="flex items-center gap-1 flex-shrink-0">
                <Badge variant="outline" className="text-xs">
                  {getQuestionTypeLabel(question.question_type)}
                </Badge>
                {question.is_required && (
                  <Badge variant="destructive" className="text-xs">
                    Obrigatório
                  </Badge>
                )}
              </div>
            </div>

            {question.placeholder_text && (
              <p className="text-sm text-gray-600 mb-2">
                Ajuda: {question.placeholder_text}
              </p>
            )}

            {question.options && question.options.length > 0 && (
              <div className="mb-2">
                <p className="text-xs text-gray-500 mb-1">Opções:</p>
                <div className="flex flex-wrap gap-1">
                  {question.options.slice(0, 3).map((option, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {option.option_text}
                    </Badge>
                  ))}
                  {question.options.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{question.options.length - 3} mais
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(question)}
              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Editar pergunta"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(question.id)}
              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
              aria-label="Excluir pergunta"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
