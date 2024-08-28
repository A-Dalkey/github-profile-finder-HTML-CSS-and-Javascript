const CLIENT_ID = 'Ov23lislLmwyowTiulCz';
const CLIENT_SECRET = 'b07feb0344119b92dc876ac2ca48deff414d885e'; // Corrected typo

async function getuser(name) {
    const res = await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    const profile = await res.json();
    return profile;
}
async function getRepos(profile) {
    const res = await fetch(`${profile.repos_url}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    const repo = await res.json();
    return repo;
}

document.querySelector('#search').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.querySelector('#finduser').value;
    if (username.length > 0) {
        document.querySelector('.loader').style.display = 'block';
        document.querySelector('.user_details').style.display = 'none';
        const profile = await getuser(username);
        document.querySelector('.loader').style.display = 'none';
        if (profile.message === 'Not Found') {
            document.querySelector(".notfound").style.display = 'block';
        } else {
            const repos = await getRepos(profile);
            document.querySelector('.user_details').style.display = 'flex';
            showProfile(profile);
            showRepos(repos);
        }
    }

});

function showRepos(repos) {
    let netHtml = '';
    for (let repo of repos) {
        netHtml += `
     <div class="card">
                        <div class="card-title">
                            <a href="${repo.html_url}">${repo.name}</a>
                        </div>
                        <div class="details">
                            <p>
                                <span class="badge"></span><span> ${repo.language}</span>
                                <span class="stars">
                                    <ion-icon name="star-outline"></ion-icon>
                                   ${repo.watchers_count}
                                </span>
                                <span class="branch">
                                    <ion-icon name="git-branch-outline"></ion-icon>
                                    ${repo.forks_count}
                                </span>
                            </p>
                        </div>
                    </div>
    `
    }
    document.querySelector('.projects').innerHTML = netHtml;
}
function showProfile(profile) {
    document.querySelector('.profile').innerHTML = `
           <div class="profile">
                    <img src="${profile.avatar_url}" id="profimg" alt="profile image">
                    <h4 class="username">${profile.name}</h4>
                    <p class="username">${profile.login}</p>
                    <p class="status">${profile.bio}</p>
                    <div class="followers_following">
                        <p>
                            <ion-icon name="people-outline"></ion-icon>
                            <span class="followers"> ${profile.followers} </span> followers</span>
                        </p>
                        <span class="dot">.</span>
                        <p>
                            <ion-icon name="peaople-outline"></ion-icon>
                            <span class="following"> ${profile.following} </span> following</span>

                        </p>
                    </div>
                    <div class="company">
                        <p>
                            <ion-icon name="business-outline"></ion-icon>
                            <span class="fun"> ${profile.company}</span>
                        </p>

                    </div>
                    <div class="location">
                        <p>
                            <span class="fa fa-map-marker">
                            </span>${profile.location}
                        </p>
                    </div>
                </div>
        
        `
}


