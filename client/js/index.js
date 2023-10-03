let token = localStorage.getItem("Token");
// let expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
// 

let editFlag = false;
let editExpFlag = false;
let editEduFlag = false;

// if (token) {
//     fetch("http://localhost:3000/checkUserTypeOnUser", {
//         method: "GET",
//         headers: {
//             "authorization": token
//         }
//     })
//         .then(res => {
//             return res.json();
//         })
//         .then(data => {
//             if (data.statusCode === "401") {
//                 alert(data.message);
//             }
//             else if (data.statusCode === "200") {
//                 if (data.data === "admin123@gmail.com") {
//                     window.location.href = "../html/admin.html";
//                 }
//                 else if (data.data !== "admin123@gmail.com") {
//                     window.location.href = "../html/portfolio.html";
//                 }
//             }
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }


function preventGoingBack() {
    window.history.forward();
}
setTimeout("preventGoingBack()", 0);
window.onunload = function () { null };


let getProjectData = null;
let getExpData = null;
let getEduData = null;

/* ----------------------------------------------------------------------------------*/
/* ----------------------------------- Search ---------------------------------------*/
/* ----------------------------------------------------------------------------------*/

let selectedElementsDivExp = document.getElementById("selectedElementExp");
let selectedElementsDivProject = document.getElementById("selectedElementProject");
let selectedElementsDivEdu = document.getElementById("selectedElementEdu");

let projectslist = document.getElementById("project");
let explist = document.getElementById("exp");
let eduList = document.getElementById("education-section");


let noResultsFound = true;
let searchResultProject;

let endSearch = document.getElementById("end-search");
let searchBar = document.getElementById("search-items");
let resultsDiv = document.getElementById("resultsDiv");

let startSearch = document.getElementById("start-search");
startSearch.addEventListener("click", () => {
    startSearch.classList.add("hide");
    endSearch.classList.remove("hide");
    let query = searchBar.value.trim();
    selectedElementsDivExp.innerHTML = "";
    selectedElementsDivProject.innerHTML = "";
    selectedElementsDivEdu.innerHTML = "";
    noResultsFound = true;

    selectedElementsDivExp.classList.remove("hide");
    selectedElementsDivProject.classList.remove("hide");
    selectedElementsDivEdu.classList.remove("hide");
    projectslist.classList.add("hide");
    explist.classList.add("hide");
    eduList.classList.add("hide");

    if (query) {
        fetch(`http://localhost:3000/searchProject?query=${query}`, {
            method: "GET",
            headers: {
                "authorization": token
            }
        })
            .then(response => {
                if (response.status === 404) {
                    resultsDiv.textContent = 'No results found.';
                    return null;
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                searchResultProject = data.projects;
                viewSearchedProjects(searchResultProject);

            })
            .catch(error => {
                console.error('Error:', error);
                resultsDiv.textContent = 'An error occurred while fetching data.';
            });
    }
});

function viewSearchedProjects(searchResultProject) {
    let tableRowProject = document.createElement("tr");

    let projectNameth = document.createElement("th");
    let projectDescriptionth = document.createElement("th");
    let projectTagsth = document.createElement("th");

    tableRowProject.classList.add("main-row");

    projectNameth.innerHTML = "Project Name";
    projectDescriptionth.innerHTML = "Project Description";
    projectTagsth.innerHTML = "Tags";

    selectedElementsDivProject.appendChild(tableRowProject);
    if (searchResultProject.length > 0) {
        // console.log(searchResultProject);
        searchResultProject.forEach((result) => {
            tableRowProject.appendChild(projectNameth);
            tableRowProject.appendChild(projectDescriptionth);
            tableRowProject.appendChild(projectTagsth);

            console.log(result);
            let dataRowProject = document.createElement("tr");

            dataRowProject.classList.add("table-row");

            let pNameTD = document.createElement("td");
            let pDesTD = document.createElement("td");
            let pTagTD = document.createElement("td");

            pNameTD.innerHTML = result.Name;
            pDesTD.innerHTML = result.Description;
            pTagTD.innerHTML = result.Tags;

            dataRowProject.appendChild(pNameTD);
            dataRowProject.appendChild(pDesTD);
            dataRowProject.appendChild(pTagTD);

            selectedElementsDivProject.appendChild(dataRowProject);
        });
    }
}

// function viewSearchedExp(searchResultExp) {
//     let tableRowExp = document.createElement("tr");

//     let postionName = document.createElement("th");
//     let companysName = document.createElement("th");
//     let durationTime = document.createElement("th");
//     let positionDetail = document.createElement("th");

//     tableRowExp.classList.add("main-row");

//     postionName.innerHTML = "Position";
//     companysName.innerHTML = "Company";
//     durationTime.innerHTML = "Duration";
//     positionDetail.innerHTML = "Details";

//     selectedElementsDivExp.appendChild(tableRowExp);

//     if (searchResultExp.length > 0) {
//         searchResultExp.forEach((result) => {

//             tableRowExp.appendChild(postionName);
//             tableRowExp.appendChild(companysName);
//             tableRowExp.appendChild(durationTime);
//             tableRowExp.appendChild(positionDetail);

//             // console.log(result);
//             let dataRowExp = document.createElement("tr");

//             dataRowExp.classList.add("table-row");

//             let positionTD = document.createElement("td");
//             let companyTD = document.createElement("td");
//             let durationTD = document.createElement("td");
//             let detailTD = document.createElement("td");

//             positionTD.innerHTML = result.Position;
//             companyTD.innerHTML = result.Company;
//             durationTD.innerHTML = result.Duration;
//             detailTD.innerHTML = result.JobInfo;

//             dataRowExp.appendChild(positionTD);
//             dataRowExp.appendChild(companyTD);
//             dataRowExp.appendChild(durationTD);
//             dataRowExp.appendChild(detailTD);

//             selectedElementsDivExp.appendChild(dataRowExp);
//         });
//     }
// }

// function viewSearchedEdu(searchResultEdu) {
//     let tableRowEdu = document.createElement("tr");

//     let eduDegree = document.createElement("th");
//     let eduUni = document.createElement("th");
//     let eduCgpa = document.createElement("th");
//     let eduDuration = document.createElement("th");

//     tableRowEdu.classList.add("main-row");

//     eduDegree.innerHTML = "Degree";
//     eduUni.innerHTML = "University";
//     eduCgpa.innerHTML = "CGPA";
//     eduDuration.innerHTML = "Duration";

//     selectedElementsDivEdu.appendChild(tableRowEdu);
//     if (searchResultEdu.length > 0) {
//         searchResultEdu.forEach((result) => {

//             tableRowEdu.appendChild(eduDegree);
//             tableRowEdu.appendChild(eduUni);
//             tableRowEdu.appendChild(eduCgpa);
//             tableRowEdu.appendChild(eduDuration);

//             let dataRowEdu = document.createElement("tr");

//             dataRowEdu.classList.add("table-row");

//             let degreeTD = document.createElement("td");
//             let uniTD = document.createElement("td");
//             let cgpaTD = document.createElement("td");
//             let durationTD = document.createElement("td");

//             degreeTD.innerHTML = result.Degree;
//             uniTD.innerHTML = result.University;
//             cgpaTD.innerHTML = result.Cgpa;
//             durationTD.innerHTML = result.Duration;

//             dataRowEdu.appendChild(degreeTD);
//             dataRowEdu.appendChild(uniTD);
//             dataRowEdu.appendChild(cgpaTD);
//             dataRowEdu.appendChild(durationTD);

//             selectedElementsDivEdu.appendChild(dataRowEdu);
//         });
//     }
// }

endSearch.addEventListener("click", () => {
    startSearch.classList.remove("hide");
    endSearch.classList.add("hide");
    projectslist.classList.remove("hide");
    explist.classList.remove("hide");
    eduList.classList.remove("hide")
    selectedElementsDivProject.classList.add("hide");
    selectedElementsDivExp.classList.add("hide");
    selectedElementsDivEdu.classList.add("hide");
    searchBar.value = "";

})