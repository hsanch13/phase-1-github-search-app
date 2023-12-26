const form = document.querySelector("#github-form")
const searchContent = document.querySelector("#search")
const searchResults = document.querySelector("#user-list")
const repoSearchResults = document.querySelector("#repos-list")
// console.log(searchResults)
//    console.log(searchContent)

// console.log(form) --making sure we grabbed the form

form.addEventListener("submit", (e) => {
    e.preventDefault() // prevents pg from refreshing
    console.log(searchContent.value)
    searchUsers(searchContent.value)
})

function searchUsers(userString){
    fetch(`https://api.github.com/search/users?q=${userString}`, {
        method: "GET",
        headers: {"Accept" : "application/vnd.github.v3+json"}
    })
    .then (resp => resp.json())
    .then (userData => renderSearchResults(userData))
}

function renderSearchResults(userData){
    //console.log(userData) // checking to see what user data gets returned. loop through the array of the user data
    userData.items.forEach(user => {
      const listElement = document.createElement("li")
        listElement.textContent = user.login
        searchResults.appendChild(listElement)
        listElement.addEventListener("click", (e) => {
        //    console.log(e) // checking to see what event the click is running on
        userRepos(user.login)
        })
    })
}

function userRepos(username){
    fetch(`https://api.github.com/users/${username}/repos`,{
        method: "GET",
        headers: {"Accept" : "application/vnd.github.v3+json"}
    })
    .then (resp => resp.json())
    .then (repoData => renderRepoResults(repoData))
}

function renderRepoResults(repoArray){
    // console.log(repoArray)
    repoArray.forEach(repo => {
        const repoList = document.createElement("li")
        repoList.textContent = repo.full_name
        repoSearchResults.appendChild(repoList) 
    })
}




