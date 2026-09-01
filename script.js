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

const legacySqlReports = [
  'EXERCICÍOS DO 1 AO 9 (PC Sistemas)', 'COMPRAS FORNECEDOR', 'BÔNUS STO WMS', 'FUNCTION BÔNUS STO WMS', 'TESTE HUDSON', 'FILIPE NFS TRATATIVA', 'PRODUTO - PREÇO (COMPRAS)', 'EVENTOS WMS - CARREGAMENTO', 'ENDEREÇAMENTO - FILIAL', 'EVENTOS AJUSTE ESTOQUE - WMS', 'ABASTECIMENTO O.S. EVENTOS - WMS', 'RELATÓRIO INFORMAÇÕES SAC', 'ACOMPANHAMENTO DE CARGAS STO', 'ANÁLISE DE DEMANDAS CDE', 'ANALISE DE EXTRATO DE PRODUTOS', 'CALENDÁRIO DE COMPRAS', 'CONSULTA DE ESTOQUE 2', 'CONSULTA DE ESTOQUE', 'TESTE', 'CONFERÊNCIA DE BÔNUS', 'AUDITORIA DE DEMANDAS', 'DEVOLUÇÃO POR GERENTE-FILIAL', 'ESTOQUE STO - PREÇO', 'ENTRADA DE MERCADORIA', 'LOCK DE DEMANDAS', 'ESTOQUE ABC WMS', 'SALDO AJUSTE DE ESTOQUE', 'DESCARGA PIX E CARTÃO', 'ANÁLISE DE DEVOLUÇÕES', 'ACOMPANHAMENTO DE DEVOLUÇÃO A FORNEC.', 'ANÁLISE DE OCORRÊNCIAS RF', 'FINANCEIRO PIX AVULSO', 'LOG REAPROVEITAMENTO DE AVARIA', 'CONTROLE DE ENTRADA DE NF', 'VW_REL_BONUS_DESCARGA', 'VW_REL_EVENTOS_PEDIDOS_WMS', 'VW_REL_SAC_DEVOLUCOES', 'VW_WMS_MOVIMENTACAO_OS', 'CONSULTA AMAURY', 'CONSULTA HUDSON', 'CONSULTA MATEUS CARDOSO', 'Consulta 1302 - 1303', 'Consulta Permissões', 'Consultas NFS', 'SCRIPTS - 01', 'SCRIPTS - 02', 'vinicius1', 'vinicius2', 'MICHEL', 'MICHEL2', 'Antigo SQL', 'Novo SQL', 'Antigo SQL', 'Novo SQL', 'Antigo SQL', 'Novo SQL', 'Consulta Bônus', 'Consulta Bônus2', 'Consulta Inventário STO', 'ANALISE DE CARTEIRA DE CLIENTES', 'ANÁLISE DE TÍTULOS VENDOR'
];

const sqlReports = [
  '8011 - ANÁLISE DE CARTEIRA DE CLIENTES', '8012 - ANÁLISE DE TÍTULOS VENDOR', '8593 - FILIPE NFS TRATATIVA', '8596 - COMPRAS FORNECEDOR', '8597 - BÔNUS STO WMS', '8600 - PRODUTO - PREÇO (COMPRAS)', '8601 - EVENTOS WMS - CARREGAMENTO', '8602 - ENDEREÇAMENTO - FILIAL', '8603 - EVENTOS AJUSTE ESTOQUE - WMS', '8604 - ABASTECIMENTO O.S. EVENTOS - WMS', '8605 - RELATÓRIO INFORMAÇÕES SAC', '8606 - ACOMPANHAMENTO DE CARGAS STO', '8607 - ANÁLISE DE DEMANDAS CDE', '8608 - ANÁLISE DE EXTRATO DE PRODUTOS', '8609 - CALENDÁRIO DE COMPRAS', '8613 - CONSULTA DE ESTOQUE', '8613 - CONSULTA DE ESTOQUE 2', '8614 - CONFERÊNCIA DE BÔNUS', '8615 - AUDITORIA DE DEMANDAS', '8616 - DEVOLUÇÃO POR GERENTE-FILIAL', '8618 - ESTOQUE STO - PREÇO', '8619 - ENTRADA DE MERCADORIA', '8622 - LOCK DE DEMANDAS', '8623 - ESTOQUE ABC WMS', '8624 - SALDO AJUSTE DE ESTOQUE', '8626 - DESCARGA PIX E CARTÃO', '8627 - ANÁLISE DE DEVOLUÇÕES', '8629 - ACOMPANHAMENTO DE DEVOLUÇÃO A FORNEC.', '8630 - ANÁLISE DE OCORRÊNCIAS RF', '8631 - FINANCEIRO PIX AVULSO', '8632 - LOG REAPROVEITAMENTO DE AVARIA', '8633 - CONTROLE DE ENTRADA DE NF'
];

const terminalFile = document.getElementById('terminal-file');
const terminalCode = document.getElementById('terminal-code');
const reportCount = document.getElementById('report-count');
const escapeHtml = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
let reportIndex = 0;

function showReport(index) {
  const report = sqlReports[index];
  const position = String(index + 1).padStart(2, '0');
  terminalFile.textContent = 'relatório em destaque';
  reportCount.textContent = position;
  terminalCode.innerHTML = escapeHtml(report);
  terminalCode.animate([{ opacity: .15, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 360, easing: 'ease-out' });
}

if (terminalFile && terminalCode && reportCount) {
  showReport(reportIndex);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(() => { reportIndex = (reportIndex + 1) % sqlReports.length; showReport(reportIndex); }, 3400);
  }
}
