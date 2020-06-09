// COLOCANDO OS ESTADOS E CIDADES

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]") // Seleciona a parte dos Estados

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    // Função anônima que está retornando um valor (=> é uma Arrow Function)
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    // Função anônima que está retornando um valor (=> é uma Arrow Function)
    .then( res => res.json() )
    .then( cities => {
 

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)




// ITENS DE COLETA

// Pegar todos os LI's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item .addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

// Array 
let selectedItems = []



function handleSelectedItem(event) {
    const itemLi = event.target

    // Adicionar ou Remover uma classe com Javascript
    // Toggle vai adicionar ou remover
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //console.log('ITEM ID:', itemId)


    // Verificar se existem itens selecionados, se sim,
    // pegar os itens selecionados

    const alreadySelected  = selectedItems.findIndex( item => {
        const itemFound = item == itemId // Isso será true ou false
        return itemFound
    })


    // Se o item já estiver selecionado, tirar da seleção
    if( alreadySelected >= 0 ) {
        // Tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId  // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // Se não estiver selecionado
        // adicionar à seleção
        selectedItems.push(itemId)

    }

    //console.log('selectedItems: ', selectedItems)

    // Atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
    
}
