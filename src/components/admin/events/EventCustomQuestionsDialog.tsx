
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ExtendedEvent, EventCustomQuestion, QuestionType } from '@/types/eventApproval';
import { Plus, Trash2, GripVertical, Edit } from 'lucide-react';

interface EventCustomQuestionsDialogProps {
  event: ExtendedEvent;
  isOpen: boolean;
  onClose: () => void;
}

export const EventCustomQuestionsDialog: React.FC<EventCustomQuestionsDialogProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  const [questions, setQuestions] = useState<EventCustomQuestion[]>(
    event.custom_questions || []
  );
  const [editingQuestion, setEditingQuestion] = useState<EventCustomQuestion | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    question_text: '',
    question_type: 'text' as QuestionType,
    is_required: false,
    placeholder_text: '',
    options: [] as { text: string; value: string }[],
  });

  const questionTypes = [
    { value: 'text', label: 'Texto Curto' },
    { value: 'textarea', label: 'Texto Longo' },
    { value: 'select', label: 'Seleção Única (Dropdown)' },
    { value: 'radio', label: 'Seleção Única (Radio)' },
    { value: 'checkbox', label: 'Múltipla Escolha' },
  ];

  const addNewQuestion = () => {
    if (!newQuestion.question_text.trim()) return;

    const question: EventCustomQuestion = {
      id: `temp-${Date.now()}`,
      event_id: event.id,
      question_text: newQuestion.question_text,
      question_type: newQuestion.question_type,
      is_required: newQuestion.is_required,
      placeholder_text: newQuestion.placeholder_text || undefined,
      sort_order: questions.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      options: newQuestion.question_type === 'select' || 
               newQuestion.question_type === 'radio' || 
               newQuestion.question_type === 'checkbox'
        ? newQuestion.options.map((opt, index) => ({
            id: `temp-opt-${Date.now()}-${index}`,
            question_id: `temp-${Date.now()}`,
            option_text: opt.text,
            option_value: opt.value,
            sort_order: index,
            created_at: new Date().toISOString(),
          }))
        : undefined,
    };

    setQuestions([...questions, question]);
    setNewQuestion({
      question_text: '',
      question_type: 'text',
      is_required: false,
      placeholder_text: '',
      options: [],
    });
  };

  const removeQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const addOption = () => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...prev.options, { text: '', value: '' }],
    }));
  };

  const updateOption = (index: number, field: 'text' | 'value', value: string) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => 
        i === index ? { ...opt, [field]: value } : opt
      ),
    }));
  };

  const removeOption = (index: number) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const needsOptions = ['select', 'radio', 'checkbox'].includes(newQuestion.question_type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Perguntas Customizadas</DialogTitle>
          <p className="text-sm text-gray-600">
            Configure perguntas específicas para o evento "{event.title}"
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lista de perguntas existentes */}
          {questions.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">Perguntas Configuradas</h4>
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <div key={question.id} className="flex items-start space-x-3 p-4 border rounded-lg bg-gray-50">
                    <GripVertical className="h-5 w-5 text-gray-400 mt-1 cursor-move" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{question.question_text}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {questionTypes.find(t => t.value === question.question_type)?.label}
                          </span>
                          {question.is_required && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              Obrigatório
                            </span>
                          )}
                        </div>
                      </div>
                      {question.placeholder_text && (
                        <p className="text-sm text-gray-600">
                          Placeholder: {question.placeholder_text}
                        </p>
                      )}
                      {question.options && question.options.length > 0 && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Opções: </span>
                          {question.options.map(opt => opt.option_text).join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingQuestion(question)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeQuestion(question.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulário para nova pergunta */}
          <div className="border-t pt-6">
            <h4 className="font-medium mb-4">Adicionar Nova Pergunta</h4>
            <div className="space-y-4">
              <div>
                <Label htmlFor="questionText">Texto da Pergunta *</Label>
                <Input
                  id="questionText"
                  value={newQuestion.question_text}
                  onChange={(e) => setNewQuestion(prev => ({ ...prev, question_text: e.target.value }))}
                  placeholder="Ex: Qual o tamanho da sua camiseta?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="questionType">Tipo de Pergunta</Label>
                  <Select
                    value={newQuestion.question_type}
                    onValueChange={(value: QuestionType) => 
                      setNewQuestion(prev => ({ ...prev, question_type: value, options: [] }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="placeholder">Texto de Ajuda (Opcional)</Label>
                  <Input
                    id="placeholder"
                    value={newQuestion.placeholder_text}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, placeholder_text: e.target.value }))}
                    placeholder="Ex: Selecione seu tamanho preferido"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={newQuestion.is_required}
                  onCheckedChange={(checked) => 
                    setNewQuestion(prev => ({ ...prev, is_required: checked }))
                  }
                />
                <Label>Pergunta obrigatória</Label>
              </div>

              {/* Opções para perguntas de múltipla escolha */}
              {needsOptions && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Opções de Resposta</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={addOption}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar Opção
                    </Button>
                  </div>
                  
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        placeholder="Texto da opção"
                        value={option.text}
                        onChange={(e) => updateOption(index, 'text', e.target.value)}
                      />
                      <Input
                        placeholder="Valor (opcional)"
                        value={option.value}
                        onChange={(e) => updateOption(index, 'value', e.target.value)}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeOption(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={addNewQuestion}
                disabled={!newQuestion.question_text.trim()}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Pergunta
              </Button>
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={onClose}
              className="bg-nuflow-forest hover:bg-nuflow-darkForest"
            >
              Salvar Perguntas
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
