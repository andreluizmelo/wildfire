import { Report } from "../models/report";
import { ReportTypeItem } from "../pages/create-report/report-type-item";

export const demoData: Report[] = [
    // {id: "1", description: "Poste energizado!! Risco de CHOQUE!!", type: 2, gravidade: 3, latitude: -22.8938493, longitude: -43.1995236, image: "http://www.acheisudoeste.com.br/hd-imagens/noticias/Fio-Exposto-Praca-Marcionilio-Batista-da-Silva02-Brumado-Noticias-82.JPG"},
    // {id: "2", description: "Instalação ilegal na rua", type: 1, gravidade: 1, latitude: -22.8955195, longitude: -43.1981289, image: "https://www.google.com.br/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjcmqbJiMPcAhUExpAKHRZQCxsQjRx6BAgBEAU&url=https%3A%2F%2Fwww.otempo.com.br%2Fcapa%2Fbrasil%2Fstj-confirma-corte-de-luz-para-quem-faz-gato-na-rede-el%25C3%25A9trica-1.1606911&psig=AOvVaw1kgxDHoqLYEY43H-4987Y1&ust=1532910967998541"},
    // {id: "3", description: "Poste caido na rua. A energia da região está desligada", type: 2, gravidade: 2, latitude: -22.8958358, longitude: -43.1965946, image: "https://www.google.com.br/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjjovqoh8PcAhXKIZAKHUpnAhEQjRx6BAgBEAU&url=http%3A%2F%2Ftudoanormal.com.br%2Fbr%2F2016%2F01%2F16%2Fposte-na-rua%2F&psig=AOvVaw1wL3tPkUoS5oiZeRKvBiwJ&ust=1532910648847563"},
    // {id: "4", description: "Tá criando o gato na rua agora!!", type: 1, gravidade: 1, latitude: -22.8965869, longitude: -43.1984185, image: "https://www.google.com.br/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjunpe9icPcAhWGG5AKHVCPDHYQjRx6BAgBEAU&url=https%3A%2F%2Fterritoriogoncalense.blogspot.com%2F2017%2F03%2Fsao-goncalo-lidera-ranking-de-furto-de.html&psig=AOvVaw1GqZc_VMEtZThzl4xk99_J&ust=1532911230214886"},
    // {id: "5", description: "Acabou a energia na casa! Está sem luz ai também pessoal?", type: 1, gravidade: 1, latitude: -22.8966067, longitude: -43.1998133, image: "http://www.folha1.com.br/_midias/jpg/2017/04/17/487x377/1_falta_de_energia_no_centro___17_04_2017_foto_rodrigo_silveira__19_-667214.jpg"},
    // {id: "6", description: "Apagão na rua agora. Cuidado pessoal!!!", type: 1, gravidade: 2, latitude: -22.896666, longitude: -43.2002532, image: "https://www.google.com.br/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwitpPaIisPcAhWFl5AKHavkDb0QjRx6BAgBEAU&url=http%3A%2F%2Ftribunadoceara.uol.com.br%2Fnoticias%2Fcotidiano-2%2Ffalha-em-subestacao-de-energia-causa-apagao-em-bairros-de-fortaleza%2F&psig=AOvVaw2BQZPxjQlpDTVe5o1rEVAG&ust=1532911382529036"},
    // {id: "7", description: "Sem luz. Cuidado", type: 1, gravidade: 2, latitude: -22.8967154, longitude: -43.2009935, image: "https://www.google.com.br/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjWpLfIi8PcAhXGj5AKHRF1AyIQjRx6BAgBEAU&url=http%3A%2F%2Fwww.mtnoticias.net%2Fapagao-deixa-municipios-de-mato-grosso-sem-energia-eletrica%2F&psig=AOvVaw2BQZPxjQlpDTVe5o1rEVAG&ust=1532911382529036"},    
    // {id: "8", description: "Arvore na rede. Perigo eminente!", type: 1, gravidade: 2, latitude: -22.8965178, longitude: -43.2025813, image: "https://www.google.com.br/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwisgfOfjMPcAhXDDpAKHdaHD2YQjRx6BAgBEAU&url=http%3A%2F%2Fwww.tlnoticias.com.br%2Fnoticias%2Fdenuncia-arvore-na-rede-eletrica-causa-riscos-de-curto-circuito&psig=AOvVaw2A5lMWxwTNBt5B6ar9144Z&ust=1532911972305005"}
];




// export enum reportTypes: ReportTypeItem[] = [
//     {value: 1, label: "Instalação Ilegal", checked: false},
//     {value: 2, label: "Risco de Choque", checked: false},
//     {value: 3, label: "Falha no Serviço", checked: false},
//     {value: 4, label: "Outros", checked: false}
//   ];
