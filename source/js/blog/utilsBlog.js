function createMarker(marker, id, color) {
  const newMarker = marker.cloneNode(true);

  newMarker.setAttribute('data-marker-id', id);
  newMarker.style.backgroundColor = color;

  return newMarker;
}

function createMarkers(marker, objOptionsMarker) {
  let markers = [];

  objOptionsMarker.forEach((optionsMarker) => {
    const newMarker = createMarker(marker, optionsMarker.id, optionsMarker.color);
    markers.push(newMarker);
  });

  return markers;
}

function getTimeForMan(strTime) {
  const data = new Date(strTime);

  return {
    number: data.getDate() < 10 ? `'0${data.getDate()}` : `${data.getDate()}`,
    month: data.getMonth() + 1 < 10 ? `0${data.getMonth() + 1}` : `${data.getMonth()}`,
    year: String(data.getFullYear())
  };
}

function createBlog(selectorBlog, {id, title, tags, date, views, commentsCount, text, photo}) {
  if (document.querySelector(selectorBlog)) {
    const blog = document.querySelector(selectorBlog)
                         .content
                         .cloneNode(true);

    const article = blog.querySelector('.blog');
    const titleBlog = blog.querySelector('.blog__title');
    const markerBlog = blog.querySelector('.blog__marker');
    const wrapMarker = blog.querySelector('.blog__wrap-markers');
    const timeBlog = blog.querySelector('.blog__time');
    const viewsBlog = blog.querySelector('.blog__views');
    const commentsBlog = blog.querySelector('.blog__comments');
    const textBlog = blog.querySelector('.blog__text');
    const imgBlog = blog.querySelector('.blog__img');
    const imgTabletBlog = blog.querySelector('.blog__img-tablet');
    const imgMobileBlog = blog.querySelector('.blog__img-mobile');

    const arrayMarkers = createMarkers(markerBlog, tags);
    const {number, month, year} = getTimeForMan(date);

    article.setAttribute('data-blog-id', id);

    titleBlog.textContent = title;

    wrapMarker.innerHTML = '';
    wrapMarker.append(...arrayMarkers);

    timeBlog.dateTime = `${year}-${month}-${number}`;
    timeBlog.textContent = `${number}.${month}.${year}`;

    viewsBlog.innerHTML = `${views} views`;

    commentsBlog.innerHTML = `${commentsCount} comments`;

    textBlog.innerHTML = text;

    imgBlog.src = 'photo.desktopPhotoUrl'
    imgBlog.srcset = `${photo.desktop2xPhotoUrl} 2x`
    imgTabletBlog.srcset = `${photo.tabletPhotoUrl}, ${photo.tablet2xPhotoUrl} 2x`
    imgMobileBlog.srcset = `${photo.mobilePhotoUrl}, ${photo.mobile2xPhotoUrl} 2x`

    console.log(getTimeForMan(date));

    return blog;
  }
}

export {createBlog};
