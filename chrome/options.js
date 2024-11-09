document.addEventListener('DOMContentLoaded', () => {
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.boxSizing = 'border-box'
    document.body.style.display = 'flex'
    document.body.style.flexDirection = 'column'
    document.body.style.height = '100vh'
    document.body.style.width = '100%'
    document.body.style.backgroundColor = '#ffe4cc'
    document.body.style.color = '#e0e0e0'
    document.body.style.justifyContent = 'center'

    const container = document.createElement('div')
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.width = '100%'
    container.style.maxWidth = 'calc(100% - 80px)'
    container.style.margin = '0 auto'

    const jsonInput = document.createElement('textarea')
    jsonInput.style.width = '100%'
    jsonInput.style.height = 'calc(100vh - 150px)'
    jsonInput.style.backgroundColor = '#f2d8c2'
    jsonInput.style.color = '#5e5854'
    jsonInput.style.border = 'none'
    jsonInput.style.padding = '10px'
    jsonInput.style.fontFamily = 'monospace'
    jsonInput.style.fontSize = '1.1rem'
    jsonInput.style.resize = 'none'
    jsonInput.style.boxSizing = 'border-box'

    function createButton(text, callback) {
        const button = document.createElement('button')
        button.textContent = text
        button.style.backgroundColor = 'transparent'
        button.style.color = '#5e5854'
        button.style.border = 'none'
        button.style.borderRadius = '25px'
        button.style.padding = '0.5rem 1rem'
        button.style.cursor = 'pointer'
        button.style.transition = 'background-color 0.3s'
        button.style.fontSize = '1.1rem'
        button.style.margin = '0.5rem'
        button.style.display = 'inline-flex'
        button.style.justifyContent = 'center'
        button.style.alignItems = 'center'
        button.style.flexShrink = '0'

        button.addEventListener('mouseover', () => button.style.backgroundColor = '#e9e1d5')
        button.addEventListener('mouseout', () => button.style.backgroundColor = 'transparent')
        button.addEventListener('click', callback)

        return button
    }

    function showNotification(message, color, time) {
        const notification = document.createElement('div')
        notification.textContent = message
        notification.style.position = 'fixed'
        notification.style.bottom = '20px'
        notification.style.right = '20px'
        notification.style.backgroundColor = color
        notification.style.color = 'white'
        notification.style.padding = '10px 20px'
        notification.style.borderRadius = '5px'
        notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'
        document.body.appendChild(notification)
        setTimeout(() => notification.remove(), time)
    }

    const updateButton = createButton('Update', () => {
        try {
            const updatedSites = JSON.parse(jsonInput.value)
            if (Array.isArray(updatedSites) && updatedSites.every(site => site.name && site.url)) {
                chrome.storage.sync.set({ sites: updatedSites }, () => {
                    showNotification("Updated successfully", '#4caf50', 3000)                
                })
            } else {
                showNotification("Missing name or url parameters", '#ef4444', 3000)
            }
        } catch (e) {
            showNotification("Invalid JSON format", '#ef4444', 3000)
        }
    })

    const restoreButton = createButton('Default', () => {
        const defaultSites = [
            { name: "ChatGPT",          url: "https://chat.openai.com" },
            { name: "Gemini",           url: "https://gemini.google.com" },
            { name: "Perplexity",       url: "https://perplexity.ai" },
            // { name: "Phind",         url: "https://www.phind.com" },
            { name: "LangChain",        url: "https://chat.langchain.com" },
            { name: "You",              url: "https://you.com" },
            { name: "DeepL",            url: "https://deepl.com" },
            { name: "Reverso",          url: "https://reverso.net" },
            // { name: "LanguageTool",  url: "https://languagetool.org" },
            // { name: "Speller",       url: "https://yandex.ru/dev/speller" },
        ]
        jsonInput.value = JSON.stringify(defaultSites, null, 2)
    })

    const buttonsContainer = document.createElement('div')
    buttonsContainer.style.display = 'flex'
    buttonsContainer.style.justifyContent = 'center'
    buttonsContainer.style.alignItems = 'center'
    buttonsContainer.style.flexWrap = 'wrap'
    buttonsContainer.style.gap = '10px'
    buttonsContainer.style.marginTop = '1rem'
    buttonsContainer.style.minWidth = '400px'
    buttonsContainer.style.backgroundColor = '#f2d8c2'
    buttonsContainer.style.borderRadius = '25px'
    buttonsContainer.style.margin = '30px auto 0'

    buttonsContainer.appendChild(updateButton)
    buttonsContainer.appendChild(restoreButton)

    chrome.storage.sync.get(['sites'], (result) => {
        let sites = result.sites || []
        jsonInput.value = JSON.stringify(sites, null, 2)
    })

    container.appendChild(jsonInput)
    container.appendChild(buttonsContainer)
    document.body.appendChild(container)
})