export interface User {
    id?: number;
    nome: string;
    sobrenome: string;
    endereco?: string;
    telefone: string;
    email: string; // Email é obrigatório
    password: string; // Password é obrigatório
    nif: string;
    especializacao?: string; // O atributo é opcional
    tipo_de_usuario: number;
    usuario_data?: any;
  }