document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundColor = '#1a1007'
    document.body.style.color = '#ffa348'
    document.body.style.fontFamily = '"Arial", sans-serif'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.boxSizing = 'border-box'
    document.body.style.display = 'flex'
    document.body.style.flexDirection = 'column'
    document.body.style.height = '100vh'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    const toolbar = document.createElement('div')
    toolbar.style.backgroundColor = '#261c14'
    toolbar.style.borderRadius = '25px'
    toolbar.style.margin = '0.5rem'
    toolbar.style.padding = '0.5rem'
    toolbar.style.display = 'flex'
    toolbar.style.justifyContent = 'center'
    toolbar.style.alignItems = 'center'
    toolbar.style.flexWrap = 'wrap'
    toolbar.style.marginTop = '1rem'

    const contentContainer = document.createElement('div')
    contentContainer.style.flexGrow = '1'
    contentContainer.style.display = 'flex'
    contentContainer.style.flexDirection = 'column'
    contentContainer.style.padding = '0.5rem'
    contentContainer.style.overflow = 'hidden'

    const iframe = document.createElement('iframe')
    // iframe.src = 'https://chat.openai.com'
    iframe.style.flexGrow = '1'
    iframe.style.width = '100%'
    iframe.style.border = 'none'
    iframe.style.borderRadius = '8px'
    iframe.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'

    function renderSites(sites) {
        toolbar.innerHTML = ''
        sites.forEach(site => {
            const button = createButton(site.name, site.url)
            toolbar.appendChild(button)
        })
    }

    chrome.storage.sync.get(['sidebarSites'], (result) => {
        const sites = result.sidebarSites || []
        renderSites(sites)
    })

    document.body.appendChild(toolbar)
    contentContainer.appendChild(iframe)
    document.body.appendChild(contentContainer)

    function createButton(label, url) {
        const button = document.createElement('button')
        button.textContent = label
        button.style.backgroundColor = 'transparent'
        button.style.color = '#afa9a5'
        button.style.border = 'none'
        button.style.borderRadius = '25px'
        button.style.padding = '0.5rem 1rem'
        button.style.cursor = 'pointer'
        button.style.transition = 'background-color 0.2s, color 0.2s'
        button.style.fontSize = '0.9rem'
        button.dataset.url = url

        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#332417'
            button.style.color = '#ffa348'
        })

        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = 'transparent'
            button.style.color = '#afa9a5'
        })
    
        button.addEventListener('click', () => iframe.src = url)
        return button
    }
    
})