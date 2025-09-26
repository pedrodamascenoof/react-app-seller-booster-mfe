import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';

type Props = {
  user: any;
  onClose?: () => void;
};

type FormValues = {
  name: string;
  phone?: string;
};

export default function ProfileEditForm({ user, onClose }: Props) {
  const form = useForm<FormValues>({
    defaultValues: {
      name: (user as any)?.user_metadata?.name ?? '',
      phone: (user as any)?.user_metadata?.phone ?? '',
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      // Update auth metadata (raw_user_meta_data) so triggers keep DB in sync
      await supabase.auth.updateUser({ data: { name: values.name, phone: values.phone } as any });

      // Also upsert into profiles table for immediate effect
      const userId = (user as any)?.id ?? (user as any)?.user?.id ?? null;
      if (userId) {
        await supabase.from('profiles').upsert({
          id: userId,
          full_name: values.name,
          phone: values.phone,
          updated_at: new Date().toISOString(),
        } as any);
      }

      onClose?.();
    } catch (e) {
      console.error('Failed to update profile', e);
      // show toast here if needed
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormItem>
          <FormLabel>Nome</FormLabel>
          <FormControl>
            <Input {...form.register('name')} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Telefone</FormLabel>
          <FormControl>
            <Input {...form.register('phone')} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <div className="flex justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  );
}
