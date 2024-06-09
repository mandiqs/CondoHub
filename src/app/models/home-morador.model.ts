export interface HomeMorador {
    id: string;
    nome: string;
    apartamento: string;
    avisos: Aviso[];
  }
  
  export interface Aviso {
    id: string;
    titulo: string;
    mensagem: string;
    data: string;
    moradorid: string; 
  }
  

  