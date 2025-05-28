
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCoupons } from '@/hooks/useCoupons';
import { Coupon, CreateCouponData } from '@/types/coupons';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const couponSchema = z.object({
  code: z.string().min(3, 'Código deve ter pelo menos 3 caracteres').max(20, 'Código deve ter no máximo 20 caracteres'),
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  discount_type: z.enum(['percentage', 'fixed']),
  discount_value: z.number().min(0.01, 'Valor deve ser maior que 0'),
  application_type: z.enum(['event', 'subscription', 'general']),
  target_event_id: z.string().optional(),
  start_date: z.string().min(1, 'Data de início é obrigatória'),
  end_date: z.string().min(1, 'Data de término é obrigatória'),
  usage_limit: z.number().optional(),
  usage_limit_per_user: z.number().optional(),
  is_active: z.boolean().default(true),
}).refine((data) => {
  if (data.application_type === 'event' && !data.target_event_id) {
    return false;
  }
  return true;
}, {
  message: 'Evento é obrigatório quando tipo de aplicação for "evento"',
  path: ['target_event_id'],
}).refine((data) => {
  return new Date(data.end_date) > new Date(data.start_date);
}, {
  message: 'Data de término deve ser posterior à data de início',
  path: ['end_date'],
});

interface CouponFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  coupon?: Coupon;
}

export const CouponFormDialog: React.FC<CouponFormDialogProps> = ({
  isOpen,
  onClose,
  coupon,
}) => {
  const { createCoupon, updateCoupon, isCreating, isUpdating } = useCoupons();
  const isEditing = !!coupon;

  // Buscar eventos para o select
  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('id, title')
        .eq('status', 'active')
        .order('title');
      
      if (error) throw error;
      return data || [];
    },
    enabled: isOpen,
  });

  const form = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: '',
      name: '',
      description: '',
      discount_type: 'percentage',
      discount_value: 0,
      application_type: 'general',
      target_event_id: undefined,
      start_date: '',
      end_date: '',
      usage_limit: undefined,
      usage_limit_per_user: undefined,
      is_active: true,
    },
  });

  // Preencher formulário quando editando
  useEffect(() => {
    if (coupon && isOpen) {
      form.reset({
        code: coupon.code,
        name: coupon.name,
        description: coupon.description || '',
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
        application_type: coupon.application_type,
        target_event_id: coupon.target_event_id || undefined,
        start_date: coupon.start_date.split('T')[0],
        end_date: coupon.end_date.split('T')[0],
        usage_limit: coupon.usage_limit || undefined,
        usage_limit_per_user: coupon.usage_limit_per_user || undefined,
        is_active: coupon.is_active,
      });
    }
  }, [coupon, isOpen, form]);

  const applicationType = form.watch('application_type');

  const onSubmit = (values: z.infer<typeof couponSchema>) => {
    const data: CreateCouponData = {
      code: values.code,
      name: values.name,
      description: values.description,
      discount_type: values.discount_type,
      discount_value: values.discount_value,
      application_type: values.application_type,
      start_date: new Date(values.start_date).toISOString(),
      end_date: new Date(values.end_date).toISOString(),
      target_event_id: values.application_type === 'event' ? values.target_event_id : undefined,
      usage_limit: values.usage_limit,
      usage_limit_per_user: values.usage_limit_per_user,
      is_active: values.is_active,
    };

    if (isEditing) {
      updateCoupon({ id: coupon.id, data });
    } else {
      createCoupon(data);
    }
    
    onClose();
    form.reset();
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Cupom' : 'Criar Novo Cupom'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código do Cupom *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: BIKEDAY10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Cupom *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Desconto Bike Day" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrição interna do cupom..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="discount_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Desconto *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="percentage">Percentual (%)</SelectItem>
                        <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor do Desconto *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        min="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="application_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Aplicação *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">Geral</SelectItem>
                        <SelectItem value="event">Evento Específico</SelectItem>
                        <SelectItem value="subscription">Assinatura</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {applicationType === 'event' && (
                <FormField
                  control={form.control}
                  name="target_event_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Evento *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o evento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {events.map((event) => (
                            <SelectItem key={event.id} value={event.id}>
                              {event.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Início *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Término *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="usage_limit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limite Total de Uso</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        placeholder="Deixe vazio para ilimitado"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="usage_limit_per_user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limite por Usuário</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        placeholder="Deixe vazio para ilimitado"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Cupom Ativo</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Permitir que o cupom seja usado pelos usuários
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isCreating || isUpdating}
                className="bg-nuflow-forest hover:bg-nuflow-darkForest"
              >
                {isCreating || isUpdating ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
