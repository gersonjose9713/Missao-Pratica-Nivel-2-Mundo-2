function autalizarSelect() {
  let select = document.querySelector('#sortMethod');
  let optionValue = select.options[select.selectedIndex];
  let value = optionValue.value;
  return value;
}

let valores = [];

function add() {
  const valorInput = document.getElementById('valor');
  if (valorInput.value != '') {
    const valoresList = document.getElementById('valores');
    const node = document.createElement('li');
    const textNode = document.createTextNode(valorInput.value);
    valoresList.appendChild(node);
    node.appendChild(textNode);
    valorInput.value = '';
  }
}

function ordenar() {
  const listaSelecao = autalizarSelect();
  const listaValores = document.getElementById('valores');
  const valores = Array.from(listaValores.children).map(item =>
    parseInt(item.innerHTML)
  );

  switch (listaSelecao) {
    case 'bubble_sort':
      bubble_sort(valores);
      break;
    case 'selection_sort':
      selection_sort(valores);
      break;
    case 'quick_sort':
      quick_sort(valores);
      break;
    case 'particionamento':
      quick_sort(valores);
      break;
    default:
      return;
  }

  const newItems = valores
    .map(valor => `<li>${valor}</li>`)
    .reduce((acc, item) => acc + item, '');

  listaValores.innerHTML = newItems;
}

const misturar = () => {
  const listaValores = document.getElementById('valores');
  const valores = Array.from(listaValores.children).map(item =>
    parseInt(item.innerHTML)
  );

  if (valores != '') {
    shuffle(valores);
  }

  const newItems = valores
    .map(valor => `<li>${valor}</li>`)
    .reduce((acc, item) => acc + item, '');

  listaValores.innerHTML = newItems;
};

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const shuffle = (arr, numSwaps = 100) => {
  const len = arr.length;
  for (let i = 0; i < numSwaps; i++) {
    const rand1 = Math.floor(Math.random() * len);
    const rand2 = Math.floor(Math.random() * len);
    swap(arr, rand1, rand2);
  }
};

const bubble_sort = arr => {
  const len = arr.length;
  let swapped = false;
  for (let i = 0; i < len - 1; i++) {
    swapped = false;
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        swapped = true;
      }
    }
    if (!swapped) break;
  }
};

const selection_sort = arr => {
  const len = arr.length;
  let minIndex;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      swap(arr, i, minIndex);
    }
  }
};

const quick_sort = (arr, low = 0, high = arr.length - 1) => {
  if (low < high) {
    const pivotIndex = particionamento(arr, low, high);
    quick_sort(arr, low, pivotIndex - 1);
    quick_sort(arr, pivotIndex + 1, high);
  }
};

const particionamento = (arr, low, high) => {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
};
