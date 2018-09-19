const students = ["artxx", "cnovita", "69djgabz", "Elia-Darwish", "MohammadRabboua", "Lovelyladylove", "Weyinmik", "Zahershahoud"]

let githubUsersAPI = "https://api.github.com/users/"
let studentsData = []

let studentsListElement = document.querySelector("#students-list")

students.forEach(student => {
    fetch(githubUsersAPI + student)
        // Wait for the response
        .then(response => response.json()) // Turn the response into JSON
        .then(json => {
            //console.log(json) // Output the JSON to the console so we can see it
            //studentsData.push(json)
            //console.log(studentsData)

            fetch(json.repos_url)
                .then(response => response.json())
                .then(repositories => {
                    console.log(json.login, repositories)
                        // repositories[0].name = name of repostiory
                        // repositories[0].html_url = url of repostiory

                    let repositoryHTML = ""
                    repositories
                        .sort((a, b) => {
                            return (a.updated_at < b.updated_at) ? 1 : -1
                        })
                        .forEach((repo, index) => {
                            if (index < 4) {
                                repositoryHTML += `
              <div>
                <a target="_blank" href="${repo.html_url}">
                  ${repo.name}
                </a>
                <div>Stars: ${repo.stargazers_count} - Watchers: ${repo.watchers_count}</div>
              </div>
            `
                            } else {
                                return
                            }
                        })


                    studentsListElement.innerHTML += `
          <div class="col-4">
            <div class="card mb-3">
              <img class="card-img-top" src=${json.avatar_url || "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12225358/Pug-On-White-01.jpg"} alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">${json.login}</h5>
                <p class="card-text">${json.location || "NOT ON THIS PLANET"}</p>
                <div class="mb-3">
                  Newest Repositories: 
                  ${repositoryHTML}
                </div>
                <a target="_blank" href="${json.html_url}" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          `
                })

        })

})