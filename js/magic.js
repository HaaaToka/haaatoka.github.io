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

        Object.entries(postList).forEach(entry=>{
          const[key, info] = entry;
          if(category==="all" || category===info.category){
            myposts.appendChild(createNewPostPreview(info));
          }
        });

    });
}