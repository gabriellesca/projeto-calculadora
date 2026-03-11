let expressao = '';
const display = document.getElementById('display');
const exprEl  = document.getElementById('expressao');

function visual(str) {
  return str
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/-/g, '−');
}

function atualizarDisplay(valor) {
  display.textContent = valor || '0';
  display.classList.toggle('pequeno', String(valor).length > 9);
}

function adicionar(valor) {
  const operadores = ['+', '-', '*', '/', '%'];
  const ultimo = expressao.slice(-1);
  if (operadores.includes(valor) && operadores.includes(ultimo)) return;
  if (expressao === '' && operadores.includes(valor) && valor !== '-') return;

  display.classList.remove('resultado');
  expressao += valor;
  exprEl.textContent = visual(expressao);
  atualizarDisplay(visual(expressao));
}

function limpar() {
  expressao = '';
  exprEl.textContent = '';
  display.classList.remove('resultado');
  atualizarDisplay('0');
}

function apagar() {
  expressao = expressao.slice(0, -1);
  display.classList.remove('resultado');
  exprEl.textContent = '';
  atualizarDisplay(visual(expressao) || '0');
}

function calcular() {
  if (!expressao) return;
  try {
    const resultado = Function('"use strict"; return (' + expressao + ')')();
    const formatado = parseFloat(resultado.toFixed(10)).toString();

    exprEl.textContent = visual(expressao) + ' =';
    atualizarDisplay(formatado);
    display.classList.add('resultado');
    expressao = formatado;
  } catch (e) {
    atualizarDisplay('Erro');
    display.classList.remove('resultado');
    expressao = '';
    setTimeout(() => atualizarDisplay('0'), 1200);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') adicionar(e.key);
  else if (e.key === '+') adicionar('+');
  else if (e.key === '-') adicionar('-');
  else if (e.key === '*') adicionar('*');
  else if (e.key === '/') { e.preventDefault(); adicionar('/'); }
  else if (e.key === '%') adicionar('%');
  else if (e.key === '.') adicionar('.');
  else if (e.key === 'Enter' || e.key === '=') calcular();
  else if (e.key === 'Backspace') apagar();
  else if (e.key === 'Escape') limpar();
});
