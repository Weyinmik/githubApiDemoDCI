const students = ["artxx", "cnovita", "69djgabz", "Elia-Darwish", "MohammadRabboua", "Lovelyladylove", "Weyinmik", "Zahershahoud"]

let githubUsersAPI = "https://api.github.com/users/"
let studentsData = []

let studentsListElement = document.querySelector("#students-list")

students.forEach(student => {
    fetch(githubUsersAPI + student)
        // Wait for the response
        .then(response => response.json()) // Turn the response into JSON
        .then(json => {
            console.log(json) // Output the JSON t"artxx", "Weyinmik", "cnovita"o the console so we can see it
            studentsData.push(json)
            console.log(studentsData)

            if (json.avatar_url !== undefined) {

            }
            studentsListElement.innerHTML += `
      <div class="col-4">
        <div class="card" >
          <img class="card-img-top" src=${json.avatar_url || "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12225358/Pug-On-White-01.jpg"} alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${"Username: "+json.login}</h5>
            <p class="card-text">${"Bio: " + (json.bio || "Not Available Yet")}</p>
            <p class="card-text">${"Location: " + (json.location || "Not Available")}</p>
            <a target="_blank" href="${json.html_url}" class="btn btn-primary">Visit URL</a>
          </div>
        </div>
      </div>
      `
        })
})