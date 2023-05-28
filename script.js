const url = "https://api.github.com/search/repositories?q=";
const url2 = "language:Java+stars:%3E1000&stars=desc&page=";
let page = 1; //current page
let pageMax = 1; //max pages
let searchInput = ""; //search input to include in the fetch

gitMain();

//generate the list of git repos
async function gitMain() {

  document.getElementById("list").innerHTML = "Loading...";

  const data = await gitData(url + searchInput + url2 + page);

  //calculate page number from total count
  //however, you can only get the first 1000 results
  //so if we have more than that, limit it to the first 34 pages
  pageMax = (data.total_count < 1000 ? Math.ceil((data.total_count) / 30) : 34);

  //html to insert into webpage
  let s = ""

  //generate html
  for (let i = 0; i < data.items.length; i++) {
    s += print(data.items[i]);

  }

  //insert html
  document.getElementById("list").innerHTML = s;

  //modify pageation
  document.getElementById("pageNumber").textContent = "Page " + page + " / " + pageMax;

  if (page == 1) {
    document.getElementById("first").classList.add("disabled")
    document.getElementById("previous").classList.add("disabled")
  }
  else {
    document.getElementById("first").classList.remove("disabled")
    document.getElementById("previous").classList.remove("disabled")
  }

  if (page == pageMax) {
    document.getElementById("next").classList.add("disabled")
    document.getElementById("last").classList.add("disabled")
  }
  else {
    document.getElementById("next").classList.remove("disabled")
    document.getElementById("last").classList.remove("disabled")
  }

}



//call api and get data
async function gitData(link) {

  const data = await fetch(link);

  return await data.json();
}




//create html for data, using bootstrap
function print(data) {

  const s =
    "<div class='card p-3 mb-3'><div class='fw-bold mb-1'><div class='d-flex justify-content-between'>"

    + "<span>"

    + "<a class='text-body-emphasis' href = " + data.html_url + " style='text-decoration:none'>" + data.name + "</a>"

    + " / <a class='text-body-emphasis' href=" + data.owner.url + " style='text-decoration:none'><img src="

    + data.owner.avatar_url + " style='width:20px'/> "

    + data.owner.login 

    + "</a><span class='fw-normal'> - " + data.created_at.substring(0,10) + "</span>"
    
    +"</span><div><i class='far fa-star'></i>" + data.stargazers_count + "</div>"

    + "</div></div><hr>"

    + data.description

    + "</div>";
  return s;

}

//go to first page
function firstPage() {
  if (page != 1)
    page = 1;
  gitMain();
}

//go to next page
function forwardPage() {
  if (page < pageMax)
    page += 1;
  gitMain();
}

//go to previous page
function backwardPage() {
  if (page > 1)
    page -= 1;
  gitMain();
}

//go to last page
function lastPage() {
  if (page != pageMax)
    page = pageMax;
  gitMain();
}


//submit search query
function search() {

  searchInput = document.getElementById("searchInput").value;
  page = 1;
  gitMain();

}

function toggleColorMode(){

  if (document.documentElement.getAttribute("data-bs-theme") == "dark")
    document.documentElement.setAttribute('data-bs-theme', 'light');
  else
    document.documentElement.setAttribute('data-bs-theme', 'dark');
}