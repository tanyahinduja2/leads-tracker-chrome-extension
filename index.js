let myLeads = []
const saveInput = document.getElementById("save-input") 
const deleteAll = document.getElementById("delete-all")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const saveTab = document.getElementById("save-tab")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

saveTab.addEventListener("click", function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for(let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems 
}

inputEl.addEventListener("keypress", function(event) {
    if(event.key === "Enter")
        saveInput.click()
})

saveInput.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

deleteAll.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
}) 
