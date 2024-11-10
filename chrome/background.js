chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(console.error)
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
        addRules: [{
            id: 1,
            priority: 1,
            action: {
                type: "modifyHeaders",
                responseHeaders: [
                    { header: "content-security-policy", operation: "remove" },
                    { header: "x-frame-options", operation: "remove" },
                    { header: "frame-options", operation: "remove" },
                    { header: "frame-ancestors", operation: "remove" },
                    { header: "X-Content-Type-Options", operation: "remove" },
                    { header: "access-control-allow-origin", operation: "set", value: "*" }
                ]
            },
            condition: { resourceTypes: ["main_frame", "sub_frame"] }
        }]
    })
})

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['sidebarSites'], (result) => {
        if (!result.sidebarSites || result.sidebarSites.length === 0) {
            const defaultSites = [
                { name: "ChatGPT", url: "https://chat.openai.com" },
                { name: "Gemini", url: "https://gemini.google.com" },
                { name: "Perplexity", url: "https://perplexity.ai" },
                { name: "LangChain", url: "https://chat.langchain.com" },
                { name: "You", url: "https://you.com" },
                { name: "DeepL", url: "https://deepl.com" },
                { name: "Reverso", url: "https://reverso.net" }
            ]
            chrome.storage.sync.set({ sidebarSites: defaultSites })
        }
    })
})