const fileInput = document.querySelector("#file-input");
const selector = document.querySelector("#seleccion");
/** @type {HTMLFormElement} */
const form = document.querySelector("#formulario");
/** @type {HTMLInputElement} */
const input = document.querySelector("#text-input");

/** @type {HTMLImageElement} */
const preview = document.querySelector("#preview");

/** @type {HTMLImageElement} */
const result = document.querySelector("#result");


/** @type {HTMLDivElement} */
const loader = document.querySelector("#loader");

/** @type {HTMLButtonElement} */
const remover = document.querySelector("#remover");

/** @type {File | undefined} */
let file

/** @type {NodeJS.Timeout | undefined} */
let timeout

document.addEventListener('DOMContentLoaded', () => setLoading(false))

selector.onclick = () => fileInput.click()

input.onchange = ({ target }) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => setImageUrl(target.value, preview), 900)
}

form.onsubmit = async (ev) => {
    ev.preventDefault()
    if (!input.value) return triggerError('Debe ingresar un valor')
    const form = JSON.stringify({ url: input.value })
    handlePost('/remove-url', form)
}

fileInput.onchange = () => {
    file = fileInput.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url, preview)
}


remover.onclick = async () => {
    if (!file) return triggerError("Necesita tener un archivo seleccionado");
    const form = new FormData()
    form.append('archivo', file)
    handlePost('/remove-bg', form)
}


/** Dispara una alerta */
function triggerError(text = "") {
    Swal.fire({ title: "Error", text: text, icon: "error" })
}

/** Actualiza el elemento imagen 
 * @param {string} [url=""] 
 * @param {HTMLImageElement} element
*/
function setImageUrl(url = "", element) {
    element.src = url;
    element.alt = url;
}

/** Muestra el estado de carga */
function setLoading(state = true) {
    remover.style = `display: ${state ? 'none' : 'block'};`
    loader.style = `display: ${state ? 'block' : 'none'};`
}

/**
 * Handler para las request del formulario
 * @param {string} link 
 * @param {BodyInit} body 
 * @returns 
 */
async function handlePost(link, body) {
    try {

        setLoading(true)
        const resp = await fetch(link, {
            body, method: "POST", headers: {
                'Content-Type': 'application/json'
            }
        })
        setLoading(false)
        if (!resp.ok) return triggerError("Error con la petición");
        const blob = await resp.blob()
        const url = URL.createObjectURL(blob)
        setImageUrl(url, result)
    } catch (error) {
        setLoading(false)
        triggerError(`Error fatal: ${error}`)
    }
}