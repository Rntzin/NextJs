import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  input1: z.string().min(1, "Email é obrigatório"),
  input2: z.string().min(1, "Senha é obrigatória"),
});

type FormValues = z.infer<typeof schema>;

export const MyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const formSent = (data: FormValues) => {
    console.log("Email:", data.input1);
    console.log("Senha:", data.input2);
  };

  return (
    <form onSubmit={handleSubmit(formSent)} className={styles.form}>
      <div className={styles.description1}>
        <h1>Email</h1>
        <input
          id="input1"
          type="text"
          placeholder="Digite seu Email"
          {...register("input1", { required: "Este campo é obrigatório" })}
        />
      </div>

      <div className={styles.description2}>
        <h1>Senha</h1>
        <input
          id="input2"
          type="text"
          placeholder="Mínimo 6 caracteres"
          {...register("input2", { required: "Este campo é obrigatório" })}
        />
      </div>
      {errors.input2 && <p>{errors.input2.message}</p>}
      <input type="text" placeholder="Senha" />
      <button type="button">Enviar</button>
    </form>
  );
};
