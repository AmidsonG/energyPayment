export interface User {
    id?: number;
    nome: string;
    sobrenome: string;
    telefone: string;
    nif: string;
    endereco: string;
    numero_de_conta: string;
    numero_do_contador  : string;
    email: string; // Email é obrigatório
    password: string; // Password é obrigatório
    usuario_data?: any;
  }