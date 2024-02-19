"use client";

import { validateEmail } from "@/lib/utils-form";
import { useState } from "react";

interface FormState {
  email: string;
  isValid: boolean;
}

export default function Footer() {
  const [dataForm, setDataForm] = useState<FormState>({
    email: "",
    isValid: false,
  });

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    const isValidEmail = validateEmail(newEmail);

    setDataForm({
      email: newEmail,
      isValid: isValidEmail,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (dataForm.isValid) {
      alert(`Correo electrónico válido:", ${dataForm.email}`);
    } else {
      alert("Correo electrónico no válido. Por favor, corrige la entrada.");
    }
  };

  return (
    <footer className="rounded-2xl bg-dark m-10 flex flex-col items-center text-light p-16">
      <h3 className=" font-medium text-center capitalize text-4xl px-4">
        Interesting Stories | Updates | Guides
      </h3>
      <p className="w-[90%] text-center mt-4">
        Subscribe to learn about new technology and updates. Join over 5000+
        members community to stay up to date with the latest news.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 min-w-[384px] flex flex-row gap-2 justify-center items-center text-ligth p-2 rounded"
      >
        <input
          className="rounded-md pl-5 pr-40"
          type="email"
          id="email"
          name="email"
          placeholder="Introduce tu email"
          value={dataForm.email}
          onChange={handleEmailChange}
          required
        />
        <button
          type="submit"
          disabled={!dataForm.isValid}
          className="cursor-pointer bg-white text-dark px-5 py-2 rounded-md font-bold"
        >
          Enviar
        </button>
      </form>

      <div className="flex flex-row gap-2 mt-5">
        <a href="http://">LinkedIn</a>
        <a href="http://">Twitter</a>
        <a href="http://">Github</a>
        <a href="http://">Dribble</a>
      </div>
    </footer>
  );
}
