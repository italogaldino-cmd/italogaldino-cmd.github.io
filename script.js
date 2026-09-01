const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
document.getElementById('year').textContent = new Date().getFullYear();

const sqlReports = [
  'EXERCICÍOS DO 1 AO 9 (PC Sistemas)', 'COMPRAS FORNECEDOR', 'BÔNUS STO WMS', 'FUNCTION BÔNUS STO WMS', 'TESTE HUDSON', 'FILIPE NFS TRATATIVA', 'PRODUTO - PREÇO (COMPRAS)', 'EVENTOS WMS - CARREGAMENTO', 'ENDEREÇAMENTO - FILIAL', 'EVENTOS AJUSTE ESTOQUE - WMS', 'ABASTECIMENTO O.S. EVENTOS - WMS', 'RELATÓRIO INFORMAÇÕES SAC', 'ACOMPANHAMENTO DE CARGAS STO', 'ANÁLISE DE DEMANDAS CDE', 'ANALISE DE EXTRATO DE PRODUTOS', 'CALENDÁRIO DE COMPRAS', 'CONSULTA DE ESTOQUE 2', 'CONSULTA DE ESTOQUE', 'TESTE', 'CONFERÊNCIA DE BÔNUS', 'AUDITORIA DE DEMANDAS', 'DEVOLUÇÃO POR GERENTE-FILIAL', 'ESTOQUE STO - PREÇO', 'ENTRADA DE MERCADORIA', 'LOCK DE DEMANDAS', 'ESTOQUE ABC WMS', 'SALDO AJUSTE DE ESTOQUE', 'DESCARGA PIX E CARTÃO', 'ANÁLISE DE DEVOLUÇÕES', 'ACOMPANHAMENTO DE DEVOLUÇÃO A FORNEC.', 'ANÁLISE DE OCORRÊNCIAS RF', 'FINANCEIRO PIX AVULSO', 'LOG REAPROVEITAMENTO DE AVARIA', 'CONTROLE DE ENTRADA DE NF', 'VW_REL_BONUS_DESCARGA', 'VW_REL_EVENTOS_PEDIDOS_WMS', 'VW_REL_SAC_DEVOLUCOES', 'VW_WMS_MOVIMENTACAO_OS', 'CONSULTA AMAURY', 'CONSULTA HUDSON', 'CONSULTA MATEUS CARDOSO', 'Consulta 1302 - 1303', 'Consulta Permissões', 'Consultas NFS', 'SCRIPTS - 01', 'SCRIPTS - 02', 'vinicius1', 'vinicius2', 'MICHEL', 'MICHEL2', 'Antigo SQL', 'Novo SQL', 'Antigo SQL', 'Novo SQL', 'Antigo SQL', 'Novo SQL', 'Consulta Bônus', 'Consulta Bônus2', 'Consulta Inventário STO', 'ANALISE DE CARTEIRA DE CLIENTES', 'ANÁLISE DE TÍTULOS VENDOR'
];

const terminalFile = document.getElementById('terminal-file');
const terminalCode = document.getElementById('terminal-code');
const reportCount = document.getElementById('report-count');
const escapeHtml = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
let reportIndex = 0;

function showReport(index) {
  const report = sqlReports[index];
  const position = String(index + 1).padStart(2, '0');
  terminalFile.textContent = `${report.toLowerCase()}.sql`;
  reportCount.textContent = position;
  terminalCode.innerHTML = `<span class="output">-- relatório SQL desenvolvido</span>\n\n<b>SELECT</b>\n  <mark>'${escapeHtml(report)}'</mark> <span class="output">AS projeto</span>\n<b>FROM</b> portfolio\n<b>WHERE</b> tecnologia = <mark>'Oracle / WinThor'</mark>;\n\n<span class="output">→ ${position} de ${sqlReports.length} relatórios disponíveis</span><span class="cursor">_</span>`;
  terminalCode.animate([{ opacity: .15, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 360, easing: 'ease-out' });
}

if (terminalFile && terminalCode && reportCount) {
  showReport(reportIndex);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(() => { reportIndex = (reportIndex + 1) % sqlReports.length; showReport(reportIndex); }, 3400);
  }
}
