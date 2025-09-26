import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const onSubmit = form.handleSubmit(async (values) => {
    const { error } = await signIn(values.email, values.password);
    if (error) {
      form.setError("email", { message: error.message });
      return;
    }
    navigate("/dashboard");
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">Entrar</h1>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
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
              <Button type="submit">Entrar</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
