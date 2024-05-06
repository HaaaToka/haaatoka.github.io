function readTextFile(url,callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      if (xhr.readyState === 4 && xhr.status == "200") {
        callback(xhr.response);
      }
    };
    xhr.send();
}

function create_easy_element(type,attributes={},innerhtml=""){

    var e = document.createElement(type);
    //console.log(`${type} Element`)
    Object.entries(attributes).forEach(entry => {
        const [key, value] = entry;
        e.setAttribute(key,value);
        //console.log(`${key} : ${value}`);
    });
    if(innerhtml!==""){e.innerHTML=innerhtml;}

    return e;
}

function createNewPostPreview(info){

    // new post preview begin
    var section = create_easy_element("section",{"class":"post"});
    
    var header = create_easy_element("header",{"class":"post-header"});

    // image begin
    var rigthImageLink = create_easy_element("a",
                                            {"href":"https://haaatoka.github.io",
                                            "title":"See posts by HaaaToka"})
    var rigthImage =  create_easy_element("img",
                                          {"class":"avatar",
                                          "src":"https://avatars.githubusercontent.com/u/27926328?v=4",
                                          "alt":"HaaaToka"});
    rigthImageLink.appendChild(rigthImage);
    // image end

    // title begin
    var title = create_easy_element("h3");
    var title_link = create_easy_element("a",
                                        {"href": info.link,
                                        "class":"post-title"},
                                        info.title)
    title.appendChild(title_link);
    // title end

    // post updates info begin
    var postmeta_update = create_easy_element("p");
    var postmeta_update_info = create_easy_element("strong", {}, info.postUpdate);
    postmeta_update.appendChild(postmeta_update_info);
    // post updates info end

    var foreword = create_easy_element("p",{}, info.foreword);

    header.appendChild(rigthImageLink);
    header.appendChild(title);
    header.appendChild(postmeta_update);
    header.appendChild(foreword);
    section.appendChild(header);
 
    // new post preview end
    return section
}

function arrangePost(elementid,category="all"){
  
    readTextFile("/posts/posts.json", function(postList){

        var myposts = document.getElementById(elementid);

        Object.entries(postList).reverse().forEach(entry=>{
          const[key, info] = entry;
          if(category==="all" || category===info.category){
            myposts.appendChild(createNewPostPreview(info));
          }
        });

    });

}

function createRWLTable(year) {

  elementid = "rwl-table-div";
  readTextFile("/posts/rwl/rwl_list.json", function(rwlList){
    try {
      if( Object.keys(rwlList).includes(year) ){
        var rwltablediv = document.getElementById(elementid);
        rwltablediv.innerText = "";

        var rwltable = document.createElement("table");

        var tablecolgroup = document.createElement("colgroup");
        var col1 = document.createElement("col");
        col1.setAttribute("width", "8%");
        var col2 = document.createElement("col");
        col2.setAttribute("width", "40%");
        var col3 = document.createElement("col");
        col3.setAttribute("width", "60%");
        tablecolgroup.appendChild(col1);
        tablecolgroup.appendChild(col2);
        tablecolgroup.appendChild(col3);
        rwltable.appendChild(tablecolgroup);

        var thead = document.createElement("thead");
        var headtr = document.createElement("tr");
    
        [" Date ", "Title", "Link"].forEach(column => {
          var headth = document.createElement("th");
          headth.innerText = column;
          headtr.appendChild(headth);
        })
        thead.appendChild(headtr);
        rwltable.appendChild(thead);
    
        var tbody = document.createElement("tbody");
    
        Object.entries(rwlList[year]).reverse().forEach(entry=>{
          var bodytr = document.createElement("tr");
    
          var date = document.createElement("td");
          date.innerText = entry[1][0];
          var title = document.createElement("td");
          title.innerText = entry[1][1];
          var link = document.createElement("td");
          var linka = document.createElement("a");
          linka.innerText = entry[1][2];
          linka.setAttribute("href",entry[1][2]);
    
          link.appendChild(linka);
    
          bodytr.appendChild(date);
          bodytr.appendChild(title);
          bodytr.appendChild(link);
    
          tbody.appendChild(bodytr);
        });
    
        rwltable.appendChild(tbody);
    
        rwltablediv.appendChild(rwltable);
      }else{
        var rwltablediv = document.getElementById(elementid);
        rwltablediv.innerText = "Calm Down!";
      }
    } catch (error) {
      console.log(error);
    }

  });

}

function createSnackTable() {

  elementid = "rwl-table-div";
  readTextFile("/posts/rwl/rwl_list.json", function(rwlList){
    try {
      if( Object.keys(rwlList).includes("snacks") ){
        var rwltablediv = document.getElementById(elementid);
        rwltablediv.innerText = "";

        var rwltable = document.createElement("table");

        var tablecolgroup = document.createElement("colgroup");
        var col1 = document.createElement("col");
        col1.setAttribute("width", "40%");
        var col2 = document.createElement("col");
        col2.setAttribute("width", "60%");
        tablecolgroup.appendChild(col1);
        tablecolgroup.appendChild(col2);
        rwltable.appendChild(tablecolgroup);

        var thead = document.createElement("thead");
        var headtr = document.createElement("tr");
    
        ["Title", "Link"].forEach(column => {
          var headth = document.createElement("th");
          headth.innerText = column;
          headtr.appendChild(headth);
        })
        thead.appendChild(headtr);
        rwltable.appendChild(thead);
    
        var tbody = document.createElement("tbody");
    
        Object.entries(rwlList["snacks"]).reverse().forEach(entry=>{
          var bodytr = document.createElement("tr");
    
          var title = document.createElement("td");
          title.innerText = entry[1][0];
          var link = document.createElement("td");
          var linka = document.createElement("a");
          linka.innerText = entry[1][1];
          linka.setAttribute("href",entry[1][1]);
    
          link.appendChild(linka);

          bodytr.appendChild(title);
          bodytr.appendChild(link);
    
          tbody.appendChild(bodytr);
        });
    
        rwltable.appendChild(tbody);
    
        rwltablediv.appendChild(rwltable);
      }else{
        var rwltablediv = document.getElementById(elementid);
        rwltablediv.innerText = "Calm Down!";
      }
    } catch (error) {
      console.log(error);
    }

  });

}

// QR2QH

function popmeup(el) {
  console.log(el);
  console.log(el.childNodes);
  // Get the modal
  var modal = document.getElementById("popUpModal");
  var captionText = document.getElementById("caption");

  var modalImg = document.getElementById("imgHere");

  modal.style.display = "block";
  modalImg.src = el.childNodes[1].src;
  captionText.innerHTML = el.childNodes[3].innerText;
}
function closePopUp() {
  var modal = document.getElementById("popUpModal");
  // Get the <span> element that closes the modal
  // When the user clicks on <span> (x), close the modal
  modal.style.display = "none";
}