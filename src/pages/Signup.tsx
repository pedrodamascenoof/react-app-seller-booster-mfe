import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from '@/integrations/supabase/client';
// If you have
type SignupFormValues = {
  name: string;
  phone?: string;
  email: string;
  password: string;
};

const Signup = () => {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const onSubmit = form.handleSubmit(async (values) => {
    const metadata = { name: values.name, phone: values.phone };
    const { error, data } = await signUp(values.email, values.password, metadata) as any;
    // If signUp returns a user object immediately, upsert profile for better UX
    try {
      const userId = data?.user?.id ?? null;
      if (userId) {
        // types: project doesn't have a generated Database typing for profiles table,
        // cast supabase to any to avoid TS error about unknown relations
        await (supabase as any)
          .from('profiles')
          .upsert({
            id: userId,
            email: values.email,
            full_name: values.name,
            phone: values.phone,
            updated_at: new Date().toISOString()
          } as any);
      }
    } catch (e) {
      // Non-fatal: trigger in DB should create profile if this fails
      console.error('Failed to upsert profile after signup', e);
    }
    if (error) {
      form.setError("email", { message: error.message });
      return;
    }
    navigate("/dashboard");
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">Criar conta</h1>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...form.register("name", { required: "Nome é obrigatório" })} />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input {...form.register("phone")} />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...form.register("email", { required: "Email é obrigatório" })} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input {...form.register("password", { required: "Senha é obrigatória" })} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>

            <div className="flex justify-end">
              <Button type="submit">Criar conta</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
